import axios from "axios";
import { config } from "../axios";


const rootApi = process.env.NEXT_PUBLIC_BASE;
const handelSubscribe  = async (email:string) => {
    try {
        const res = await axios.post(`${rootApi}/api/v1/subscribe-newsletter`,{
            email:email
        },config())
        return res.data
    } catch (error) {
        console.log(error);
        return null
    }
}

export default handelSubscribe