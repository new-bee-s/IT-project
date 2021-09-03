import _axios from 'axios';

// route of front->end
const axios = baseUrl => {
    const instance = _axios.create({
        baseURL: 'https://new-bee-s.herokuapp.com'||'http://localhost:8000'
    })
    return instance;
};

export { axios };

export default axios();