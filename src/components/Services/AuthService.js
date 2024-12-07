
import request from '../Util/AxiosWrapper';

class AuthService  {
    login(credentials){
        return request.request('LOGIN', '/auth/login', credentials);
    }

    getPrincipal()
    {
        return request.request('GET', 'getPrincipal');
    }
}

const authService = new AuthService();

export default authService;