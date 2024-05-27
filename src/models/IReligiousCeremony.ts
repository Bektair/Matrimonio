import { ILocation } from "./ILocation";

export interface IReligiousCeremony{
    id: number,
    date: Date,
    description: string,
    location: ILocation
}