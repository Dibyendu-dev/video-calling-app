import { SocketProvider } from './Context/SocketContext.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <SocketProvider>
    <App />
  </SocketProvider>,
)
