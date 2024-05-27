import { useEffect } from 'react'
import {getAllPostsInWedding, selectPosts } from '../../../marry_monio_frontend/src/redux/slices/postSlice'
import { useAppDispatch, useAppSelector } from '../../../marry_monio_frontend/src/redux/Hooks/hooks';
import { store } from '../../../marry_monio_frontend/src/redux/store';
import { IPost } from '../../../marry_monio_frontend/src/models/IPost';
import { selectWedding } from '../../../marry_monio_frontend/src/redux/slices/weddingSlice';



function Posts() {
  const dispatch = useAppDispatch()

  let currentWedding = useAppSelector(selectWedding);
  let posts = useAppSelector(selectPosts)
  let postState = store.getState().posts.posts.length

  
  useEffect(()=>{
    let wedding_id = currentWedding?.id.toString();
     if(wedding_id != undefined){

       dispatch(getAllPostsInWedding(Number(wedding_id))) //Dispatch Event
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
      <div>posts length of postsarray  {postState} {posts.length}
          <ul>
            {renderPost()}
          </ul>
      </div>

  )
}

export default Posts