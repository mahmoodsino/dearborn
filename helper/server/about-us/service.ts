import { baseGetApi } from "../axios"

const getAboutUs = async () => {
        const res = await baseGetApi(`/api/v1/about-us`)
        return res
}
export default getAboutUs