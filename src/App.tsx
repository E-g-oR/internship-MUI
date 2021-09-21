import React, { useState } from 'react';
import AllCardsContainer from './components/AllCardsContainer/AllCardsContainer';
import FavoriteCardsContainer from './components/FavoriteCardsContainer/FavoriteCardsContainer';
import CardDetails from './components/CardDetails/CardDetails';
import { NewPostForm } from './components/NewPostForm/NewPostForm';
import './App.scss';
import Button from '@mui/material/Button';
import { createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const App = () => {

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light'
        }
      }),
    [prefersDarkMode],
  );


  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const showPopup = () => setIsModalActive(true)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app" data-testid="app">
        <Button onClick={showPopup} variant="contained">Add new post</Button>
        <div className="app__containers">
          <AllCardsContainer />
          <FavoriteCardsContainer />
          <CardDetails />
        </div>
        <NewPostForm isActive={isModalActive} setIsActive={setIsModalActive} />
      </div>
    </ThemeProvider>


  );
}

export default App;
