import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import PostButton from "./PostButton";
import userEvent from "@testing-library/user-event";

let container = null;
beforeEach(() => {
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

describe('render <PostButton/> component', () => {
	const mockClickHandler = jest.fn()
	const postData = {
		id: 1,
		userId: 1,
		title: 'post title',
		body: 'post body',
		isFavorite: false
	}
	it('renders fine', () => {
		render(<PostButton text='button' postObj={postData} clickHandler={mockClickHandler} />, container)
		expect(screen.queryByText(/button/)).toBeInTheDocument()
	})

	it('should call clickHandler function', () => {
		render(<PostButton text='button' postObj={postData} clickHandler={mockClickHandler} />, container)
		userEvent.click(screen.queryByText(/button/))
		expect(mockClickHandler).toHaveBeenCalled()
	})
})