import { model, Schema } from 'mongoose';

const testimonialsSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    testimonial: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const TestimonialsCollection = model('testimonials', testimonialsSchema);
