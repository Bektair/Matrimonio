import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './_index.sass'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak, { initialize }  from '../keycloak'
import { Container } from 'react-bootstrap'

const root = ReactDOM.createRoot(document.getElementById('root')!);


initialize().then(()=> {
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
}).catch((error) => {
  console.log("Failed to initialize keycloak: ", error)
  root.render(
    <Container className='background d-flex justify-content-center align-items-center'>
      <Container className="card">
          <p>It looks like our identity provider is down. Pleae try again later.</p>
          <p>{error.message}</p>
      </Container>
    </Container>
  )
})
