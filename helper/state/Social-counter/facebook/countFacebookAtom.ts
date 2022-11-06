import { atom } from "recoil";

const countFacebookAtom = atom<number>({
    key:"countFacebookAtom",
    default:0
})

export default countFacebookAtom