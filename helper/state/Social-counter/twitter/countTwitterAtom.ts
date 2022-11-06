import { atom } from "recoil";

const countTwitterAtom = atom<number>({
    key:"countTwitterAtom",
    default:0
})

export default countTwitterAtom