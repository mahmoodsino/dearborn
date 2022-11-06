import CategoriesType from "./CategoriesType"

type NewsCardType = {
    id: number,
    created_at:string,
    title: string,
    short_description:string,
    img: string,
    is_today: number,
    views:number,
    slug: string,
    category: CategoriesType
}

export default NewsCardType