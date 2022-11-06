import { baseGetApi } from "../axios"

const getHomeSlider = async () => {
        const res = await baseGetApi(`/api/v1/home`)
        return res
}
export default getHomeSlider