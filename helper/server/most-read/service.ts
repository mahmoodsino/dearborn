import { baseGetApi } from "../axios"

const getMostRead = async () => {
        const res = await baseGetApi(`/api/v1/posts?mostRead&&page_size=4`)
        return res
}
export default getMostRead