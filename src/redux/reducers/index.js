//Funcion pura para modificar store, state: estado actual, action: cambio del store 
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMPANY':
      return {
        //Conservar 
        ...state,
        //A la lista companiesList, añade el objeto que viene del payload
        companiesList: [...state.companiesList, action.payload]
      };
    case 'UPDATE_COMPANY':
      return {
        ...state,
        //Actualiza un elemento de la lista companiesList, en base al objeto que viene en el payload
        companiesList: state.companiesList.map(company =>
        company.id === action.payload.id ? action.payload : company
        )
      };
    case 'DELETE_COMPANY':
      return {
        ...state,
        //Elimina un elemento de la lista companiesList, en base al id que viene en el payload
        companiesList: state.companiesList.filter(company =>
        company.id !== action.payload
        )
      };

    // positions
    case 'LIST_POSITIONS':
      return {
        ...state,
        positionsList: action.payload
    }

    case 'ADD_POSITION':
      return {
        ...state,
        positionsList:  {...state.positionsList, results: [...state.positionsList.results, action.payload]}
      }

    // departments
    case 'LIST_DEPARTMENTS':
      return {
        ...state,
        departmentsList: action.payload.data,
      }

    case 'ADD_DEPARTMENT':
      return {
        ...state,
        departmentsList: {...state.departmentsList, results: [...state.departmentsList.results, action.payload]}
      }

    default:
      return state;
  }
};
  
export default reducer;