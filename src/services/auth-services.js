import { json } from "react-router-dom";
import { apiService } from "./api-service";
// import { apiService } from "./api-service";
import { menuSuperAdmin, menuAdmin, menuUser } from "./menu-service";


class AuthService{

    // EJEMPLO DE USO
    // authService.login('empresa2@gmail.com', 'empresa2')
    // .then(res => console.log(res))
    // .catch(err => console.error(err))
    
    async login(email, password) {
        const loginData = {
            email: email,
            password: password
        };

        try {
            const response = await apiService.post({
                url: '/login/',
                data: loginData,
            });

            console.log(response);
            sessionStorage.setItem('token', response.data.token)
            const userDataJSON = JSON.stringify(response.data.user);
            sessionStorage.setItem('data-user', userDataJSON)

            return this.getMenu(response.data.user.role);
             
        } catch (error) {
            throw new Error('login error')
        }
    }

    // EJEMPLO DE USO
    // authService.resetPassword('empresa2', 'empresa2', 3)
    // .then(res => console.log(res))
    // .catch(err => console.error(err))
    async resetPassword(password, confirm_password, id) {
        const data = {
            password: password,
            confirm_password: confirm_password
        };
        try {
            const response = await apiService.put({
                url: '/reset-pass/:id/',
                params: {
                    'id': id,
                },
                data: data,
            });
            sessionStorage.setItem('token', response.data.token)

            return response;
        } catch (error) {
            console.error("Error al cambiar password:", error);
            throw error;
        }
    }


  
    getToken() {
        const token = sessionStorage.getItem('token');
        return token;
    }
      
    getMenu(role){
        if(role == 'superadmin'){
            return menuSuperAdmin;
        }
        else if(role == 'admin'){
            return menuAdmin;
        }
        else if(role == 'user'){
            return menuUser;
        }
    }
    
}

export const authService = Object.freeze(new AuthService())