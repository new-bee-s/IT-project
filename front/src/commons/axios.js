import _axios from 'axios';
import Cookies from 'universal-cookie'
// route of front->end

const cookies = new Cookies()

const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: 'http://localhost:8000/',
        withCredentials: true,
        headers: {
            Authorization: `Bearer ${cookies.get('token')}`
        }
    })
    return instance;
};

export { axios };

export default axios();