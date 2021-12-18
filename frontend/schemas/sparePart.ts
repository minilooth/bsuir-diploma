import * as yup from "yup";
import * as _ from "lodash"

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

export const SparePartFilterSchema = yup.object().shape({
  sort: yup.string(),
  sortDirection: yup
    .mixed()
    .when('sort', {
      is: (sort: string) => !!sort,
      then: yup
        .string()
        .required('Это обязательное поле'),
      otherwise: yup
        .string()
    }),
  purchasePriceFrom: yup
    .number()
    .transform((_, val) => !!val ? Number(val) : null)
    .nullable()
    .typeError('Закупочная цена должна быть числом'),
  purchasePriceTo: yup
    .number()
    .transform((_, val) => !!val ? Number(val) : null)
    .nullable()
    .when('purchasePriceFrom', {
      is: (purchasePriceFrom: any) => !_.isNaN(purchasePriceFrom),
      then: yup
        .number()
        .transform((_, val) => !!val ? Number(val) : null)
        .nullable()
        .min(yup.ref('purchasePriceFrom'), () => 'Закупочная цена до должна быть больше чем от'),
      otherwise: yup
        .number()
        .transform((_, val) => !!val ? Number(val) : null)
        .nullable()
    })
    .typeError('Закупочная цена должна быть числом'),
  retailPriceFrom: yup
    .number()
    .transform((_, val) => !!val ? Number(val) : null)
    .nullable()
    .typeError('Розничная цена должна быть числом'),
  retailPriceTo: yup
    .number()
    .when('retailPriceFrom', {
      is: (retailPriceFrom: any) => !_.isNaN(retailPriceFrom),
      then: yup
        .number()
        .transform((_, val) => !!val ? Number(val) : null)
        .nullable()
        .min(yup.ref('retailPriceFrom'), () => 'Розничная цена до должна быть больше чем от'),
      otherwise: yup
        .number()
        .transform((_, val) => !!val ? Number(val) : null)
        .nullable()
    })
    .typeError('Розничная цена должна быть числом'),
  availabilityFrom: yup
    .number()
    .transform((_, val) => !!val ? Number(val) : null)
    .nullable()
    .typeError('Наличие должно быть числом'),
  availabilityTo: yup
    .number()
    .when('availabilityFrom', {
      is: (availabilityFrom: any) => !_.isNaN(availabilityFrom),
      then: yup
        .number()
        .transform((_, val) => !!val ? Number(val) : null)
        .nullable()
        .min(yup.ref('availabilityFrom'), () => 'Наличие до должно быть больше чем от'),
      otherwise: yup
        .number()
        .transform((_, val) => !!val ? Number(val) : null)
        .nullable()
    })
    .typeError('Наличие должно быть числом'),
  makeId: yup
    .string(),
  hasModels: yup
    .boolean(),
  modelId: yup
    .string(),
  hasGenerations: yup
    .boolean(),
  generationId: yup
    .string(),
  categoryId: yup
    .string(),
  hasSubcategories: yup
    .boolean(),
  subcategoryId: yup
    .string(),
  hasGroups: yup
    .boolean(),
  groupId: yup
    .string()
})
