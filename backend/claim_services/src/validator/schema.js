import Joi from 'joi';

export const createClaimSchema = Joi.object({
  report_id: Joi.string().required(),
  user_id: Joi.string().optional(),
  report_owner_id:Joi.string().required(),
  claim_type: Joi.string().valid('claim', 'report').required(),
  reporter_name: Joi.string().required(),
  reporter_role: Joi.string().required(),
  location: Joi.string().required(),
  contact_phone: Joi.string()
    .pattern(/^[0-9+()-\s]+$/)
    .required(),
  description: Joi.string().required(),
  image_url: Joi.string().allow(null, '').optional(),
  message: Joi.string().allow(null, '').optional(),
});

export const updateClaimStatusSchema = Joi.object({
  status: Joi.string().valid('pending', 'accepted', 'rejected').required(),
});