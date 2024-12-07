import './styles/App.css'
import { HomePage } from './pages/HomePage'
import { PokemonProvider } from './context/PokemonContext'

function App() {

  return (
    <PokemonProvider>
      <HomePage></HomePage>
    </PokemonProvider>
  )
}

export default App
