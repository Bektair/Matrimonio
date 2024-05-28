// import Cookies from 'js-cookie';



async function getAuthHeaders(): Promise<HeadersInit> {
    // const token = Cookies.get('token');
    var token = ""

    console.log("GETTING TOKEN_------------------" + token)
    
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    }
}

export default getAuthHeaders;  