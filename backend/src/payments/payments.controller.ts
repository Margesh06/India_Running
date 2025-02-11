import { Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './create-payment.dto';
import { Payment } from '../entities/payment.entity';
import { TShirtSize } from '../entities/participant.entity';

@Controller('payment')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async createOrder(@Body() body: { 
    amount: number; 
    currency: string;
    userId: number;
    eventId: number;
  }) {
    try {
      const order = await this.paymentsService.createOrder(
        body.amount, 
        body.currency,
        body.userId,
        body.eventId
      );
      return order;
    } catch (error) {
      throw new HttpException(
        'Failed to create order',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }



  @Post('event')
  async verifyPayment(@Body() body: {
    amount: number;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
    userId: number;
    eventId: number;
  }) {
    try {
      const result = await this.paymentsService.verifyAndUpdatePayment(
        body.razorpay_payment_id,
        body.razorpay_order_id,
        body.razorpay_signature,
        body.userId,
        body.eventId,
        body.amount,
      );

      return result;
    } catch (error) {
      throw new HttpException(
        'Payment verification failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('webhook')
  async handleWebhook(
    @Body() webhookData: any,
    @Headers('x-razorpay-signature') signature: string,
  ) {
    try {
      await this.paymentsService.handleWebhook(webhookData, signature);
      return { status: 'success' };
    } catch (error) {
      throw new HttpException(
        'Webhook processing failed',
        HttpStatus.BAD_REQUEST
      );
    }
  }

  @Post('participant')
  async saveParticipantDetails(
    @Body() body: {
      user_id: number;
      event_id: number;
      bib_no: string;
      emergency_no: number;
      emergency_name: string;
      first_name: string;
      last_name: string;
      email: string;
      height?: number;
      weight?: number;
      tshirt_size?: string;
      shoe_size?: number;
      date_of_birth?: string;
      gender?: string;
      phone?: number;
      address?: string;
      pincode?: string;
      blood_group?: string;
      emergency_contact_name?: string;
      emergency_contact_number?: string;
      terms_and_condition?: boolean;
      medical_condition?: string;
    }
  ) {
    try {
      // Destructure the body using snake_case
      const { 
        event_id, 
        user_id, 
        bib_no, 
        emergency_no, 
        emergency_name, 
        first_name, 
        last_name, 
        email, 
        height, 
        weight, 
        tshirt_size, 
        shoe_size, 
        date_of_birth, 
        gender, 
        phone, 
        address, 
        pincode, 
        blood_group, 
        emergency_contact_name, 
        emergency_contact_number, 
        terms_and_condition, 
        medical_condition 
      } = body;

      console.log(body);
      
      // Map tshirt_size string to TShirtSize enum value
      const tshirtSizeEnum = tshirt_size
        ? TShirtSize[tshirt_size as keyof typeof TShirtSize] || null
        : undefined;
        
      console.log("mar" + event_id);  // Now this should print the correct event_id value

      // Call the service method with individual arguments
      const participantDetails = await this.paymentsService.saveParticipantDetails(
        user_id,  
        event_id,  
        bib_no,
        emergency_no,
        emergency_name,
        first_name,
        last_name,
        email,
        height,
        weight,
        tshirtSizeEnum,  
        shoe_size,
        date_of_birth,
        gender,
        phone,
        address,
        pincode,
        blood_group,
        emergency_contact_name,
        emergency_contact_number,
        terms_and_condition || false,
        medical_condition
      );

      return { success: true, message: 'Participant saved successfully', participantDetails };
    } catch (error) {
      console.error('Error saving participant:', error);
      throw new HttpException(
        'Failed to save participant details',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  
}