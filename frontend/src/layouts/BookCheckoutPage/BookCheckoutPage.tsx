import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading"
import bookImage from '../../assets/images/BooksImages/book-luv2code-1000.png';

export const BookCheckoutPage = () => {

    const [book, setBook] = useState<BookModel>()
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState<string | null>(null)

    const bookId = (window.location.pathname).split('/')[2]

    useEffect(() => {
        const fetchBook = async () => {

            const baseUrl: string = `http://localhost:8080/api/books/${bookId}`

            const response = await fetch(baseUrl)

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const responseJson = await response.json()

            setBook(responseJson)
            setIsLoading(false)
        }

        fetchBook().catch((error: Error) => {
            setIsLoading(false)
            setHttpError(error.message)
        })
    }, [])

    if (isLoading) {
        return (
            <div className="container m-5">
                <SpinnerLoading />
            </div>
        )
    }

    if (httpError) {
        return (
            <div className="container m-5">
                <p>{httpError}</p>
            </div>
        )
    }

    const img = book?.img ? book.img : bookImage

    return (
        <div className="container d-none d-lg-block">
            <div className="row mt-5">
                <div className="col-sm-2 col-md-2">
                    <img src={img} width="226" height="349" alt="Book" />
                </div>
                <div className="col-4 col-md-4 container">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                    </div>
                </div>
                <hr />
            </div>
            <div className="container d-lg-none mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    <img src={img} width="226" height="349" alt="Book" />
                </div>
                <div className="mt-4">
                    <div className="ml-2">
                        <h2>{book?.title}</h2>
                        <h5 className="text-primary">{book?.author}</h5>
                        <p className="lead">{book?.description}</p>
                    </div>
                </div>
                <hr />
            </div>
        </div>
    )
}