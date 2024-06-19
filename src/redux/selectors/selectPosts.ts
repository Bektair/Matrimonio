import { RootState } from "../store";

export const selectPosts = (state: RootState) => {
    return state.posts.posts;
  }