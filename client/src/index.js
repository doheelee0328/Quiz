import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './slices/index.tsx'

const root = ReactDOM.createRoot(document.getElementById('root'))

console.log(store.getState())

function Loading() {
  return <div>Loading.....</div>
}
// since lazy loading asynchronous its a good practice to use suspense
// to show that the page is loading.

// wrap the suspense the app to handle the lazy load splitting in the entire application

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Suspense fallback={Loading}>
          <App />
        </Suspense>
      </HashRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
