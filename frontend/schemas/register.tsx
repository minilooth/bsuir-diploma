import * as yup from 'yup';

export const EmailStepSchema = yup.object().shape({
  email: yup.string().email('E-mail entered in invalid format').required('E-mail is required field')
})

export const UsernameStepSchema = yup.object().shape({
  username: yup.string().matches(/^[A-Za-z0-9_]+$/, 'Username should contain only letters, digits and \'_\' symbol')
    .min(6, 'Username should be minimum 6 characters length')
    .max(25, 'Username should be maximum 25 characters length')
})
