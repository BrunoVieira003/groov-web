import { env } from "$env/dynamic/public";
import axios from "axios";

const api = axios.create({
    baseURL: env.PUBLIC_API_URL
})

export default api