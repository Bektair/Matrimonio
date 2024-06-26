import { useEffect } from 'react'
import {getAllPostsInWedding } from '../../redux/slices/postSlice'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { store } from '../../redux/store';
import { IPost } from '../../models/IPost';
import { selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { selectPosts } from '../../redux/selectors/selectPosts';



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