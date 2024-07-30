import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../redux/Hooks/hooks";
import { selectPosts, selectWedding } from "../../../redux/selectors/selectWeddingSlice";
import { getAllPostsInWedding } from "../../../redux/slices/weddingSlice";
import { selectLanguage } from "../../../redux/selectors/selectLanguage";
import List from "../../../components/lists/genericlist";
import { IPost } from "../../../models/IPost";
import PostTranslationForm from "../../../components/forms/PostTranslationForm";

function PostMenu() {
    const dispatch = useAppDispatch();
    const wedding = useAppSelector(selectWedding);
    const posts = useAppSelector(selectPosts);
    const language = useAppSelector(selectLanguage).language;
    const [currentPost, setCurrentPost] = useState<IPost>();

    useEffect(()=>{
        if(wedding && posts)
            dispatch(getAllPostsInWedding({weddingId: wedding?.id.toString(), language: language}))                        
    
    }, [])

    function setContentFunction(post : IPost){
        return `${post.id} ${post.title}`;
    }

  return (
    <>
     <List<IPost> listItems={posts} name="posts" setContentFunction={setContentFunction} onclickEvent={(e)=>setCurrentPost(e)} ></List>
     {currentPost && <PostTranslationForm post={currentPost} ></PostTranslationForm>}
     
    </>
  )
}

export default PostMenu