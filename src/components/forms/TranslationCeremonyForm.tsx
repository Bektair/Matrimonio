import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks/hooks";
import { ITranslateCeremony } from "../../API/CreateCeremony";
import { addCeremonyTranslationThunk } from "../../redux/slices/weddingSlice";
import { selectLanguage } from "../../redux/selectors/selectLanguage";

interface IProps {
    ceremonyId: string
    weddingId: string
}

function TranslationCeremonyForm(props : IProps) {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage).language;

    function ceremonyFormHandler(formdata : any){
        console.log(formdata)
        var translate : ITranslateCeremony  = {
            Description: formdata.description,
            IsDefaultLanguage: false,
            Language: language
        } 
    
        dispatch(addCeremonyTranslationThunk({translate: translate, ceremonyId: props.ceremonyId}));
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

export default TranslationCeremonyForm