import { useParams } from "react-router-dom"
import { useAppSelector } from "../../redux/Hooks/hooks";
import { selectPosts } from "../../redux/selectors/selectWeddingSlice";
import { ImageRoles } from "../../constants/imageRoles";
import './postDetails.sass'
import Markdown from "react-markdown";

function PostDetails() {
    const { id } = useParams();
    const posts = useAppSelector(selectPosts);
    var post = posts.find((p)=> p.id.toString() == id);
    const markdown = "## Hello, \n**World** World!"

  return (
    <>    
        <h2>{post?.title}</h2>
        <img className="mainImage" src={post?.images.find((img)=> img.role == ImageRoles.MainImage)?.uri}/>
        
        <div className="sideBar">    
          <img className="sideImage" src={post?.images.find((img)=> img.role == ImageRoles.SideImage)?.uri}/>
          <p>Fine</p>
        </div>
        <p>{post?.body}</p>
        <Markdown>{markdown}</Markdown>
    </>
  )
}

export default PostDetails