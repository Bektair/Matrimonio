export interface IJsonpatch{
    op: string,
    path: string,
    value: string
}



export function createJsonPatch(rsvp: object){
    var patch : IJsonpatch[] = [];
    Object.entries(rsvp)
    .forEach(([key, value])=> {
        if(value != undefined){
            patch.push({
                op: "replace",
                path: "/"+key,
                value: value
            })
        }
    })
    return patch
}
