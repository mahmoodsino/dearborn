import { atom } from "recoil";

const countInstaAtom = atom<number>({
    key:"countInstaAtom",
    default:0
})

export default countInstaAtom