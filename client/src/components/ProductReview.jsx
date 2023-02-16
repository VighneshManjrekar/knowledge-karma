import React from "react";
import { useSelector } from "react-redux";

const ProductReview = ({ review, deleteCurrentReview, setIsReviewFunc, setNewReviews }) => {
    const { user } = useSelector(state => state.auth);

    if (review?.user?._id === user?._id) {
        setIsReviewFunc(true)
    }

    return <div className="rounded-md bg-gray-100 shadow-lg p-3">
        <div className="flex justify-between align-bottom">
            <div className="text-left">
                <span className="text-md text-gray-600 font-semibold">{review.user?.name}</span>
                <span className="text-[12px] ml-2 text-gray-400 font-medium">{`${new Date(review.createdAt).toLocaleString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit"
                })}`}</span>
            </div>
            {(review.user?._id === user?._id) && <div className="rounded-full bg-red-500 p-2 hover:cursor-pointer mt-1" onClick={() => {
                deleteCurrentReview(review?._id)
                setNewReviews(review?._id)
            }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                    <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
            </div>}
        </div>
        <div className="text-md text-left text-gray-600 font-bold">{review.title}</div>
        <div className="text-md text-left text-gray-500">{review.text.length > 250 ? (review.text).slice(0, 250) + "..." : review.text}</div>
        <div className="flex justify-between align-middle mt-2 font-md font-semibold ">
            Rating : {review.rating}
        </div>
    </div>;
};

export default ProductReview;
