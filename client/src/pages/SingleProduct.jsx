import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteReview, getProduct, getReviews } from "../http";
import { useSelector } from "react-redux";

const SingleProduct = () => {
    const { user } = useSelector(state => state.auth)
    const { id } = useParams()
    const [singleProduct, setSingleProduct] = useState({})
    const [productReviews, setProductReviews] = useState([])

    useEffect(() => {
        const fetchSingleProduct = async () => {
            const response = await getProduct(id)
            // console.log(response.data.data)
            setSingleProduct(response.data.data)
        }

        const fetchReviews = async () => {
            const response = await getReviews(id);
            // console.log(response.data.data)
            setProductReviews(response.data.data)
        }

        fetchSingleProduct()
        fetchReviews()
    }, [])


    const deleteCurrentReview = async (reviewId) => {
        const response = await deleteReview(id, reviewId);
    }

    return <div className="mt-10 w-full">
        <div className="py-6">
            <div className="mx-auto flex max-w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-1/3 bg-cover" src={`${singleProduct.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lsH7aYpLKoW1sHTRp8XVzpjCyKhlojsug1uC9x7XMrP8puzol9C_O_BXkdfHPM3pVTI&usqp=CAU" : singleProduct.image}`}>
                </img>

                <div className="w-2/3 p-4 text-left relative">
                    {/* <span className="absolute top-2 right-[120px] bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${singleProduct.votes.upvote} Upvotes`}</span> */}
                    {/* <span className="absolute top-2 right-2 bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${singleProduct.votes.downvote} Downvote`}</span> */}

                    <h1 className="text-gray-900 font-bold text-2xl">{singleProduct?.name}</h1>
                    <p className="mt-2 text-gray-600 text-sm">{singleProduct?.description}</p>
                    <div className="mt-3 w-full">
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Branch : ${singleProduct.branch}`}</span>
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Year : ${singleProduct.year}`}</span>
                        <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Category : ${singleProduct.type}`}</span>
                    </div>
                    <div className="flex item-center justify-between mt-5">
                        <h1 className="text-gray-700 font-bold text-xl">{`Price $ ${singleProduct.price}`}</h1>
                        <a download href={`${singleProduct.link}`} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">{`${singleProduct.price === 'free' ? "Download" : "Buy Now"}`}</a>
                    </div>
                </div>
            </div>
        </div>

        {/* Reviews Section */}
        <div className="mx-auto flex max-w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="relative overflow-x-auto w-full">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xsuppercase bg-gray-700 text-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Comment
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Rating
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {productReviews.map((review, index) => {
                            return <tr className="bg-white border-b" key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {review.user.name}
                                </th>
                                <td className="px-6 py-4">
                                    {review.title}
                                </td>
                                <td className="px-6 py-4">
                                    {review.text}
                                </td>
                                <td className="px-6 py-4">
                                    {review.rating}
                                </td>
                                <td className="px-6 py-4">
                                    {(review.user._id === user._id) && <button className="py-2 px-3 bg-red-400 rounded-md font-semibold text-white" onClick={() => deleteCurrentReview(review._id)}>Delete</button>}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>

        </div>
    </div>;
};

export default SingleProduct;
