import { IUserReadDTO } from './IUser'

export interface IRSVP{
    id: string
    body: string
    deadline: number
    status: RSVPStatus
    numberOfGuests: number
    otherDietaryRequirements: string
    signer: IUserReadDTO
    choosenDinnerId: number | null
    choosenDessertId: number | null
}


export enum RSVPStatus {
    Pending =  "Pending",
    Accepted ="Accepted",
    Declined ="Declined",
    PastDeadline ="PastDeadline",
    AcceptedCeremony ="AcceptedCeremony"
}