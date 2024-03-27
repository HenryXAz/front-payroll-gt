import Guest from '@/layouts/Guest'

// images
import registerImage from '@/assets/login_image.jpg'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import ErrorMessage from '@/components/ErrorMessage'

// react hook form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// schema
import schema from '@/forms/schemas/registerSchema'

// services
import notificationService from '@/services/notification-service'
import { NotificationService, ToolServices } from '@/services'
import UploadFirebaseService from '@/services/firebase'
import { companyService } from '@/services/company-service'

export const Register = () => {
  // hook react form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const registerCompany = handleSubmit(async values => {
    const {
      name,
      address,
      description,
      phone,
      email,
      password, 
      picture } = values


    if(picture.length === 0) {
      return notificationService.notify('debe de ingresar una imagen', 'error')
    }

    // upload image to firabase and get url
    const file = picture[0]
    const fileName = ToolServices.formatFilename(file.name)
    const firebaseService = UploadFirebaseService.getInstance()
    const imageUrl = await firebaseService.uploadFile(file, fileName)

    const company = await companyService.createCompany(
      name,
      phone,
      description,
      address,
      imageUrl, 
      email,
      password,
    )


    if(company.status === 201) {
      NotificationService.notify('Registro exitoso, puede iniciar sesión', 'success')

      // reset all form inputs
      reset()
    }
  })

  return (
    <Guest>
      <div className='max-w-4xl mx-auto flex gap-2 my-6 bg-gray-100 rounded-xl'>
        <div className='w-full'>
          <img
            src={registerImage}
            className='rounded-md h-full '
            alt='login image'
            width='700'
          />
        </div>
        <div className='flex flex-col gap-2 w-full p-2'>
          <h1 className='text-center text-lg text-slate-700'>Registro</h1>
  
          <form onSubmit={registerCompany}>
            <Label htmlFor='name'>
              Nombre de la empresa o institución*
              <Input
                type='text'
                name='name'
                {...register('name')}
                placeholder='Nombre de la empresa o institución'
              />

              {errors.name && (
                <ErrorMessage message={errors.name.message} />
              )
              }
            </Label>

            <Label htmlFor='phone'>
              Teléfono*
              <Input
                type='text'
                name='phone'
                {...register('phone')}
                placeholder='Teléfono'
              />
              
              {errors.phone && (
                <ErrorMessage message={errors.phone.message} />
              )
              }
            </Label>
            <Label htmlFor='address'>
              Dirección*
              <Input
                type='text'
                name='address'
                {...register('address')}
                placeholder='Dirección*'
              />

              {errors.address && (
                <ErrorMessage message={errors.address.message} />
              )
              }
            </Label>
            <Label htmlFor='email'>
              Correo electrónico(usuario)
              <Input
                type='email'
                name='email'
                {...register('email')}
                placeholder='example@email.com'
              />

              {errors.email && (
                <ErrorMessage message={errors.email.message} />
              )
              }
            </Label>
            <Label htmlFor='password'>
              Contraseña*
              <Input
                type='password'
                name='password'
                {...register('password')}
                placeholder='******'
              />

              {errors.password && (
                <ErrorMessage message={errors.password.message} />
              )
              }
            </Label>
            <Label htmlFor='password_confirmation'>
              Confirmación
              <Input
                type='password'
                name='password_confirmation'
                {...register('password_confirmation')}
                placeholder='******'
              />


              {errors.password_confirmation && (
                <ErrorMessage message={errors.password_confirmation.message} />
              )
              }
            </Label>
            <Label htmlFor='description'>
              Description de la empresa*
              <Input
                type='text'
                name='description'
                {...register('description')}
                placeholder='Descripción de la empresa'
              />


              {errors.description && (
                <ErrorMessage message={errors.description.message} />
              )
              }
            </Label>


            <Label htmlFor="picture">
              Imagen de la empresa*
              <input type="file" className="mb-5" name="picture" {...register('picture')} placeholder="selecciona una imagen" />
            
              {errors.picture && (
                <ErrorMessage message={errors.picture.message} />
              )} 
            </Label>


            <Button className='w-full'>Registrar</Button>
          </form>
        </div>
      </div>
    </Guest>
  )
}
