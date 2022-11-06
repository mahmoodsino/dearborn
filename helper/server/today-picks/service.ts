import { baseGetApi } from "../axios"

const getTodayPicks = async (params="") => {
        const res = await baseGetApi(`/api/v1/posts?isToday`,params)
        return res
}
export default getTodayPicks