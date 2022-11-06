import { baseGetApi } from "../axios"

const getMostPopular = async () => {
        const res = await baseGetApi(`/api/v1/posts?mostPopular&&page_size=4`)
        return res
}
export default getMostPopular