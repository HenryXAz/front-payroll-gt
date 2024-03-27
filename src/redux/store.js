// reduxConfig.js
import { createStore } from 'redux';
import reducer from './reducers/index';


//estado inicial del store
const initialState = {
  companiesList: [
    {
      id: 1,
      name: 'Empresa 1',
      phone: 'phone Empresa 1',
      description: 'description Empresa 1',
      address: 'address Empresa 1',
      picture: 'picture  Empresa 1',
    },
    {
        id: 2,
        name: 'Empresa 2',
        phone: 'phone Empresa 2',
        description: 'description Empresa 2',
        address: 'address Empresa 2',
        picture: 'picture  Empresa 2',
    },
  ],
  
  usersList: [
    {
      id: 1,
      name: 'Usuario 1',
      email: 'usuario1@example.com'
    },
    {
      id: 2,
      name: 'Usuario 2',
      email: 'usuario2@example.com'
    }
  ],

  // positions
  positionsList: [],

  // departments
  departmentsList: [],
};

//Creacion del store
const store = createStore(reducer, initialState);

export default store;