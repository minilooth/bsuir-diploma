import * as yup from 'yup';

export const SettingsSchema = yup.object().shape({
  name: yup.string().required('Это обязательное поле')
})
