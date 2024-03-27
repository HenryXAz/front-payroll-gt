import { apiService } from "@/services/api-service";

// Lista de actions relacionadas a company 
export const addCompany = (company) => ({
    type: 'ADD_COMPANY',
    //carga útil: objeto de tipo company
    payload: company
  });
  
  export const updateCompany = (company) => ({
    type: 'UPDATE_COMPANY',
    //carga útil: objeto de tipo company
    payload: company
  });
  
  export const deleteCompany = (companyId) => ({
    type: 'DELETE_COMPANY',
    //carga útil: id para encontrar company
    payload: companyId
  });

// positions
export const getPositions = (positions) => ({
  type: 'LIST_POSITIONS',
  payload: positions,
})

export const addPosition = (position) => ({
  type: 'ADD_POSITION',
  payload: position,
})

