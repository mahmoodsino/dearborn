import { atom } from "recoil";
import { NewsCardType } from "../../type";

const MostPupularAtom = atom<NewsCardType[]>({
    key:"MostPupularAtom",
    default:[]
})

export default MostPupularAtom