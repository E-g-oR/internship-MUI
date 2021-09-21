import React from 'react'
import { postType } from '../Post/Post'
import './button.scss'

interface IPostButton {
   text: string,
   clickHandler: (postObj: postType) => void,
   postObj: postType
}

const PostButton: React.FC<IPostButton> = ({ text, clickHandler, postObj }) => {

   return (
      <button data-testid="post-button" className="post__button" onClick={() => { clickHandler(postObj) }}>{text}</button>
   )
}
export default PostButton