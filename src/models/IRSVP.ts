import { IUserReadDTO } from "../API/GetRSVP"

export interface IRSVP{
    id: string
    body: string
    deadline: number
    status: string
    numberOfGuests: number
    OtherDietaryRequirements: string
    Signer: IUserReadDTO
    ChoosenDinnerId: number | null
    ChoosenDessertId: number | null
}