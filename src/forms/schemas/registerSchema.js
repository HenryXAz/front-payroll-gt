import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('ingrese nombre'),
  phone: yup.string('el teléfono es numérico').min(8, 'debe contener un mínimo de 8 caracteres').required('ingrese número de teléfono'),
  address: yup.string().required('ingrese una dirección'),
  email: yup.string().email('ingrese email válido').required('ingrese email'),
  description: yup.string().required('ingrese una descripción'),
  picture: yup.mixed().required('ingrese una imagen'),
  password: yup.string().min(6, 'la contraseña contiene un mínimo de 6 caracteres'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], 'la contraseñas no coinciden')
})

export default schema
