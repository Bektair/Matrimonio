import { RequestsEnum } from "../store"


export const postsSetAction = (payload : string) => ({
    type: RequestsEnum.GetPosts,
    payload: payload
})

