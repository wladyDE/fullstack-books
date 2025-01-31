import { Route, Switch, Redirect } from 'react-router-dom'

import './App.css'
import { Footer } from './layouts/Footer/Footer'
import { HomePage } from './layouts/HomePage/HomePage'
import { Navbar } from './layouts/Navbar/Navbar'
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage'

export const App = () => {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />

      <div className='flex-grow-1'>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/search">
            <SearchBooksPage />
          </Route>
        </Switch>
      </div>
      <Footer />
    </div>
  )
}
