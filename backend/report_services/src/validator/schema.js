import Joi from 'joi';

export const addReportSchema = Joi.object({
  user_id: Joi.string().optional(),
  item_name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image_url: Joi.string().uri().allow(null, ''),
  location_lost: Joi.string().required(),
  date_lost: Joi.date().required(),
  status: Joi.string().valid('lost', 'found', 'claimed').required(),
  contact_phone: Joi.string()
    .pattern(/^[0-9+()-\s]+$/)
    .required(),
});
