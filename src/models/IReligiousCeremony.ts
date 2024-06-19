import { ILocation } from "./ILocation";

export interface IReligiousCeremony{
    id: number,
    date: number,
    description: string,
    location: ILocation
}