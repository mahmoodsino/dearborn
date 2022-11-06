import { baseGetApi } from "../axios"

const getLatestNews = async (params="") => {
        const res = await baseGetApi(`/api/v1/posts?page_size=9`,params)
        return res
}
export default getLatestNews