import Joi from 'joi';
import { Types } from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.message('value: ' + value + ' must be ObjectId', {
      message: 'Must be ObjectId',
    });
  }
  return value;
}, 'ObjectId validation');

const ingredientsValidator = Joi.custom((value, helpers) => {
  let parsed;
  if (typeof value === 'string') {
    try {
      parsed = JSON.parse(value);
    } catch (err) {
      return helpers.error('Ingredients must be valid JSON', {
        message: 'Ingredients must be valid JSON ' + err.message,
      });
    }
  } else {
    parsed = value;
  }
  if (!Array.isArray(parsed)) {
    return helpers.error('Ingredients must be an array', {
      message: 'Ingredients must be an array',
    });
  }
  for (const item of parsed) {
    if (!item.id || !item.measure) {
      return helpers.error('Each ingredient must have ingredient and measure', {
        message: 'Each ingredient must have ingredient and measure',
      });
    }
    if (!Types.ObjectId.isValid(item.id)) {
      return helpers.error('value: ' + value + ' must be ObjectId', {
        message: 'Each ingredient must have ingredient and measure',
      });
    }
  }

  return parsed;
}, 'Ingredients validation');

export const recipeSchema = Joi.object({
  title: Joi.string().required(),
  category: objectId.required(),
  area: Joi.string().required(),
  instructions: Joi.string().required(),
  description: Joi.string().required(),
  thumb: Joi.string().uri().optional(),
  time: Joi.string().optional(),
  ingredients: ingredientsValidator.required(),
});
