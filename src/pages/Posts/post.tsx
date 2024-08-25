import { useNavigate } from "react-router-dom";
import { ImageRoles } from "../../constants/imageRoles";
import { IPost } from "../../models/IPost";
import './post.sass'
import PathConstants from "../../components/route/pathConstants";

interface IProps {
    post: IPost
}


const Post = ( value : IProps) => {
    const navigate = useNavigate()
    const {body, id, title, language, images} = value.post
    console.log(value);

    var mainImage = images.find((i)=> i.role == ImageRoles.MainImage)
    console.log("MAINIMAGE------------------------------------------------------")
    console.log(mainImage)

    return <li className="postListItem" onClick={()=> {navigate(PathConstants.PostsDetails+"/"+id)}}><div><img src={mainImage?.uri} className="posterImage"/></div><label>{title}</label></li>
}

export default Post