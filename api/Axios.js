import axios from "axios";
import { API_ADDRESS } from '@env'

/*
 * Axios Instance
 */
export default axios.create({
    baseURL: API_ADDRESS,
    withCredentials: true
});