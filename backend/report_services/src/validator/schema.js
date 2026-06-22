import Joi from 'joi';

export const addReportSchema = Joi.object({
  user_id: Joi.string().optional(),
  user_fullname: Joi.string().required(),
  item_name: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().valid('lost', 'found').required(),
  image_url: Joi.string().allow(null, '').optional(),
  location_lost: Joi.string().required(),
  date_lost: Joi.date().required(),
  status: Joi.string().valid('claimed', 'unclaimed').required(),
  contact_phone: Joi.string()
    .pattern(/^[0-9+()-\s]+$/)
    .required(),
});

export const updateReportStatusSchema = Joi.object({
  status: Joi.string().valid('claimed', 'unclaimed').required(),
});
