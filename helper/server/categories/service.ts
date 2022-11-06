import { baseGetApi } from "../axios"

const getCategories = async () => {
        const res = await baseGetApi(`/api/v1/categories`)
        return res
}
export default getCategories