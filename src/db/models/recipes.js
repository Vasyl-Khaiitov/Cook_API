import { model, Schema } from 'mongoose';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    area: {
      type: Schema.Types.ObjectId,
      ref: 'areas',
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ingredients',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipesSchema);
