import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextareaAutosize, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from 'react-redux'
import { addNewPost } from "../../features/counter/counterSlice";

// import { Button } from "../ui/Button/Button";
// import { Input, Textarea } from "../ui/input/input";
import { postType } from '../ui/Post/Post'

import "./NewPostForm.scss"

export interface IFormInput {
	title: string,
	body: string,
}

const createNewPost = (data: IFormInput) => {
	const now = new Date().valueOf()
	const userId = 0
	return {
		title: data.title,
		body: data.body,
		id: now,
		userId: userId,
		isFavorite: false
	}
}

export const NewPostForm: React.FC<{ isActive: boolean, setIsActive: Dispatch<SetStateAction<boolean>> }> = ({ isActive, setIsActive }) => {
	const dispatch = useDispatch()
	const { reset, formState: { errors }, handleSubmit, control } = useForm<IFormInput>({
		defaultValues: {
			body: "",
			title: ""
		},
		mode: 'onSubmit',
		reValidateMode: 'onChange',
		shouldFocusError: true
	})

	const closeForm = () => {
		setIsActive(false)
		reset()
	}
	const onSubmit: SubmitHandler<IFormInput> = (data) => {
		if (data.body.trim() !== '' && data.title.trim() !== '') addPost(data)
	}

	const addPost = (data: IFormInput) => {
		const newPost: postType = createNewPost(data)
		dispatch(addNewPost(newPost))
		closeForm()
	}

	return (
		<Dialog open={isActive}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogTitle>Create new post</DialogTitle>
				<DialogContent>
					<Controller
						name="title"
						control={control}
						rules={{ required: true }}
						render={({ field }) => <TextField
							autoComplete="off"
							{...field}
							label="Post title"
							helperText={errors.title ? "Can not be empty" : ""}
							type="text"
							fullWidth
							variant="standard" />}
					/>
					<Controller
						name="body"
						control={control}
						rules={{ required: true }}
						render={({ field }) => <TextField
							{...field}
							label="Post body"
							helperText={errors.body ? "Can not be empty" : ""}
							type="text"
							fullWidth
							multiline
							variant="standard" />}
					/>

				</DialogContent>
				<DialogActions>
					<Button onClick={closeForm} >Cancel</Button>
					<Button type="submit" variant="contained">Add post</Button>
				</DialogActions>
			</form>
		</Dialog>




		// <div className={isActive ? "add-post active" : "add-post"}>
		// 	<form name="add-post" className="add-post__form form card" onSubmit={handleSubmit(onSubmit)}>
		// 		<div className="card-content">
		// 			<h2 className="form__title card-title">Create new post</h2>
		// 			<Input control={control} name="title" rules={{ required: true }} />
		// 			<Textarea control={control} name="body" rules={{ required: true }} />
		// 		</div>
		// 		<div className="card-action">
		// 			<Button text="Confirm" styles="indigo darken-3" btnType="btn" type="submit" />
		// 			<Button text="Cancel" btnType="btn-flat" type="button" onClick={closeForm} />
		// 		</div>
		// 	</form>
		// </div>
	)
}