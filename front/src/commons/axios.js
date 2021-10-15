import _axios from 'axios';
import Cookies from 'js-cookie'
// route of front->end


const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: 'http://localhost:8000/',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    })
    return instance;
};

export { axios };

export default axios();