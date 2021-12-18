import * as yup from 'yup';

export const EmailStepSchema = yup.object().shape({
  email: yup
    .string()
    .email('E-mail введен в некорректном формате')
    .required('Это обязательное поле')
})

export const UsernameStepSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[A-Za-z0-9_]+$/, 'Имя пользователя должно содержать только буквы, цифры или символ \'_\'')
    .min(6, 'Имя пользователя должно быть длиной от 6 до 25 символов')
    .max(25, 'Имя пользователя должно быть длиной от 6 до 25 символов')
    .required("Это обязательное поле")
})

export const PhoneNumberStepSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .matches(/^(.(?!(_)))*$/, 'Это обязательное поле')
    .required('Это обязательное поле')
    .length(17, 'Номер телефона должен быть длиной в 17 символов')
})

export const InformationStepSchema = yup.object().shape({
  firstname: yup
    .string()
    .required('Это обязательное поле')
    .matches(/[A-Za-zА-Яа-я -]+$/, 'Имя должно содепжать только буквы, символы пробела или символ \'_\''),
  lastname: yup
    .string()
    .required('Это обязательное поле')
    .matches(/[A-Za-zА-Яа-я -]+$/, 'Фамилия должно содепжать только буквы, символы пробела или символ \'_\''),
  middlename: yup
    .string()
    .required('Это обязательное поле')
    .matches(/[A-Za-zА-Яа-я -]+$/, 'Отчество должно содепжать только буквы, символы пробела или символ \'_\'')
})
