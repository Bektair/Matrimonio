import { ITranslationLocationRequest, IUpdateLocation, IUpdateLocationRequest, IUpdateLocationTranslation } from '../../API/CreateLocation'
import { ILocation } from '../../models/ILocation'
import { useAppDispatch, useAppSelector } from '../../redux/Hooks/hooks'
import { selectLanguage } from '../../redux/selectors/selectLanguage'
import { addLocationTranslationThunk, updateLocationThunk } from '../../redux/slices/locationSlice'
import LocationForm from './LocationForm'

interface IProps {
    location: ILocation
}

function UpdateLocationForm(props: IProps) {
    const dispatch = useAppDispatch();
    const language = useAppSelector(selectLanguage).language;

    function updateLocation(formData :any, e:any){
        console.log("DATA FROM FORM: ---------- UPdate Loaction ..")
        console.log(formData)
        if(e.nativeEvent.submitter.name == "Translate"){
          console.log("CHOOSEN TO ACTUALLY JUST ADD A TRANSLATION")
          var locationTranslation = {
            Title: formData.title,
            Address: formData.address,
            Body: formData.body,
            Country: "",
            Language: language
          } as IUpdateLocationTranslation
          dispatch(addLocationTranslationThunk({ translation: locationTranslation, locationId: props.location.id.toString() } as ITranslationLocationRequest));
        }

        else{

            var locationTranslation = {
              Title: formData.title,
              Address: formData.address,
              Body: formData.body,
              Country: "",
              Language: language
            } as IUpdateLocationTranslation

            var location = {
                Image: formData.img,
                Translation: locationTranslation,
            } as IUpdateLocation
            console.log(location)

            if(location){
                console.log(formData)
                var myLocationRequest = { location: location, locationId: props.location.id.toString()} as IUpdateLocationRequest
                if(myLocationRequest)
                    dispatch(updateLocationThunk(myLocationRequest))
            }
          }

    }


  return (
    <>
      <LocationForm location={props.location} handleLocationSubmit={updateLocation}></LocationForm>  
    </>
  )
}

export default UpdateLocationForm