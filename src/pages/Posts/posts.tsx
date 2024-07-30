import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { IPost } from '../../models/IPost';
import { selectPosts, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { getAllPostsInWedding } from '../../redux/slices/weddingSlice';
import { selectLanguage } from '../../redux/selectors/selectLanguage';



function Posts() {
  const dispatch = useAppDispatch()

  let currentWedding = useAppSelector(selectWedding);
  let language = useAppSelector(selectLanguage).language;
  let posts = useAppSelector(selectPosts)

  
  useEffect(()=>{


    
    let wedding_id = currentWedding?.id.toString();
     if(wedding_id != undefined){

       dispatch(getAllPostsInWedding({weddingId: wedding_id, language: language})) //Dispatch Event
       console.log("Test TEST -----------")
      }
     
  }, [])

  const Post = ({ value } : any) => {
    const {body, id, title} = value
    console.log(value);
    return <li>{title} {body} {id}</li>
  }

  function renderPost() {
    if(posts.length > 0)
      return posts.map((post : IPost) => (
        <Post key={post.id} value={post}/>
      ));
    else
      return <li></li>
  };

  return (
      <div>posts length of postsarray {posts.length}
          <ul>
            {renderPost()}
          </ul>
      </div>

  )
}

export default Posts