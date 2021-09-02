import _axios from 'axios';

const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: 'http://localhost:8000'
    })
    return instance;
};

export { axios };

export default axios();