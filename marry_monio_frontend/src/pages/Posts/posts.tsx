import React, { useEffect } from 'react'
import {getAllPostsInWedding, getPosts, selectPosts } from '../../redux/slices/postSlice'
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { postsSetAction } from '../../redux/actions/postActions';
import { store } from '../../redux/store';
import { IPost } from '../../models/IPost';
import GetPostsAction from '../../components/API/GetPosts';
import Layout from '../../components/Layout/Layout';


function Posts() {
   const dispatch = useAppDispatch()

  let {weddingId} = useParams()
  let posts = useAppSelector(selectPosts)
  let postState = store.getState().posts.posts.length
  
  useEffect(()=>{
    let wedding_id = weddingId?.toString();
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