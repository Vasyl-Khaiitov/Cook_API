import { model, Schema } from 'mongoose';

const areasSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const AreasCollection = model('areas', areasSchema);
