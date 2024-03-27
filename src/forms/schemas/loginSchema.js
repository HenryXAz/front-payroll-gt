import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email('ingrese un email válido').required('ingrese email'),
  password: yup.string().required('ingrese una contraseña').min(6, 'la contraseña debe contener mínimo 6 caracteres'),
})

export default schema