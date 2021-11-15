import * as yup from "yup";

export const ChangeQuantitySchema = yup.object().shape({
  availabilities: yup.array().of(
    yup.object().shape({
      quantity: yup
        .number()
        .typeError('Количество должно быть числом')
        .required('Это обязательное поле')
        .min(0, 'Количество должно быть больше 0')
        .max(99999, 'Количество должно быть меньше 99999')
    })
  )
})


export const ProcessSparePartSchema = yup.object().shape({
  name: yup
    .string()
    .required('Это обязательное поле'),
  manufacturerId: yup
    .string()
    .required('Это обязательное поле'),
  article: yup
    .string()
    .required('Это обязательное поле'),
  purchasePrice: yup
    .number()
    .required('Это обязательное поле')
    .typeError('Закупочная цена должна быть числом'),
  retailPrice: yup
    .number()
    .required('Это обязательное поле')
    .typeError('Розничная цена должна быть числом'),
  makeId: yup
    .string()
    .required('Это обязательное поле'),
  hasModels: yup
    .boolean(),
  modelId: yup
    .string()
    .when('hasModels', {
      is: true,
      then: yup
        .string()
        .required('Это обязательное поле'),
      otherwise: yup
        .string()
    }),
  hasGenerations: yup
    .boolean(),
  generationId: yup
    .string()
    .when('hasGenerations', {
      is: true,
      then: yup
        .string()
        .required('Это обязательное поле'),
      otherwise: yup
        .string()
    }),
  categoryId: yup
    .string()
    .required('Это обязательное поле'),
  hasSubcategories: yup
    .boolean(),
  subcategoryId: yup
    .string()
    .when('hasSubcategories', {
      is: true,
      then: yup
        .string()
        .required('Это обязательное поле'),
      otherwise: yup
        .string()
    }),
  hasGroups: yup
    .boolean(),
  groupId: yup
    .string()
    .when('hasGroups', {
      is: true,
      then: yup
        .string()
        .required('Это обязательное поле'),
      otherwise: yup
        .string()
    }),
  description: yup
    .string(),
  characteristics: yup
    .array()
    .of(yup
      .object()
      .shape({
        value: yup
          .string()
          .required('Это обязательное поле')
    })
  )
})
