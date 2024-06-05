import { ILocation } from "./ILocation";
import { IMenuOption } from "./IMenuOption";

export interface IReception{
    id: number,
    date: number,
    description: string,
    location: ILocation,
    menuOptions: IMenuOption[]
}