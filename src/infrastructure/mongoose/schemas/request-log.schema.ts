import { Prop, Schema as NestJSSchema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type RequestLogDocument = HydratedDocument<RequestLog>;

@NestJSSchema({ timestamps: true })
export class RequestLog {
  @Prop({ type: String, required: true })
  route: string;

  @Prop({ type: String, required: true })
  method: string;

  @Prop({ type: Object })
  user?: any;

  @Prop({ type: Object })
  body?: any;

  @Prop({ type: Object })
  query?: any;

  @Prop({ type: Object })
  params?: any;

  @Prop({ type: Number })
  statusCode?: number;

  @Prop({ type: Number })
  responseTime?: number;

  @Prop({ type: String })
  ipAddress?: string;

  @Prop({ type: String })
  userAgent?: string;
}

export const RequestLogSchema: MongooseSchema<RequestLog> = SchemaFactory.createForClass(RequestLog);
