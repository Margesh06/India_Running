import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import Razorpay from 'razorpay';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import { Payment, PaymentStatus, PaymentType } from '../entities/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  private razorpayInstance: Razorpay;
  private readonly webhookSecret: string = 'VWPDBskjVR2539DEqoHWVhAD';

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
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
        status: PaymentStatus.FAILED, 
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
        .createHmac('sha256', this.webhookSecret)
        .update(payload)
        .digest('hex');
  
      if (expectedSignature !== signature) {
        throw new Error('Invalid signature');
      }
  
      // Find existing payment records for the order
      const existingPayments = await this.paymentRepository.find({
        where: { razorpay_order_id: orderId } as any,
      });
  
      // If a previous payment exists, check if it's failed
      const failedPayment = existingPayments.find(
        (payment) => payment.status === PaymentStatus.FAILED
      );
  
      // Create a new entry if there was a previous failed transaction
      const newPayment = this.paymentRepository.create({
        user_id: userId,
        event_id: eventId,
        amount: failedPayment ? failedPayment.amount : amount / 100, // Reuse amount
        status: PaymentStatus.COMPLETED, // Success on retry
        type: PaymentType.CARDS,
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        error_message: '',
      });
  
      await this.paymentRepository.save(newPayment);
  
      return { success: true, message: 'Payment verified successfully' };
    } catch (error) {
      console.error('Payment verification failed:', error);
  
      // Log failed payment as a new entry instead of updating the old one
      const newFailedPayment = this.paymentRepository.create({
        user_id: userId,
        event_id: eventId,
        amount: amount / 100, // Assign correct amount if available
        status: PaymentStatus.FAILED,
        type: PaymentType.CARDS,
        razorpay_payment_id: paymentId,
        razorpay_order_id: orderId,
        error_message: error.message,
      });
  
      await this.paymentRepository.save(newFailedPayment);
  
      throw new HttpException('Payment verification failed', HttpStatus.BAD_REQUEST);
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