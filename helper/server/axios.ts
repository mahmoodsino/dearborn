import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

const rootApi = process.env.NEXT_PUBLIC_BASE;
const appName =process.env.NEXT_PUBLIC_WEPSITE_NAME




export const config = () => {
    let lang
    let userToken
    if (typeof window !== "undefined") {
        lang=localStorage.getItem("lang")
        userToken=localStorage.getItem("dearbornToken")
      }
      const size =window.innerWidth
    const config: AxiosRequestConfig = {
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            lang:lang,
            userToken:userToken
            // appName
        },
    };
    return config;
}

export const baseGetApi = async (path: string, params = "") => {
    let joinPath: string = path;
    try {
        const response = await axios.get(
            `${rootApi}${joinPath}${params}`,
            config(),
        );
        return response.data;
    } catch (error) {
        console.log(error);
        
        return null;
    }
};