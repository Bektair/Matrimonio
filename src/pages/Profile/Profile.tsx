import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../../components/buttons/logout-button';
import './Profile.sass'
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors/selectAuth';
import WeddingList from '../../components/lists/WeddingList';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { getWeddingsByParticipant } from '../../redux/slices/weddingsSlice';
import { selectWeddings } from '../../redux/selectors/selectWeddingsSlice';

function Profile() {
  const {user, isAuthenticated, id } = useSelector(selectAuth);
  var navigate = useNavigate()
  const dispatch = useAppDispatch();
  const weddings = useSelector(selectWeddings);


  useEffect(()=>{
    console.log(user)

    if(!isAuthenticated){
      console.log("not authenticated")
      navigate("/login")
    }

    if(id)
      dispatch(getWeddingsByParticipant(id)) 

  }, [])
  
  
  return (
    <>
    <div className='profilePage'>
      <img className='profilePicture' src={user?.picture}></img>
      <div>{user?.name}</div>
      <LogoutButton className=''></LogoutButton>

    </div>
    <h2>Enter any wedding you participate in:</h2>
    <WeddingList  weddings={weddings}></WeddingList>
    </>
  )
}

export default Profile