import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('ingrese un nombre de puesto'),
  description: yup.string().required('ingrese una descripcion de puesto'),
})

export default schema
