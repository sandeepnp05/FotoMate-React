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

  React.useEffect(() => {
   var _mtm = window._mtm = window._mtm || [];
   _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
   var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
   g.async=true; g.src='https://cdn.matomo.cloud/fotomatevercelapp.matomo.cloud/container_fBrE1IGl.js'; s.parentNode.insertBefore(g,s);
  }, [])
  
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
