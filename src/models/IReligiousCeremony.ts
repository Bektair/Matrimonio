import { ILocation } from "./ILocation";

export interface IReligiousCeremony{
    id: number,
    startDate: number,
    endDate: number,
    description: string,
    location: ILocation
}