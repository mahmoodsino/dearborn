import { baseGetApi } from "../axios"

const getPost = async (categorySlug:string) => {
        const res = await baseGetApi(`/api/v1/posts/${categorySlug}`)
        return res
}
export default getPost