import { Link } from 'react-router-dom';
import BookModel from '../../../models/BookModel';
import bookImage from './../../../assets/images/BooksImages/book-luv2code-1000.png';

export const ReturnBook: React.FC<{book: BookModel}> = (props) => {
    const img = props.book.img ? props.book.img : bookImage
    
    return (
        <div className='col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3'>
            <div className='text-center'>
                <img
                    src={img}
                    width='151'
                    height='233'
                    alt="book"
                />
                <h6 className='mt-2'>{props.book.title}</h6>
                <p>{props.book.author}</p>
                <Link className='btn main-color text-white' to={`checkout/${props.book.id}`}>Reserve</Link>
            </div>
        </div>
    )
}