import * as yup from 'yup';

import {EmailStepSchema} from "schemas/register";

export const LoginSchema = yup.object().shape({
  username: yup
    .string()
    .required('Это обязательное поле'),
  password: yup
    .string()
    .required('Это обязательное поле')
})

export const RestorePasswordSchema = EmailStepSchema;
