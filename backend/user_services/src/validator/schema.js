import Joi from 'joi';

export const createUserSchema = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).required(),
  full_name: Joi.string().max(200).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  student_id_number: Joi.string().max(20).required(),
  address: Joi.string().required(),
  phone_number: Joi.string().max(15).required(),
  faculty: Joi.string().max(100).required(),
  study_program: Joi.string().max(100).required(),
});
