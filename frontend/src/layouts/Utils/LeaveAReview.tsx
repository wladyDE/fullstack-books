import { useState } from "react";
import { StarsReview } from "./StarsReview";

export const LeaveAReview: React.FC<{submitReivew : any}> = (props) => {
    const [starInput, setStarInput] = useState(0)
    const [displayInput, setDisplayInput] = useState(false)
    const [reviewDescription, setReviewDescription] = useState('')

    function starValue(value: number) {
        setStarInput(value)
        setDisplayInput(true)
    }

    function handleSubmit(event) {
        event.preventDefault(); 
        props.submitReivew(starInput, reviewDescription);
    }

    return (
        <div className="dropdown" style={{ cursor: 'pointer' }}>
            <h5 className="dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle='dropdown'>
                Leave a review?
            </h5>
            <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {starValues.map(value => {
                    return (
                        <li key={value}>
                            <button onClick={() => starValue(value)} className="dropdown-item">{value} star</button>
                        </li>
                    )
                })}
            </ul>
            <StarsReview rating={starInput} size={32} />

            {displayInput &&
                <form onSubmit={handleSubmit}>
                    <hr />

                    <div className="mb-3">
                        <label className="form-label">
                            Description
                        </label>
                        <textarea className="form-control" id="submitReviewDescription"
                            placeholder='Optional' rows={3} onChange={e => setReviewDescription(e.target.value)}>
                        </textarea>
                    </div>

                    <div>
                        <button type="submit" className="btn btn-primary mt-3" onClick={() => props.submitReivew(starInput, reviewDescription)} >Submit Review</button>
                    </div>
                </form>
            }
        </div>
    )
}

const starValues: number[] = [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]