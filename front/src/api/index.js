import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sistema-matricula.herokuapp.com',
});

export const login = ({ email, password }) => {
  return api.post('/login', { email, password })
            .then(res => res.data);
}

export const getAllStudents = () => {
  return api.get('/student/all')
            .then(res => res.data);
}

export const getStudentByName = (name) => {
  return api.get(`/student/name/${name}`)
            .then(res => res.data);
}

export default api;