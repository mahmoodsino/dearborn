import { atom } from "recoil";
import { ExclusiveType } from "../../type";

const ExclusivesAtom = atom<ExclusiveType[]>({
    key:"ExclusivesAtom",
    default:[]
})

export default ExclusivesAtom