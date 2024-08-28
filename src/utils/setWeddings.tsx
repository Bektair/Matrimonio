import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "../redux/Hooks/hooks";
import { selectWeddings } from "../redux/selectors/selectWeddingsSlice";
import { getUserByEmailThunk } from "../redux/slices/authSlice";
import { setWedding } from "../redux/slices/weddingSlice";
import { getWeddingsByParticipant } from "../redux/slices/weddingsSlice";
import { selectAuth } from "../redux/selectors/selectAuth";
import { selectLanguage } from "../redux/selectors/selectLanguage";

export const setWeddingEvent = () => {
  const weddings = useAppSelector(selectWeddings)
  const dispatch = useAppDispatch();
  const { dbId } = useSelector(selectAuth);
  const language = useAppSelector(selectLanguage).language;

  if(weddings.length > 0)
      dispatch(setWedding({
          wedding: weddings[0], 
      }));
  else{
      if(dbId)
        dispatch(getWeddingsByParticipant({participantId: dbId, language: language}));
      else
        dispatch(getUserByEmailThunk());
  } 
}