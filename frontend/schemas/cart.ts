import * as yup from "yup";

export const AddToCartSchema = yup.object().shape({
  storeId: yup
    .string()
    .required('Это обязательное поле'),
  availability: yup
    .number(),
  quantity: yup
    .number()
    .required('Это обязательное поле')
    .max(yup.ref('availability'), 'Столько товара нет в наличии')
    .typeError('Количество должно быть числом')
})
