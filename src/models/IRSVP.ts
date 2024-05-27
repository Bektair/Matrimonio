import { IUser } from "./IUser"

export interface IRSVP{
    id: string
    body: string
    deadline: Date
    status: string
    numberOfGuests: number
    dietaryRequirements: string
    Signer: IUser
}