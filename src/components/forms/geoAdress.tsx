import { useEffect, useState } from "react"

interface IProps{
    address : string
}

function GeoAdress(props: IProps) {
    const [error, setError] = useState(null);
    const [geoAddress, setGeoAddress] = useState("")

    useEffect(()=>{

        async function fetchData() {
            try {
              console.log("TRY!")
            } catch (error) {
             
            }
          }
      
          fetchData();

        async function getCoordinatesFromAddressAsync(){
            try{
            if(props.address!="")
                await getCoordinatesFromAddress(props.address);
            } catch(error : any){
                console.log("ERRROOOOOOOR")
                setError(error)
            }

        }
        fetchData()
        getCoordinatesFromAddressAsync();
    })
  
    
    async function getCoordinatesFromAddress(address : string){

        console.log("GEOCODE :)")
        var response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?adress=Verven`)
        var geocode = await response.json();
        setGeoAddress(geocode);
        console.log("Nice try")
        
        
        
    }

  
    return (

    <div>
        <div>
            <label>GeoTest</label>
            {geoAddress + "|" + error}
        </div>
    </div>

  )
}

export default GeoAdress