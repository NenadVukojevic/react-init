import axios from "axios"
import { appPath } from './Constants'
import { basename } from "./Constants";
import { useNavigate } from "react-router-dom";

const client = axios.create({
    baseURL: appPath //constants.appPathDevelopment//.appPathProduction
});

class AxiosWrapper {
    navigation = useNavigate;
    onError(error) {
        console.log("onError called AxiosWrapper");
        if (error.response.status === 403) {
            console.error('Session expired!!!');
            localStorage.clear("jwt");
            localStorage.setItem("loggedIn", false);
            window.location.href = { basename };
        }
        else if (error.response) {
            // Request was made but server responded with something
            // other than 2xx
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);

        } else {
            // Something else happened while setting up the request
            // triggered the error
            console.error('Error Message:', error.message);
        }

        return Promise.reject(error.response || error.message);
    }

    onSuccess(response) {
        return response;
    }

    request(method, url, param) {

        // precheck calling method that returns something when authorized

    method !== 'LOGIN' && client.get('/api/v1/campaign/version', {headers: {
        Authorization: localStorage.getItem('authToken')
    }}).catch((error)=>{
            console.error('Session expired!!!');
            localStorage.clear("authToken");
            window.location.href = `${basename}/`;
            //return Promise.response("expired");
            //throw new axios.Cancel('Session expired, redirecting to login.'); 
           return Promise.reject(error.response || error.message);
    })


        switch (method) {
            case 'GET':
                return client.get(url, {
                    headers: {
                        Authorization: localStorage.getItem('authToken')
                    }
                }).then(this.onSuccess).catch(this.onError);

            //  ;
            case 'POST':
                return client.post(url, param, {
                    headers: {
                        Authorization: localStorage.getItem('authToken')
                    }
                });
            case 'POST_FILE':
                const formData = new FormData();
                formData.append("file", param);
                console.log("uploadFile", JSON.stringify(formData));
                //return request.request('POST', '/api/v1/campaigns/image');
                return client.post(url,
                    formData, {
                    headers: {
                        Authorization: localStorage.getItem('authToken')
                    }
                });
            case 'PUT':
                return client.put(url, param, {
                    headers: {
                        Authorization: localStorage.getItem('authToken')
                    }
                });
            case 'DELETE':
                return client.delete(url //, { data: param }
                    , {
                        headers: {
                            Authorization: localStorage.getItem('authToken')
                        }
                    });
            case 'LOGIN':
                return client.post(url, param);
            default:
                return null;
        }

    }

}

const axiosWrapper = new AxiosWrapper();

export default axiosWrapper;



