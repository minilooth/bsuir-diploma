import * as yup from "yup";

export const AddressSchema = yup.object().shape({
  street: yup
    .string()
    .required('Это обязательное поле')
    .matches(/^[A-Za-zА-Яа-я .-]+$/, 'Улица указана в некорректном формате'),
  house: yup
    .string()
    .required('Это обязательное поле')
    .matches(/^[0-9]{1,3}[A-Za-zА-Яа-я]?$/, 'Номер дома указан в некорректном формате'),
  housing: yup
    .string()
    .matches(/^((?=[0-9])?[0-9]$|[A-Za-zА-Яа-я])$/, 'Корпус дома указан в некорректном формате'),
  room: yup
    .string()
    .matches(/^[A-Za-zА-Яа-я0-9 ]+$/, 'Номер квартиры/помещения/офиса указан в некорректном формате')
})
