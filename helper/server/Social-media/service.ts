import { baseGetApi } from "../axios"

const getSocialCounter = async (name:string) => {
        const res = await baseGetApi(`/api/v1/social-counter/${name}`)
        return res
}
export default getSocialCounter