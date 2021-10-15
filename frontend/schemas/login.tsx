import * as yup from 'yup';

import {EmailStepSchema} from "schemas/register";

export const LoginSchema = yup.object().shape({
  username: yup.string().required('Username is required field'),
  password: yup.string().required('Password is required field')
})

export const RestorePasswordSchema = EmailStepSchema;
