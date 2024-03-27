import * as yup from 'yup'

const schema = yup.object().shape({
  first_name: yup.string().required('ingrese nombre'),
  last_name: yup.string().required('ingrese apellidos'),
  phone: yup.string().required('ingrese teléfono'),
  address: yup.string().required('ingrese dirección'),
  dpi: yup.string().required('ingrese dpi'),
  date_hiring: yup.date(),
  birthday: yup.date(),
  gender: yup.string('').required('ingrese género'),
  base_salary: yup.string('').required('ingrese salario'),
  base_salary_initial: yup.string().required('ingrese salario base inicial'),
  head_department: yup.boolean(),
  method_payment: yup.string().required('ingrese método de pago'),
  bank: yup.string().required('ingrese banco'),
  account_number: yup.string().required('ingrese número de cuenta'),
  user: yup.string().email('ingrese un email válido').required('ingrese email de usuario'),
})

export default schema
