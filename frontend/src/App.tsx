import { Route, Switch, Redirect, useHistory } from 'react-router-dom'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react'

import './App.css'
import { Footer } from './layouts/Footer/Footer'
import { HomePage } from './layouts/HomePage/HomePage'
import { Navbar } from './layouts/Navbar/Navbar'
import { SearchBooksPage } from './layouts/SearchBooksPage/SearchBooksPage'
import { BookCheckoutPage } from './layouts/BookCheckoutPage/BookCheckoutPage'
import { oktaConfig } from './lib/oktaConfig'
import LoginWidget from './auth/LoginWidget'
import { ReviewListPage } from './layouts/BookCheckoutPage/ReviewListPage/ReviewListPage'
import { ShelfPage } from './layouts/ShelfPage/ShelfPage'
import { MessagePage } from './layouts/MessagesPage/MessagesPage'
import { ManageLibraryPage } from './layouts/ManageLibraryPage/ManageLibraryPage'

const oktaAuth = new OktaAuth(oktaConfig)

export const App = () => {
  
  const customAuthHandler = () => {
    history.push('/login')
  }

  const history = useHistory()
  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin))
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
        <Navbar />
        <div className="flex-grow-1">
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
            <Route path="/reviewlist/:bookId">
              <ReviewListPage />
            </Route>
            <Route path="/checkout/:bookId">
              <BookCheckoutPage />
            </Route>
            <Route path="/login" render={
              () => <LoginWidget config={oktaConfig} />
            }
            />
            <Route path="/login/callback" component={LoginCallback} />
            <SecureRoute path="/shelf"><ShelfPage/></SecureRoute>
            <SecureRoute path="/messages"><MessagePage/></SecureRoute>
            <SecureRoute path="/admin"><ManageLibraryPage/></SecureRoute>
          </Switch>
        </div>
        <Footer />
      </Security>
    </div>
  )
}
