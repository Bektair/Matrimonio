import { IUserReadDTO } from "../API/GetRSVP"

export interface IRSVP{
    id: string
    body: string
    deadline: number
    status: RSVPStatus
    numberOfGuests: number
    OtherDietaryRequirements: string
    Signer: IUserReadDTO
    ChoosenDinnerId: number | null
    ChoosenDessertId: number | null
}


export enum RSVPStatus {
    Pending =  "Pending",
    Accepted ="Accepted",
    Declined ="Declined",
    PastDeadline ="PastDeadline",
    AcceptedCeremony ="AcceptedCeremony"
}