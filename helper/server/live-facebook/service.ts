import axios from "axios";
import { config } from "../axios";


const rootApi = process.env.NEXT_PUBLIC_BASE;
const getLiveFacebook = async (nextUrl:string|null) => {
    try {
        const res = await axios.post(`${rootApi}/api/v1/get-fb-live`,{
            next_url:nextUrl
        },config())
        return res.data
    } catch (error) {
        console.log(error);
        return null
    }
}

export default getLiveFacebook