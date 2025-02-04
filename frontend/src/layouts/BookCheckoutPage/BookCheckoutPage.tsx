import { useEffect, useState } from "react"
import BookModel from "../../models/BookModel"
import { SpinnerLoading } from "../Utils/SpinnerLoading"
import bookImage from '../../assets/images/BooksImages/book-luv2code-1000.png';
import { StarsReview } from "../Utils/StarsReview";
import { CheckoutAndReviewBox } from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

export const BookCheckoutPage = () => {

    const { authState } = useOktaAuth()

    const [book, setBook] = useState<BookModel>()
    const [isLoading, setIsLoading] = useState(true)
    const [httpError, setHttpError] = useState<string | null>(null)

    const [reviews, setReviews] = useState<ReviewModel[]>([])
    const [totalStars, setTotalStars] = useState(0)
    const [isLoadingReview, setIsLoadingReview] = useState(true)

    const [isReviewLeft, setIsReviewLeft] = useState(false)
    const [isLoadingUserReview, setIsLoadingUserReview] = useState(true)

    const [curretLoansCount, setCurrentLoansCount] = useState(0)
    const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true)

    const [isCheckedOut, setIsCheckedOut] = useState(false)
    const [isLoadingBookCheckedOut, setIsLoadingBookCheckedOut] = useState(true)

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
    }, [isCheckedOut])

    useEffect(() => {
        const fetchBookReviews = async () => {
            const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?book_id=${bookId}`

            const responseReviews = await fetch(reviewUrl)

            if (!responseReviews.ok) {
                throw new Error('Something went wrong')
            }

            const responseJsonReviews = await responseReviews.json()

            const responseData: ReviewModel[] = [] = responseJsonReviews.content

            const weightedStarReviews: number = responseData.reduce((acc, currentValue) => acc + currentValue.rating, 0)
            const round = (Math.round((weightedStarReviews / responseData.length) * 2) / 2).toFixed(1)
            setTotalStars(Number(round))

            setReviews(responseData)
            setIsLoadingReview(false)
        }

        fetchBookReviews().catch((error: Error) => {
            setIsLoadingReview(false)
            setHttpError(error.message)
        })
    }, [isReviewLeft])

    useEffect(() => {
        const fetchUserReviewBook = async () => {
            if(authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/reviews/secure/user/book?bookId=${bookId}`
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const userReview = await fetch(url, requestOptions)
                if(!userReview.ok) {
                    throw new Error('Something went wrong')
                }
                const userReviewResponseJson = await userReview.json()
                setIsReviewLeft(userReviewResponseJson)
            }
            setIsLoadingUserReview(false)
        }

        fetchUserReviewBook().catch((err: Error) => {
            setIsLoadingUserReview(false)
            setHttpError(err.message)
        })
    }, [authState])

    useEffect(() => {
        const fetchUserCurrentLoansCount = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/currentloans/count`
                const requesOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const currentLoansCountResponse = await fetch(url, requesOptions)
                if (!currentLoansCountResponse.ok) {
                    throw new Error('Something went wrong!')
                }

                const currentLoansCountResponseJson = await currentLoansCountResponse.json()
                setCurrentLoansCount(currentLoansCountResponseJson)
            }
            setIsLoadingCurrentLoansCount(false)
        }

        fetchUserCurrentLoansCount().catch((err: Error) => {
            setIsLoadingCurrentLoansCount(false)
            setHttpError(err.message)
        })
    }, [authState, isCheckedOut])

    useEffect(() => {
        const fetchUserCheckedOutBook = async () => {
            if (authState && authState.isAuthenticated) {
                const url = `http://localhost:8080/api/books/secure/ischeckedout/byuser?bookId=${bookId}`
                const requesOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
                const bookCheckedOut = await fetch(url, requesOptions)

                if (!bookCheckedOut.ok) {
                    throw new Error('Something went wrong')
                }

                const bookCheckedOutResponseJson = await bookCheckedOut.json()
                setIsCheckedOut(bookCheckedOutResponseJson)
            }
            setIsLoadingBookCheckedOut(false)
        }

        fetchUserCheckedOutBook().catch((err: Error) => {
            setIsLoadingBookCheckedOut(false)
            setHttpError(err.message)
        })
    }, [authState])

    if (isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckedOut || isLoadingUserReview) {
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

    async function checkoutBook() {
        const url = `http://localhost:8080/api/books/secure/checkout?bookId=${book?.id}`
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            }
        }

        const checkoutResponse = await fetch(url, requestOptions)
        if(!checkoutResponse.ok) {
            throw new Error('Something went wrong!')
        }
        setIsCheckedOut(true)
    }

    async function submitReview(starInput: number, reviewDescription: string) {
        let bookId: number = 0
        if(book?.id) {
            bookId = book.id
        }

        const reviewRequestModel = new ReviewRequestModel(starInput, bookId, reviewDescription)
        const url = `http://localhost:8080/api/reviews/secure`
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewRequestModel)
        }
        const returnResponse = await fetch(url, requestOptions)

        if(!returnResponse.ok){
            throw new Error('Something went wrong!')
        }
        setIsReviewLeft(true)
    }

    const img = book?.img ? book.img : bookImage

    return (
        <>
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
                            <StarsReview rating={totalStars} size={32} />
                        </div>
                    </div>
                    <CheckoutAndReviewBox
                        book={book}
                        mobile={false}
                        currentLoansCount={curretLoansCount}
                        isAuthenticated={authState?.isAuthenticated}
                        isCheckedOut={isCheckedOut}
                        checkoutBook={checkoutBook}
                        isReviewLeft={isReviewLeft}
                        submitReview={submitReview}
                    />
                </div>
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={false} />
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
                        <StarsReview rating={2.5} size={32} />
                    </div>
                </div>
                <CheckoutAndReviewBox
                    book={book}
                    mobile={true}
                    currentLoansCount={curretLoansCount}
                    isAuthenticated={authState?.isAuthenticated}
                    isCheckedOut={isCheckedOut}
                    checkoutBook={checkoutBook}
                    isReviewLeft={isReviewLeft}
                    submitReview={submitReview}
                />
                <hr />
                <LatestReviews reviews={reviews} bookId={book?.id} mobile={true} />
            </div>
        </>
    )
}