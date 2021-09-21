import { CaseReducer, createSlice } from "@reduxjs/toolkit";
import { RootStateOrAny } from "react-redux";
import { postType } from "../../components/ui/Post/Post";

const like: CaseReducer<RootStateOrAny, RootStateOrAny> = (state, action) => {
   state.allPosts.map((post: postType) => {
      if (post.id === action.payload.id) {
         post.isFavorite = true
         state.favoritePosts.push(post)
      }
   })
}

const decr: CaseReducer<RootStateOrAny, RootStateOrAny> = (state, action) => {
   const index: number = state.favoritePosts.findIndex((item: postType) => item.id === action.payload.id)
   state.allPosts.map((post: postType) => {
      if (post.id === action.payload.id) {
         post.isFavorite = false
      }
   })
   state.favoritePosts.splice(index, 1)
}
const addNew: CaseReducer<RootStateOrAny, RootStateOrAny> = (state, action) => {
   state.allPosts.unshift(action.payload)
}
const addAll: CaseReducer<RootStateOrAny, RootStateOrAny> = (state, action) => {
   state.allPosts = action.payload
}

export const counterSlice = createSlice({
   name: 'counter',
   initialState: {
      allPosts: [],
      favoritePosts: []
   },
   reducers: {
      increment: like,
      decrement: decr,
      addAllPosts: addAll,
      addNewPost: addNew,
   },
})

export const { increment, decrement, addAllPosts, addNewPost } = counterSlice.actions
export default counterSlice.reducer