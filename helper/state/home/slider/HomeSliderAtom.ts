import { atom } from "recoil";
import { HomeSlirderType } from "../../../type";

const HomeSliderAtom = atom<HomeSlirderType[]>({
    key:"HomeSliderAtom",
    default:[]
})

export default HomeSliderAtom