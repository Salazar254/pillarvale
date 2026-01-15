import { useState, useEffect } from 'react'
import { Login } from './components/Login'
import { Dashboard } from './components/Dashboard'
import './index.css'

function App() {
  const [apiKey, setApiKey] = useState<string | null>(null)

  const handleLogin = (key: string) => {
    setApiKey(key)
    localStorage.setItem('payflow_api_key', key)
  }

  const handleLogout = () => {
    setApiKey(null)
    localStorage.removeItem('payflow_api_key')
  }

  // Check for stored API key on mount
  useEffect(() => {
    const storedKey = localStorage.getItem('payflow_api_key')
    if (storedKey) {
      setApiKey(storedKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {apiKey ? (
        <Dashboard apiKey={apiKey} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </>
  )
}

export default App
