import { baseGetApi } from "../axios"

const getNewsOfCategory = async (categorySlug:string,page:number) => {
        const res = await baseGetApi(`/api/v1/posts?categorySlug=${categorySlug}&page=${page}`)
        return res
}
export default getNewsOfCategory