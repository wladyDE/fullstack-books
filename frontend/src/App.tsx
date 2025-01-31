import './App.css'
import { Footer } from './layouts/Footer/Footer'
import { HomePage } from './layouts/HomePage/HomePage'
import { Navbar } from './layouts/Navbar/Navbar'
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage'

export const App = () => {
  return (
    <>
      <Navbar />
      {/*      <HomePage/> */}
      <SearchBooksPage />
      <Footer />
    </>
  )
}
