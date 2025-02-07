import { Controller, Post, Body, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './create-payment.dto';
import { Payment } from '../entities/payment.entity';

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
}