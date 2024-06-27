import { RootState } from "../store";

export const selectLocations = (state: RootState) => {
    return state.locations.locations;
}

export const selectLocationById = (id: number) =>  (state: RootState ) => {
    var location = state.locations.locations.filter((location) => location.id == id);
    return location.length==1 ? location[0] : undefined;
}


export const selectCurrentLocation = (state: RootState) => {
    return state.locations.active_location;
}