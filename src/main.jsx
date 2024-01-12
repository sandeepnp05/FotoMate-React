import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Provider} from 'react-redux'
import {store,persistor} from '../src/reduxStore/store.js'
import { PersistGate } from 'redux-persist/integration/react';  
import './index.css' 
// import "font-awesome/css/font-awesome.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
 
)
