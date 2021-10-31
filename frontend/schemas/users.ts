import * as yup from 'yup';

const SortUserFilterSchema = yup.object().shape({
  sortDirection: yup.string().required(),
  sort: yup.string(),
  fullname: yup.string(),
  email: yup.string().email(),
  phoneNumber: yup.string(),
  registerDateFrom: yup.date().nullable().transform((current, original) => original === '' ? null : current),
  registerDateTo: yup.date().nullable().transform((current, original) => original === '' ? null : current)
    .min(yup.ref('registerDateFrom'), () => 'Дата регистрации до должна быть больше чем от')
})

const NotSortUserFilterSchema = yup.object().shape({
  sort: yup.string(),
  fullname: yup.string(),
  email: yup.string().email(),
  phoneNumber: yup.string(),
  registerDateFrom: yup.date().nullable().transform((current, original) => original === '' ? null : current),
  registerDateTo: yup.date().nullable().transform((current, original) => original === '' ? null : current)
    .min(yup.ref('registerDateFrom'), () => 'Дата регистрации до должна быть больше чем от')
})


export const UserFilterSchema = yup.lazy(({sort}) => sort ? SortUserFilterSchema : NotSortUserFilterSchema);

export const ProcessUserSchema = yup.object().shape({
  username: yup.string().required('Это обязательное поле'),
  email: yup.string().email('E-mail введен в не корректном формате').required('Это обязательное поле'),
  firstname: yup.string().required('Это обязательное поле'),
  lastname: yup.string().required('Это обязательное поле'),
  middlename: yup.string().required('Это обязательное поле'),
  phoneNumber: yup.string().matches(/^(.(?!(_)))*$/, 'Это обязательное поле').required('Это обязательное поле').length(17, 'Номер телефона должен быть длиной в 17 символов'),
  role: yup.string().required('Это обязательное поле')
})

export const ChangePasswordSchemaWithOldPassword = yup.object().shape({
  oldPassword: yup.string().required('Это обязательное поле'),
  newPassword: yup.string().required('Это обязательное поле'),
  confirmPassword: yup.string().required('Это обязательное поле').test('passwords-match', 'Пароли не совпадают',
    (value, context) => context.parent.newPassword === value)
})

export const ChangePasswordSchemaWithoutOldPassword = yup.object().shape({
  newPassword: yup.string().required('Это обязательное поле'),
  confirmPassword: yup.string().required('Это обязательное поле').test('passwords-match', 'Пароли не совпадают',
    (value, context) => context.parent.newPassword === value)
})

export const ChangePasswordSchema = yup.lazy(({oldPassword}) => oldPassword
  ? ChangePasswordSchemaWithOldPassword
  : ChangePasswordSchemaWithoutOldPassword);

