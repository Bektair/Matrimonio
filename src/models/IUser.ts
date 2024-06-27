
export interface IUser {
    id: string,
    firstName: string,
    lastName: string,
    profilePicture: string,
    email: string,
    nickname: string,
    email_Verified: boolean
}

export interface IUserReadDTO {
    id: string
    firstName: string
    lastName: string
    profilePicture:string
    email: string
    nickname: string
    password:string
    email_Verified:boolean
}

