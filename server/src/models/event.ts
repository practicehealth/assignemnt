import mongoose, { Document, Schema } from 'mongoose';

export interface EventDocument extends Document {
  id: number;
  year: string;
  eventHeader: string;
  provider: string;
  facility: string;
  eventType: string;
  references: number[];
  reference: number;
  serviceDate: string;
  resourceType: string;
  cost?: string;
}

const eventSchema: Schema<EventDocument> = new Schema({
  id: { type: Number, required: true, unique: true },
  year: { type: String, required: true },
  eventHeader: { type: String, required: true },
  provider: { type: String, required: true },
  facility: { type: String, required: true },
  eventType: { type: String, required: true },
  references: { type: [Number], required: true },
  reference: { type: Number, required: true },
  serviceDate: { type: String, required: true },
  resourceType: { type: String, required: true },
  cost: { type: String },
});

const Event = mongoose.model<EventDocument>('Event', eventSchema);

export default Event;
