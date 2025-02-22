import axios from 'axios';
const axiosPublic = axios.create({
    baseURL:'https://task-management-app-server-lbsi.onrender.com'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;