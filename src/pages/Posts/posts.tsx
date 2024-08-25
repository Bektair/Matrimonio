import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks';
import { IPost } from '../../models/IPost';
import { selectPosts, selectWedding } from '../../redux/selectors/selectWeddingSlice';
import { getAllPostsInWedding } from '../../redux/slices/weddingSlice';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import Post from './post';
import './posts.sass'


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



  function renderPost() {
    if(posts.length > 0)
      return posts.map((post : IPost) => (
        <Post key={post.id} post={post}/>
      ));
    else
      return <li></li>
  };

  return (
      <div>posts length of postsarray {posts.length}
          <ul className='postsGrid'>
            {renderPost()}
          </ul>
      </div>

  )
}

export default Posts