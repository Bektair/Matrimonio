import { ILocation } from "./ILocation";

export interface IReception{
    id: number,
    date: Date,
    description: string,
    location: ILocation
}