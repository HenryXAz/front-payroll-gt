import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import ErrorMessage from '@/components/ErrorMessage'
import LoggedIn from '@/layouts/LoggedIn'

// react
import { useEffect, useState } from 'react'

// hook form
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// yup
import schema from '@/forms/schemas/positionSchema'

// table
import DataTable from 'react-data-table-component'

// services
import { apiService } from '@/services/api-service'
import notificationService from '@/services/notification-service'

// redux actions
import { getPositions, addPosition } from '@/redux/actions'
import { connect } from 'react-redux'

const Positions = props => {
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

  // data table
  const columns = [
    {
      name: 'Nombre',
      selector: row => row.name,
    },
    {
      name: 'Description',
      selector: row => row.description,
    },
    {
      name: 'Esta Activo',
      selector: row => (row.is_active ? 'Activo' : 'Inactivo'),
    },
  ]

  const onSubmit = handleSubmit(async values => {
    const position = await apiService.post({
      url: '/jobPosition/',
      data: {
        ...values,
        company: user,
        is_active: true,
      },
    })

    if (position.status === 201) {
      notificationService.notify('posición creada correctamente', 'success')
      setOpen(false)
      props.addPosition(position.data)
      console.log('paso aquí')
    }
  })

  const loadPositions = async () => {
    const positions = await apiService.get({
      url: '/jobPosition/',
    })
    props.getPositions(positions.data)
  }

  useEffect(() => {
    setUser(JSON.parse(sessionStorage.getItem('data-user')).id)

    loadPositions()
  }, [])

  return (
    <LoggedIn>
      <Button type='button' onClick={handleToogleForm} variant='secondary'>
        Nuevo
      </Button>

      {!isOpen && (
        <DataTable columns={columns} data={props.positionsList.results} />
      )}

      {isOpen && (
        <div className='p-2 max-w-4xl mx-auto flex flex-col gap-2 my-6 bg-gray-100 rounded-xl'>
          <h2 className='text-center'>Nuevo Resistro</h2>

          <form onSubmit={onSubmit}>
            <Label>
              Nombre del puesto:
              <Input
                name='name'
                type='text'
                {...register('name')}
                placeholder='nombre'
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </Label>

            <Label>
              Descripción:
              <Textarea
                name='description'
                {...register('description')}
              ></Textarea>
              {errors.description && (
                <ErrorMessage message={errors.description.message} />
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
    positionsList: state.positionsList,
  }
}

const mapDispatchToProps = {
  getPositions,
  addPosition,
}

export default connect(mapStateToProps, mapDispatchToProps)(Positions)
// export default Positions
