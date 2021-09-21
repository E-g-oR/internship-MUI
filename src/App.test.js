
import React from 'react';
import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react';

import App from './App';
import { Provider } from 'react-redux';
import store from './app/store';
import userEvent from '@testing-library/user-event';
import { unmountComponentAtNode } from 'react-dom';

global.fetch = jest.fn(() => Promise.resolve({
   json: () => Promise.resolve([
      {
         "userId": 1,
         "id": 1,
         "title": "first post",
         "body": "hello world"
      }
   ])
}))

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

describe('render <App/> component', () => {
   it('renders whole app to the document', async () => {
      await act(async () => {
         render(<Provider store={store}> <App /> </Provider>, container)
      })
      const button = screen.queryByText(/add to/i)
      const favContainer = screen.getByTestId('favorite-cards-container')

      expect(screen.queryByText('Create new post')).toBeInTheDocument()
      expect(screen.getByTestId('app')).toBeInTheDocument()
      expect(favContainer).toBeEmptyDOMElement()
      userEvent.click(button)
      expect(favContainer).not.toBeEmptyDOMElement()
   });

   it('should add new post to list', async () => {
      await act(async () => {
         render(<Provider store={store}> <App /> </Provider>, container)
      })
      const newPostBtn = screen.queryByText(/add new/i),
         titleInput = screen.queryByTestId(/input/i),
         bodyInput = screen.queryByTestId(/textarea/i),
         addPostBtn = screen.queryByText(/confirm/i),
         AllCardsContainer = screen.queryByTestId('all-cards-container');

      await act(async () => {
         // userEvent.click(newPostBtn)
         fireEvent.change(titleInput, { target: { value: 'new post title' } })
         fireEvent.change(bodyInput, { target: { value: 'new post body text' } })
         userEvent.click(addPostBtn)
      })
      expect(screen.queryByText(/empty/i)).not.toBeInTheDocument()
      expect(AllCardsContainer).toHaveTextContent(/new post title/i)
   })

   it('does NOT adding new post if some info missed', async () => {
      await act(async () => {
         render(<Provider store={store}> <App /> </Provider>, container)
      })

      const newPostBtn = screen.queryByText(/add new/i),
         titleInput = screen.queryByTestId(/input/i),
         addPostBtn = screen.queryByText(/confirm/i),
         AllCardsContainer = screen.queryByTestId('all-cards-container');

      await act(async () => {
         // userEvent.click(newPostBtn)
         fireEvent.change(titleInput, { target: { value: 'new post title' } })
         userEvent.click(addPostBtn)
      })
      expect(screen.queryByText(/empty/i)).toBeInTheDocument()
      expect(AllCardsContainer).not.toHaveTextContent(/new post title/i)
      expect(screen.queryByText(/new post title/i)).toBeFalsy()

   })

   it('clear form on submit', async () => {
      await act(async () => {
         render(<Provider store={store}> <App /> </Provider>, container)
      })
      const newPostBtn = screen.queryByText(/add new post/i)
      const titleField = screen.queryByLabelText(/title/i)
      const bodyField = screen.queryByLabelText(/body/i)
      const cancelBtn = screen.queryByText(/cancel/i)
      const addPostBtn = screen.queryByText(/confirm/i)
      fireEvent.click(newPostBtn)
      await act(async () => {
         fireEvent.change(titleField, { target: { value: 'post title' } })
         fireEvent.change(bodyField, { target: { value: 'post body' } })
      })
      expect(titleField).toHaveValue('post title')
      await act(async () => {
         fireEvent.click(addPostBtn)
      })
      expect(titleField).toBeEmptyDOMElement()
      expect(titleField).toHaveValue('')
      expect(bodyField).toBeEmptyDOMElement()
      expect(bodyField).toHaveValue('')
   })
})