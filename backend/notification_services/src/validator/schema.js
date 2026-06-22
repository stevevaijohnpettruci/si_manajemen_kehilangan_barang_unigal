import Joi from 'joi';

// Skema untuk memvalidasi body request (payload) yang membutuhkan user_id
export const notificationPayloadSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'string.base': '"user_id" harus berupa teks',
    'string.empty': '"user_id" tidak boleh kosong',
    'any.required': '"user_id" wajib disertakan untuk otorisasi',
  }),
});
