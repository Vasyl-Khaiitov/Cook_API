import { model, Schema } from 'mongoose';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'areas',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    area: {
      type: String,
      required: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumb: {
      type: String,
      required: false,
    },
    time: {
      type: String,
      required: false,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'ingredients',
          required: true,
        },
        measure: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipesSchema);
