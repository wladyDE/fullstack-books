import './App.css'
import { Carousel } from './layouts/HomePage/Carousel'
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks'
import { Navbar } from './layouts/Navbar/Navbar'

function App() {
  return (
    <>
        <Navbar/>
        <ExploreTopBooks/>
        <Carousel/>
    </>
  )
}

export default App
