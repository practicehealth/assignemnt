import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import MainStateProvider from './context/MainState.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <MainStateProvider>
    <App />
  </MainStateProvider>
)
