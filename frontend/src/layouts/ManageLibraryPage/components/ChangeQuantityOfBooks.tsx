import React from "react";
import { useEffect, useState } from "react";
import BookModel from '../../../models/BookModel';
import { SpinnerLoading } from '../../Utils/SpinnerLoading';
import { Pagination } from '../../Utils/Pagination';
import { ChangeQuantityOfBook } from "./ChangeQuantityOfBook";

export const ChangeQuantityOfBooks = () => {

    const [books, setBooks] = useState<BookModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(5);
    const [totalAmountOfBooks, setTotalAmountOfBooks] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [bookDelete, setBookDelete] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = `http://localhost:8080/api/books?page=${currentPage - 1}&size=${booksPerPage}`;

            const response = await fetch(baseUrl);

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const responseJson = await response.json();

            const loadedBooks: BookModel[] = responseJson.content;

            setTotalAmountOfBooks(responseJson.totalElements);
            setTotalPages(responseJson.totalPages);

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, [currentPage, bookDelete]);

    const indexOfLastBook: number = currentPage * booksPerPage;
    const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
    const lastItem = booksPerPage * currentPage <= totalAmountOfBooks ?
        booksPerPage * currentPage : totalAmountOfBooks;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteBook = () => setBookDelete(!bookDelete);

    if (isLoading) {
        return (
            <SpinnerLoading/>
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div className='container mt-5'>
            {totalAmountOfBooks > 0 ?
                <>
                    <div className='mt-3'>
                        <h3>Number of results: ({totalAmountOfBooks})</h3>
                    </div>
                    <p>
                        {indexOfFirstBook + 1} to {lastItem} of {totalAmountOfBooks} items: 
                    </p>
                    {books.map(book => (
                       <ChangeQuantityOfBook book={book} key={book.id} deleteBook={deleteBook}/>
                    ))}
                </>
                :
                <h5>Add a book before changing quantity</h5>
            }
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>}
        </div>
    );
}