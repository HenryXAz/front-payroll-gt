import { apiService } from "./api-service";

class EmployeeService {

    constructor() {
        this.apiService = apiService;
    }

   async getEmployees() {
        const get = await this.apiService.get({url: '/employees'});
        return get
    }

    
    async getEmployeeById(id) {
        const get = await this.apiService.get({
            url: '/employees/:employee_id',
            params: {
                employee_id: id
            },
        })
        return get;
    }

    async createEmployee(data) {
        const post = await this.apiService.post({
            url: '/employees/', 
            data: data});
        return post;
    }

    async updateEmployee(id, data) {
        const put = await this.apiService.put({
            url: '/employees/:employee_id',
            params: {
                employee_id: id
            }, 
            data: {data}
        });
        return put;
    }

    async deleteEmployee(id) {
        const del = await this.apiService.delete({url: '/employees/:employee_id',
            params: {
                employee_id: id
            }
        });
        return del;
    }
  
}

export const employeeService = Object.freeze(new EmployeeService());
