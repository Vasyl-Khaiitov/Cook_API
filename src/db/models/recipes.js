import { model, Schema } from 'mongoose';

const recipesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    area: {
      type: String, // у тебе зараз просто "British" (string), а не ObjectId
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
    },
    time: {
      type: String,
    },
    ingredients: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: 'ingredients',
          required: true,
        },
        measure: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const RecipesCollection = model('recipes', recipesSchema);
