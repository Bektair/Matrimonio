export function convertToUUID(id : string) {
    let uuid = "";
    console.log("Trying to generate UUID :)")
    console.log(id)
    if(id.length < 32){
        for(let i = 1; i<=32; i++){
            uuid += (i <= id.length) ? id[i-1] : "0" 

            if(i == 8 || i == 12 || i == 16 || i == 20 )
                uuid += "-"
        }
        
    } 
    console.log(uuid)
    return uuid;

 }