import axios from "axios"


const getWether = async () => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=dearborn&appid=fc0f9ea0d28492b6183090af28c0c22f&units=metric`)
        return res.data
    } catch (error) {
        console.log(error)
        return null
    }
}
export default getWether