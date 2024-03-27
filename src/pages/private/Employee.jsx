import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ErrorMessage from '@/components/ErrorMessage'
import LoggedIn from '@/layouts/LoggedIn'

// react
import { useEffect, useState } from 'react'

// hook form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// yup
import schema from '@/forms/schemas/employeeSchema'

// services
import { apiService } from '@/services/api-service'
import notificationService from '@/services/notification-service'
import UploadFirebaseService from '@/services/firebase'
import toolService from '@/services/tool-service'

// redux actions
import { getDepartments, getPositions, getEmployees, addEmployee } from '@/redux/actions'
import { connect } from 'react-redux'
import { employeeService } from '@/services/employee-service'
import { ToolServices } from '@/services'

const Employee = props => {
  const [isOpen, setOpen] = useState(false)
  const [user, setUser] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  })

  const handleToogleForm = () => {
    setOpen(!isOpen)
  }

  const onSubmit = handleSubmit(async values => {
    const { picture, date_hiring, birthday } = values

    const parsedDateHiring = ToolServices.formatDate(date_hiring, 'YYYY-MM-DD')
    const parseBirthday = toolService.formatDate(birthday, 'YYYY-MM-DD')
    const dateCompletion = parsedDateHiring

    if (picture.length === 0) {
      return notificationService.notify('debe de ingresar una imagen', 'error')
    }

    // upload image to firabase and get url
    const file = picture[0]
    const fileName = toolService.formatFilename(file.name)
    const firebaseService = UploadFirebaseService.getInstance()
    const imageUrl = await firebaseService.uploadFile(file, fileName)

    const employee = await employeeService.createEmployee({
      ...values,
      picture: imageUrl,
      email: values.user,
      username: values.first_name,
      date_hiring: parsedDateHiring,
      birthday: parseBirthday,
      date_completion: dateCompletion,
      company: user,
    })

    console.log(employee)
    if (employee.status === 201) {
      notificationService.notify('empleado creado', 'success')
      setOpen(false)
      props.addEmployee(employee.data)
    }
  })

  const loadDepartments = async () => {
    const departments = await apiService.get({
      url: '/departments/',
    })

    props.getDepartments(departments)
  }

  const loadPositions = async () => {
    const positions = await apiService.get({
      url: '/jobPosition/',
    })
    props.getPositions(positions.data)
  }

  const loadEmployees = async () => {
    const employees = await employeeService.getEmployees()

    props.getEmployees(employees)
  }

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('data-user')).id)

    loadDepartments()
    loadPositions()
    loadEmployees()
  }, [])

  return (
    <LoggedIn>
      <Button type='button' onClick={handleToogleForm} variant='secondary'>
        Nuevo
      </Button>

      {!isOpen && (
        <div className='max-w-6xl mt-5 mx-auto flex gap-2 justify-center'>
          {props.employeesList.results &&
            props.employeesList.results.map((employee) => (
              <div key={employee.id} className='w-1/4 p-2 border border-gray-400 rounded-md'>
                <div>
                  <img src={employee.picture} alt={employee.first_name} />
                </div>
                <div>
                  <h2>
                    {employee.first_name} {employee.last_name}
                  </h2>
                </div>
                <div>
                  <p>{employee.address}</p>
                </div>
              </div>
            ))}
        </div>
      )}

      {isOpen && (
        <div className='p-2 max-w-4xl mx-auto flex flex-col gap-2 my-6 bg-gray-100 rounded-xl'>
          <h2 className='text-center'>Nuevo Resistro</h2>

          <form onSubmit={onSubmit}>
            <Label>
              Nombre
              <Input
                name='first_name'
                type='text'
                {...register('first_name')}
                placeholder='nombre'
              />
              {errors.first_name && (
                <ErrorMessage message={errors.first_name.message} />
              )}
            </Label>

            <Label>
              Apellidos:
              <Input name='last_name' {...register('last_name')} />
              {errors.last_name && (
                <ErrorMessage message={errors.last_name.message} />
              )}
            </Label>

            <Label>
              Método de pago
              <select
                className='p-2 w-full bg-white'
                name='gender'
                {...register('gender')}
              >
                <option value='M'>Masculino</option>
                <option value='F'>Femenino</option>
              </select>
            </Label>

            <Label>
              Teléfono:
              <Input name='phone' {...register('phone')} />
              {errors.phone && <ErrorMessage message={errors.phone.message} />}
            </Label>

            <Label>
              Dirección:
              <Input name='address' {...register('address')} />
              {errors.address && (
                <ErrorMessage message={errors.address.message} />
              )}
            </Label>

            <Label>
              DPI:
              <Input name='dpi' {...register('dpi')} />
              {errors.dpi && <ErrorMessage message={errors.dpi.message} />}
            </Label>

            <Label>
              Salario base:
              <Input name='base_salary' {...register('base_salary')} />
              {errors.base_salary && (
                <ErrorMessage message={errors.base_salary.message} />
              )}
            </Label>

            <Label>
              Salario base inicial:
              <Input
                name='base_salary_initial'
                {...register('base_salary_initial')}
              />
              {errors.base_salary_initial && (
                <ErrorMessage message={errors.base_salary_initial.message} />
              )}
            </Label>

            <Label>
              Número de cuenta:
              <Input name='account_number' {...register('account_number')} />
              {errors.account_number && (
                <ErrorMessage message={errors.account_number.message} />
              )}
            </Label>

            <Label>
              Fecha de contratación:
              <Input
                type='date'
                name='date_hiring'
                {...register('date_hiring')}
              />
              {errors.date_hiring && (
                <ErrorMessage message={errors.date_hiring.message} />
              )}
            </Label>

            <Label>
              Fecha de nacimientp:
              <Input type='date' name='birthday' {...register('birthday')} />
              {errors.birthday && (
                <ErrorMessage message={errors.birthday.message} />
              )}
            </Label>

            <Label>
              Email (usuario):
              <Input name='user' type='email' {...register('user')} />
              {errors.user && <ErrorMessage message={errors.user.message} />}
            </Label>

            <Label>
              Método de pago
              <select
                className='p-2 w-full bg-white'
                name='method_payment'
                {...register('method_payment')}
              >
                <option value='BANCO'>Banco</option>
                <option value='CHEQUE'>Cheque</option>
                <option value='EFECTIVO'>Efectivo</option>
              </select>
            </Label>

            <Label>
              Banco
              <select
                className='p-2 w-full bg-white'
                name='bank'
                {...register('bank')}
              >
                <option value='BANRURAL'>Banrural</option>
                <option value='BANCO INDUSTRIAL'>Banco Industrial</option>
              </select>
            </Label>

            <Label>
              jefe de departamento
              <Input
                {...register('head_department')}
                className='w-5'
                name='head_department'
                type='checkbox'
              />
            </Label>

            <Label>
              Departamento:
              <br />
              <select
                className='p-2 w-full bg-white'
                name='departments'
                {...register('department')}
              >
                {props.departmentsList.results.map(department => (
                  <option value={department.id} key={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
            </Label>

            <Label>
              Posición:
              <br />
              <select
                className='p-2 w-full bg-white'
                name='job_position'
                {...register('job_position')}
              >
                {props.positionsList.results.map(position => (
                  <option value={position.id} key={position.id}>
                    {position.name}
                  </option>
                ))}
              </select>
            </Label>

            <br />

            <Label htmlFor='picture'>
              Imagen de perfil
              <input
                type='file'
                className='mb-5'
                name='picture'
                {...register('picture')}
                placeholder='selecciona una imagen'
              />
              {errors.picture && (
                <ErrorMessage message={errors.picture.message} />
              )}
            </Label>

            <br />
            <Button className='mx-auto block'>Guardar</Button>
          </form>
        </div>
      )}
    </LoggedIn>
  )
}

const mapStateToProps = state => {
  return {
    departmentsList: state.departmentsList,
    positionsList: state.positionsList,
    employeesList: state.employeesList,
  }
}

const mapDispatchToProps = {
  getDepartments,
  getPositions,
  getEmployees,
  addEmployee,
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)
