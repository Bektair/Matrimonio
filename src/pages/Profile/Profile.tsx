import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoutButton } from '../../components/buttons/logout-button';
import './Profile.sass'
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/selectors/selectAuth';
import WeddingList from '../../components/lists/WeddingList';
import { useAppDispatch } from '../../redux/Hooks/hooks';
import { getWeddingsByParticipant } from '../../redux/slices/weddingsSlice';
import { selectWeddings } from '../../redux/selectors/selectWeddingsSlice';
import { selectLanguage } from '../../redux/selectors/selectLanguage';
import { useTranslation } from 'react-i18next';
import HoverImage from '../../components/images/HooverImage';
import { editImage } from '../../constants/svgImages';
import { updateUserThunk } from '../../redux/slices/authSlice';
import { IUserUpdate, IUserUpdateRequest } from '../../API/UpdateUser';

function Profile() {
  const {user, isAuthenticated, id } = useSelector(selectAuth);
  var navigate = useNavigate()
  const dispatch = useAppDispatch();
  const weddings = useSelector(selectWeddings);
  const language = useSelector(selectLanguage).language;
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState<string | ArrayBuffer | null>(null);
  
  useEffect(()=>{
    console.log(user)

    if(!isAuthenticated){
      console.log("not authenticated")
      navigate("/login")
    }

    if(id)
      dispatch(getWeddingsByParticipant({participantId: id, language: language})) 

  }, [])
  
  function addProfilePicture(){
    var fileInput = document.getElementById('fileInput');
    if(fileInput)
      fileInput.click();

  }

  const handleFileChange = (event : any) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            console.log("ReaderInner")
            setSelectedFile(reader.result);
            if(id){
              var uUpdate : IUserUpdate = {
                profilePicture: reader.result?.toString() ?? "" ,
              };
        
              var updateDispatch : IUserUpdateRequest = {
                id: id,
                userUpdate: uUpdate
              };
              console.log("UPDATE_USER----------------------------")
              console.log(updateDispatch)
              dispatch(updateUserThunk(updateDispatch));   
            }
        };
        reader.readAsDataURL(file);
    } 

    console.log(selectedFile)


};

  
  return (
    <>
    <div className='profilePage'>
      <div className='profilePictureContainer' onClick={addProfilePicture}>
        <HoverImage srcOriginal={user?.profile ?? user?.picture ?? ""} srcHoover={editImage}></HoverImage>
        <input
                type="file"
                id="fileInput"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
      </div>
      <div>{user?.name}</div>
      <LogoutButton className=''></LogoutButton>
    </div>
    <h2>{t("enterWedding")}</h2>
    <WeddingList  weddings={weddings}></WeddingList>
    </>
  )
}

export default Profile