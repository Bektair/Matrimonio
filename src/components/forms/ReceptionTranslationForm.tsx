import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { selectLanguage } from "../../redux/selectors/selectLanguage";
import { ITranslateReception } from "../../API/CreateReception";
import { addReceptionTranslationThunk } from "../../redux/slices/weddingSlice";

interface IProps {
  receptionId: string
  weddingId: string
}


function ReceptionTranslationForm(props : IProps) {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage).language;

    function ceremonyFormHandler(formdata : any){
        console.log(formdata)
        var translate : ITranslateReception  = {
            Description: formdata.description,
            IsDefaultLanguage: false,
            Language: language
        } 
        if(translate != null){
          dispatch(addReceptionTranslationThunk({translate: translate, receptionId: props.receptionId}));
        }
        else {
          console.log("Error unable to add translation")
        }
    }
  
  return (
    <div>
        <label>AddTranslation</label>
        <form onSubmit={handleSubmit(ceremonyFormHandler)}>
        <label>Description: <textarea {...register("description")}></textarea></label>
        <button type='submit' name='Add'>AddTranslation</button>
        </form>
    </div>
  )
}

export default ReceptionTranslationForm