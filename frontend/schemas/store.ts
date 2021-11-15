import * as yup from "yup";

export const StoreSchema = yup.object().shape({
  name: yup
    .string()
    .required('Это обязательное поле'),
  type: yup
    .string()
    .required('Это обязательное поле'),
  address: yup
    .string()
    .required('Это обязательное поле')
})

const SortStoreFilterSchema = yup.object().shape({
  sortDirection: yup
    .string()
    .required('Это обязательное поле'),
  sort: yup
    .string()
    .required('Это обязательное поле'),
  type: yup
    .string(),
  address: yup
    .string()
})

const NotSortStoreFilterSchema = yup.object().shape({
  sort: yup
    .string(),
  type: yup
    .string(),
  address: yup
    .string()
})


export const StoreFilterSchema = yup.lazy(({sort}) => sort ? SortStoreFilterSchema : NotSortStoreFilterSchema);
