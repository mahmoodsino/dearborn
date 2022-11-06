import CategoriesType from "./CategoriesType"

type PostType = {
    id: number,
    created_at: string,
    title: string,
    short_description: string,
    description: string,
    img: string,
    views: number,
    slug: string,
    categories: CategoriesType[]
}

export default PostType