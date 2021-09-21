import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';

import { NewPostForm } from "./NewPostForm";
import { Provider } from 'react-redux';
import store from '../../app/store';
import userEvent from '@testing-library/user-event';
import { act } from '@testing-library/react';

const mockSetIsActive = jest.fn()

let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

describe('render <NewPostForm/> component', () => {

	it('should be rendered fine', () => {
		act(() => {
			render(<Provider store={store}> <NewPostForm isActive={false} setIsActive={mockSetIsActive} /></Provider>, container)
		})

		expect(screen.queryByText('Create new post')).toBeInTheDocument()
		expect(screen.queryByText(/title/i)).toBeInTheDocument()
		expect(screen.queryByLabelText(/body/i)).toBeInTheDocument()
	})
	describe('check change values', () => {
		it('changes input value', async () => {
			await act(async () => {
				render(<Provider store={store}> <NewPostForm isActive={false} setIsActive={mockSetIsActive} /></Provider>, container)
			})
			const input = screen.getByTestId(/input/)

			await act(async () => {
				fireEvent.change(input, { target: { value: 'post body' } })
				// userEvent.type(screen.getByTestId(/input/), 'post body')  //* Хотел сделать через userEvent, но почему-то передается только последняя буква
			})

			expect(input).toHaveValue('post body')
		})

		it('changes textarea value', async () => {
			await act(async () => {
				render(<Provider store={store}> <NewPostForm isActive={false} setIsActive={mockSetIsActive} /></Provider>, container)
			})
			const textarea = screen.getByTestId(/textarea/)

			await act(async () => {
				fireEvent.change(textarea, { target: { value: 'post body' } })
			})

			expect(textarea).toHaveValue('post body')
		})
		it('should display helper text if both fields are empty', async () => {
			await act(async () => {
				render(<Provider store={store}> <NewPostForm isActive={false} setIsActive={mockSetIsActive} /></Provider>, container)
			})
			const helperTexts = screen.getAllByTestId('helper-text')

			await act(async () => {
				fireEvent.click(screen.getByText(/confirm/i))
			})

			helperTexts.forEach((elem) => {
				expect(elem).toHaveTextContent('Can not be empty')
			})
		})

		it('must clear form on Cancel button', async () => {
			await act(async () => {
				render(<Provider store={store}> <NewPostForm isActive={false} setIsActive={mockSetIsActive} /></Provider>, container)
			})
			const newPostBtn = screen.queryByText(/new post/i),
				titleField = screen.queryByLabelText(/title/i),
				bodyField = screen.queryByLabelText(/body/i),
				cancelBtn = screen.queryByText(/cancel/i)

			fireEvent.click(newPostBtn)
			await act(async () => {
				fireEvent.change(titleField, { target: { value: 'post title' } })
			})
			expect(titleField).toHaveValue('post title')
			fireEvent.click(cancelBtn)
			expect(titleField).toBeEmptyDOMElement()
			expect(titleField).toHaveValue('')
		})
	})
})