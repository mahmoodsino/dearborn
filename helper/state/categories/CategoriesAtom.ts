import { atom } from "recoil";
import { CategoriesType } from "../../type";

const CategoriesAtom = atom<CategoriesType[]>({
    key:"CategoriesAtom",
    default:[]
})

export default CategoriesAtom