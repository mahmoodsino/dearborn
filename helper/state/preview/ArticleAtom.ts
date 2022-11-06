import { atom } from "recoil";
import { PostType } from "../../type";

const ArticleAtom = atom<PostType>({
    key:"ArticleAtom",
    default:{} as PostType
})

export default ArticleAtom