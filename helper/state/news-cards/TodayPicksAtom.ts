import { atom } from "recoil";
import { NewsCardType } from "../../type";

const TodayPicksAtom = atom<NewsCardType[]>({
    key:"TodayPicksAtom",
    default:[]
})

export default TodayPicksAtom