import BookModel from "../../../models/BookModel"
import bookImage from './../../../assets/images/BooksImages/book-luv2code-1000.png';


export const SearchBook: React.FC<{ book: BookModel }> = (props) => {
    const img = props.book.img ? props.book.img : bookImage

    return (
        <div className='card mt-3 shadow p-3 mb-3 bg-body rounded'>
            <div className='row g-0'>
                <div className='col-md-2'>
                    <div className='d-none d-lg-block'>
                        <img src={img}
                            width='123'
                            height='196'
                            alt='Book'
                        />
                    </div>
                    <div className='d-lg-none d-flex justify-content-center 
                        align-items-center'>
                        <img src={img}
                            width='123'
                            height='196'
                            alt='Book'
                        />
                    </div>
                </div>
                <div className='col-md-6'>
                    <div className='card-body'>
                        <h5 className='card-title'>
                            {props.book.author}
                        </h5>
                        <h4>
                            {props.book.title}
                        </h4>
                        <p className='card-text'>
                            {props.book.description}
                        </p>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <a className='btn btn-md main-color text-white' href='#'>
                        View Details
                    </a>
                </div>
            </div>
        </div>
    );
}