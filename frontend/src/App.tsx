import './App.css'
import { Footer } from './layouts/Footer/Footer'
import { Carousel } from './layouts/HomePage/Carousel'
import { ExploreTopBooks } from './layouts/HomePage/ExploreTopBooks'
import { Heros } from './layouts/HomePage/Heroes'
import { LibraryServices } from './layouts/HomePage/LibraryServices'
import { Navbar } from './layouts/Navbar/Navbar'

function App() {
  return (
    <>
        <Navbar/>
        <ExploreTopBooks/>
        <Carousel/>
        <Heros/>
        <LibraryServices/>
        <Footer/>
    </>
  )
}

export default App
