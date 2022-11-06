import { baseGetApi } from "../axios"

const getExclusives = async (params="") => {
        const res = await baseGetApi(`/api/v1/exclusives`,params)
        return res
}
export default getExclusives