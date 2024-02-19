import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store, persistor } from '../src/reduxStore/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import ErrorBoundary from './components/common/ErrorBoundary.jsx'
import './index.css'

const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
//   <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
//   </ErrorBoundary>
)
