import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './techat.css';
import Router from './routes/Router';
import { RouterProvider } from 'react-router-dom'
import { SnackbarProvider } from 'notistack';
import MSG from './MSG';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.Fragment>
    <SnackbarProvider maxSnack={5} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000}>
      <MSG />
      <RouterProvider router={Router} />
    </SnackbarProvider>
  </React.Fragment>
);
