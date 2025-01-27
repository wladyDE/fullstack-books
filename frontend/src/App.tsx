import './App.css'
import { Footer } from './layouts/Footer/Footer'
import { HomePage } from './layouts/HomePage/HomePage'
import { Navbar } from './layouts/Navbar/Navbar'

export const App = () => {
  return (
    <>
      <Navbar />
      <HomePage/>
      <Footer />
    </>
  )
}
