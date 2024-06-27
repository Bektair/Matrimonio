
export interface IUserResponse {
    id: string
    firstName: string
    lastName: string
    profilePicture: string | null
    email: string
    nickname: string
    email_Verified: boolean
}


/* ManagementAPIVersion
    "email": string,
    "email_verified": boolean,
    "username": string,
    "phone_number": number,
    "phone_verified": boolean,
    "user_id": string,
    "created_at": string,
    "updated_at": string,
    "identities": [
    {
        "connection": string,
        "user_id": string,
        "provider": string,
        "isSocial": boolean
    }
    ],
    "app_metadata": object,
    "user_metadata": object,
    "picture": string,
    "name": string,
    "nickname": string,
    "multifactor": [
    string
    ],
    "last_ip": string,
    "last_login": string,
    "logins_count": number,
    "blocked": boolean,
    "given_name": string,
    "family_name": string

*/