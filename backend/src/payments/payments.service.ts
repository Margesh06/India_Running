import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Razorpay from 'razorpay';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Payment, PaymentStatus, PaymentType } from '../entities/payment.entity';
import { Repository } from 'typeorm';
import { Participant, TShirtSize } from '../entities/participant.entity'

@Injectable()
export class PaymentsService {
  private razorpayInstance: Razorpay;
  private readonly webhookSecret: string = 'VWPDBskjVR2539DEqoHWVhAD';

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {
    this.razorpayInstance = new Razorpay({
      key_id: 'rzp_test_1WqWcdSu93kyf7',
      key_secret: this.webhookSecret,
    });
  }

  async createOrder(amount: number, currency: string, userId: number, eventId: number) {
    try {
      // Create Razorpay order
      const order = await this.razorpayInstance.orders.create({
        amount,
        currency,
        receipt: `receipt_${Date.now()}`,
        payment_capture: true,
      });
  
      // Create payment record in database
      const payment = this.paymentRepository.create({
        user_id: userId,               
        event_id: eventId,             
        amount: amount / 100,          
        status: PaymentStatus.PENDING, 
        type: PaymentType.CARDS,       
        razorpay_payment_id: '',       
        razorpay_order_id: order.id,
        error_message: '',             
      });
      
      
  
      await this.paymentRepository.save(payment);
  
      return order;
    } catch (error) {
      console.error('Error creating order:', error);
      throw new Error('Failed to create order');
    }
  }
  
  async saveParticipantDetails(
    userId: number,
    eventId: number,
    bibNo: string,
    emergencyNo: number,
    emergencyName: string,
    firstName: string,
    lastName: string,
    email: string,
    height?: number,
    weight?: number,
    tshirtSize?: string,
    shoeSize?: number,
    dateOfBirth?: string,
    gender?: string,
    phone?: number,
    address?: string,
    pincode?: string,
    bloodGroup?: string,
    emergencyContactName?: string,
    emergencyContactNumber?: string,
    termsAndCondition?: boolean,
    medicalCondition?: string
  ) {
    try {
      // Ensure tshirt_size is mapped to the correct enum value
      const tshirtSizeEnum = tshirtSize ? TShirtSize[tshirtSize as keyof typeof TShirtSize] : undefined;
      console.log(eventId);  // Now this should print the correct eventId value

      // Create a new participant entity
      const participant = this.participantRepository.create({
        event_id: eventId,
        user_id: userId,
        bib_no: bibNo,
        reg_date: Date.now(),
        emergency_no: emergencyNo,
        emergency_name: emergencyName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        height,
        weight,
        tshirt_size: tshirtSizeEnum,  // Pass the enum value or undefined
        shoe_size: shoeSize,
        date_of_birth: dateOfBirth,
        gender,
        phone,
        address,
        pincode,
        blood_group: bloodGroup,
        emergency_contact_name: emergencyContactName,
        emergency_contact_number: emergencyContactNumber,
        terms_and_condition: termsAndCondition || false,
        medical_condition: medicalCondition,
      });

      // Save participant in the database
      await this.participantRepository.save(participant);
      return { success: true, message: 'Participant saved successfully' };
    } catch (error) {
      console.error('Error saving participant:', error);
      throw new HttpException('Failed to save participant details', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  


  async verifyAndUpdatePayment(
    paymentId: string,
    orderId: string,
    signature: string,
    userId: number,
    eventId: number,
    amount: number
  ) {
    try {
      // Verify signature
      const payload = `${orderId}|${paymentId}`;
      const expectedSignature = crypto
        .createHmac("sha256", this.webhookSecret)
        .update(payload)
        .digest("hex");
  
      if (expectedSignature !== signature) {
        throw new Error("Invalid signature");
      }
  
      // Find existing payment records for the order
      const existingPayments = await this.paymentRepository.find({
        where: { razorpay_order_id: orderId } as any,
      });
  
      const pendingPayment = existingPayments.find(
        (payment) => payment.status === PaymentStatus.PENDING
      );
      const failedPayment = existingPayments.find(
        (payment) => payment.status === PaymentStatus.FAILED
      );
  
      if (pendingPayment) {
        // If a previous payment is pending, update it to completed
        pendingPayment.status = PaymentStatus.COMPLETED;
        pendingPayment.razorpay_payment_id = paymentId;
        pendingPayment.error_message = "";
        await this.paymentRepository.save(pendingPayment);
      } else {
        // If no pending payment, create a new entry (only if failed previously)
        const newPayment = this.paymentRepository.create({
          user_id: userId,
          event_id: eventId,
          amount: failedPayment ? failedPayment.amount : amount / 100,
          status: PaymentStatus.COMPLETED,
          type: PaymentType.CARDS,
          razorpay_payment_id: paymentId,
          razorpay_order_id: orderId,
          error_message: "",
        });
  
        await this.paymentRepository.save(newPayment);
      }
  
      return { success: true, message: "Payment verified successfully" };
    } catch (error) {
      console.error("Payment verification failed:", error);
  
      // Log failed payment as a new entry instead of updating old one
      const newFailedPayment = this.paymentRepository.create({
        user_id: userId,
        event_id: eventId,
        amount: amount / 100,
        status: PaymentStatus.FAILED,
        type: PaymentType.CARDS,
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        error_message: error.message,
      });
  
      await this.paymentRepository.save(newFailedPayment);
  
      throw new HttpException("Payment verification failed", HttpStatus.BAD_REQUEST);
    }
  }
  
  

  async handleWebhook(webhookData: any, signature: string) {
    try {
      // Verify webhook signature
      const payload = JSON.stringify(webhookData);
      const expectedSignature = crypto
        .createHmac('sha256', this.webhookSecret)
        .update(payload)
        .digest('hex');

      if (expectedSignature !== signature) {
        throw new Error('Invalid webhook signature');
      }

      const event = webhookData.event;
      const paymentId = webhookData.payload.payment?.entity?.id;
      const orderId = webhookData.payload.payment?.entity?.order_id;

      if (!orderId) {
        throw new Error('Order ID not found in webhook data');
      }

      // Find payment record
      const payment = await this.paymentRepository.findOne({
        where: { razorpay_order_id: orderId } as any, 
      });

      if (!payment) {
        throw new Error('Payment record not found');
      }

      // Update payment status based on webhook event
      switch (event) {
        case 'payment.captured':
          payment.status = PaymentStatus.COMPLETED;
          payment.razorpay_payment_id = paymentId;
          break;
        case 'payment.failed':
          payment.status = PaymentStatus.FAILED;
          payment.error_message = webhookData.payload.payment?.entity?.error_description || 'Payment failed';
          break;
        case 'refund.processed':
          payment.status = PaymentStatus.REFUNDED;
          break;
      }

      await this.paymentRepository.save(payment);
    } catch (error) {
      console.error('Webhook processing failed:', error);
      throw new Error('Failed to process webhook');
    }
  }
}