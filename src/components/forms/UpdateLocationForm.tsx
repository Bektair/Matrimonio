import { ILocationRequest } from '../../API/CreateLocation'
import { ILocation } from '../../models/ILocation'
import { useAppDispatch } from '../../redux/Hooks/hooks'
import { ICreateLocation, updateLocationThunk } from '../../redux/slices/locationSlice'
import LocationForm from './LocationForm'

interface IProps {
    location: ILocation
}

function UpdateLocationForm(props: IProps) {
    const dispatch = useAppDispatch();

    function updateLocation(formData :any){
        console.log(formData)


            var location = {
                title: formData.title,
                address: formData.address,
                placeName: "",
                body: formData.body,
                image: formData.img,
                country: "",
                region:"",
                lat: 0,
                lng: 0
            } as ILocationRequest

            if(location){
                console.log(formData)
                var myLocationRequest = { location: location, reception: false} as ICreateLocation
                if(myLocationRequest)
                    dispatch(updateLocationThunk({ location: myLocationRequest, id: props.location.id}))
            }

    }


  return (
    <>
      <LocationForm location={props.location} handleLocationSubmit={updateLocation}></LocationForm>  
    </>
  )
}

export default UpdateLocationForm