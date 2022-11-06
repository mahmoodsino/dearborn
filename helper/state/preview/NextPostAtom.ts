import { atom } from "recoil";
import { NewsCardType } from "../../type";

 const NextPostAtom = atom<NewsCardType>({
    key:"NextPostAtom",
    default:{} as NewsCardType
 })

 export default NextPostAtom