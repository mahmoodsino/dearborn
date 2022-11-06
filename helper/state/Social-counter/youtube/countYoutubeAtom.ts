import { atom } from "recoil";

const countYoutubeAtom = atom<number>({
    key:"countYoutubeAtom",
    default:0
})

export default countYoutubeAtom