import mongoose, { Document, Schema } from 'mongoose';

export interface CardDocument extends Document {
  id: number;
  year: number;
  eventType: string;
  references: number[];
  reference: number;
  serviceDate: string;
  resourceType: string;
}

const cardSchema: Schema<CardDocument> = new Schema({
  id: { type: Number, required: true, unique: true },
  year: { type: Number, required: true },
  eventType: { type: String, required: true },
  references: { type: [Number], required: true },
  reference: { type: Number, required: true },
  serviceDate: { type: String, required: true },
  resourceType: { type: String, required: true },
});

const Card = mongoose.model<CardDocument>('Card', cardSchema);

export default Card;
