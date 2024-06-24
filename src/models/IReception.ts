import { ILocation } from "./ILocation";
import { IMenuOption } from "./IMenuOption";

export interface IReception{
    id: number,
    startDate: number,
    endDate: number,
    description: string,
    location: ILocation,
    menuOptions: IMenuOption[]
}