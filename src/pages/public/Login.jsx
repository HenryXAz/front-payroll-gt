import Guest from '@/layouts/Guest'

// components
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

// images
import loginImage from '@/assets/login_image.jpg'

// services
import { apiService } from '@/services/api-service'
import { authService } from '@/services/auth-services'

// hook form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// schema
import schema from '@/forms/schemas/loginSchema'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import notificationService from '@/services/notification-service'
// import { authService } from '@/services/auth-services'

export const Login = () => {

  // react hook form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  // react router navigate
  const navigate = useNavigate()

  // if email is exists, render password input and form submit button
  const [existsEmail, setExistsEmail] = useState(false)

  const login = handleSubmit(async values => {
      const { email, password } = values
      const menu = await authService.login(email, password) 
      sessionStorage.setItem('menu', JSON.stringify(menu))
      navigate('/dashboard')
      notificationService.notify('Bienvenido', 'success')
  })

  const verifyIfEmailExists = async () => {
      const { email } = getValues()
      const verify = await apiService.post({
        url: '/verify/',
        data: {
          email,
        },
      })

      if (verify.data.exist) {
        setExistsEmail(true)
      }
  }

  return (
    <Guest>
      <div className='max-w-4xl mx-auto flex gap-2 my-6 bg-gray-100 rounded-xl'>
        <div className='w-full'>
          <img
            src={loginImage}
            className='rounded-md'
            alt='login image'
            width='500'
          />
        </div>
        <div className='flex flex-col gap-2 w-full p-2'>
          <h1 className='text-center text-lg text-slate-700'>Bienvenido</h1>
          <form onSubmit={login} className='mx-auto w-full'>
            <Label htmlFor='email'>
              Usuario:
              <Input
                type='email'
                name='email'
                {...register('email')}
                placeholder='john@doe.com'
              />
              {errors.email && (
                <p className='text-red-500'>{errors.email.message}</p>
              )}
            </Label>

            {!!existsEmail && (
              <>
                <Label htmlFor='password'>
                  Contraseña:
                  <Input
                    type='password'
                    name='password'
                    {...register('password')}
                    placeholder='****'
                  />
                </Label>

                {errors.password && (
                  <p className='text-red-500'>{errors.password.message}</p>
                )}
              </>
            )}

            {!existsEmail && (
              <Button
                type='button'
                onClick={verifyIfEmailExists}
                className='mt-5 w-full'
              >
                Ingresar
              </Button>
            )}

            {!!existsEmail && <Button className='mt-5 w-full'>Ingresar</Button>}
          </form>
        </div>
      </div>
    </Guest>
  )
}
