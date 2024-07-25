import { API_URL } from "../constants/environment";
import getAuthHeaders from "./SetAuthHeaders";


export async function deleteMenuOrder(menuOrder_id: number) {

    console.log("TRYING TO FETCH wedddings")
    


    const headers = await getAuthHeaders();

    let response = await fetch(`${API_URL}/api/RSVP/MenuOrder/${menuOrder_id}`, {
       headers,
       method: "DELETE"
    })
    if(!response.ok)
        throw new Error(await response.text() || response.statusText);
    return menuOrder_id;
}