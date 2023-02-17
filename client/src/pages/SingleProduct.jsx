import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createReview, deleteReview, getProduct, getReviews, subscribe, Unsubscribe } from "../http";
import { useSelector } from "react-redux";
import ProductReview from "../components/ProductReview";
import { changeRes } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const SingleProduct = () => {
    const { user, userSubscribedRes } = useSelector(state => state.auth)
    const { id } = useParams()
    const [singleProduct, setSingleProduct] = useState({})
    const [productReviews, setProductReviews] = useState([])
    const [isReview, setIsReview] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch()

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

        const checkForReview = () => {
            productReviews?.map(review => {
                if (review.user._id === user._id) {
                    // console.log(review.user._id, user._id)
                    setIsReview(true)
                    return
                }
            })

            // setIsReview(false)
        }

        checkForReview()

        fetchSingleProduct()
        fetchReviews()
    }, [user, userSubscribedRes])


    const [formData, setFormData] = useState({
        title: "",
        text: "",
        rating: 0
    })

    const handleUnsubscribe = async (resourceId) => {
        const response = await Unsubscribe(resourceId)
        console.log(response.data)

        const newSubscribedRes = userSubscribedRes.filter(resource => {
            console.log(resource, id)
            return resource !== id
        })

        console.log(newSubscribedRes)

        dispatch(changeRes(newSubscribedRes))

    }

    const handleSubscribe = async () => {
        const response = await subscribe(id)
        const newSubscribedRes = [...userSubscribedRes, id]

        console.log(newSubscribedRes)
        // const oldUser = user
        // newSubscribedRes.push[]
        dispatch(changeRes(newSubscribedRes))
    }

    const createUserReview = async () => {
        const response = await createReview(id, formData)
        console.log(response.data)
    }


    const deleteCurrentReview = async (reviewId) => {
        const response = await deleteReview(id, reviewId);
    }

    const setIsReviewFunc = (value) => {
        if (value) {
            setIsReview(value)
        }
    }

    const setNewReviews = (reviewId) => {
        const newReviews = productReviews?.filter(review => {
            return review._id !== reviewId
        })
        setProductReviews(newReviews)
    }

    return <>
        {
            modalOpen && (<div className="z-10 absolute flex justify-center align-middle w-[100vw] h-[100vh]">
                <form className=" relative w-4/5  bg-gray-100 py-10 rounded-md">
                    <div className="absolute right-4 top-3 hover:cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-1 w-2/3 mx-auto">
                        <div>
                            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 text-left">Title</label>
                            <input type="text" id="title" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 text-left">Comment</label>
                            <input type="text" id="text" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="text" value={formData.text} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="rating" className="block mb-2 text-sm font-medium text-gray-900 text-left">Rating</label>
                            <input type="number" max={5} min={1} id="rating" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="rating" value={formData.rating} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => createUserReview()}>Submit Review</button>
                </form>
            </div>)
        }
        <div className="mt-10 w-full">
            <div className="py-6 mx-2">
                <div className="mx-auto flex md:max-w-[1000px] max-w-[500px] bg-white shadow-lg rounded-lg overflow-hidden flex-col md:flex-row">
                    <img className="w-full md:w-1/3 bg-cover" src={`${singleProduct.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lsH7aYpLKoW1sHTRp8XVzpjCyKhlojsug1uC9x7XMrP8puzol9C_O_BXkdfHPM3pVTI&usqp=CAU" : singleProduct.image}`}>
                    </img>

                    <div className="w-full md:w-2/3 p-4 text-left relative">
                        {/* <span className="flex absolute top-2 right-[120px] text-green-400 text-xs font-medium mr-2 px-3 py-1.5 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="green" className="bi bi-hand-thumbs-up-fill" viewBox="0 0 16 16">
                        <path d="M6.956 1.745C7.021.81 7.908.087 8.864.325l.261.066c.463.116.874.456 1.012.965.22.816.533 2.511.062 4.51a9.84 9.84 0 0 1 .443-.051c.713-.065 1.669-.072 2.516.21.518.173.994.681 1.2 1.273.184.532.16 1.162-.234 1.733.058.119.103.242.138.363.077.27.113.567.113.856 0 .289-.036.586-.113.856-.039.135-.09.273-.16.404.169.387.107.819-.003 1.148a3.163 3.163 0 0 1-.488.901c.054.152.076.312.076.465 0 .305-.089.625-.253.912C13.1 15.522 12.437 16 11.5 16H8c-.605 0-1.07-.081-1.466-.218a4.82 4.82 0 0 1-.97-.484l-.048-.03c-.504-.307-.999-.609-2.068-.722C2.682 14.464 2 13.846 2 13V9c0-.85.685-1.432 1.357-1.615.849-.232 1.574-.787 2.132-1.41.56-.627.914-1.28 1.039-1.639.199-.575.356-1.539.428-2.59z" />
                    </svg> {`${singleProduct.votes.upvote}`} </span>
                    <span className="absolute top-2 right-2 bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${singleProduct.votes.downvote} Downvote`}</span> */}

                        <h1 className="text-gray-900 font-bold text-2xl">{singleProduct?.name}</h1>
                        <p className="mt-2 text-gray-600 text-sm">{singleProduct?.description}</p>
                        <div className="mt-3 w-full">
                            <span className="bg-gray-100 block md:inline-block text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Branch : ${singleProduct.branch}`}</span>
                            <span className="bg-gray-100 block md:inline-block text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Year : ${singleProduct.year}`}</span>
                            <span className="bg-gray-100 block md:inline-block text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Category : ${singleProduct.type}`}</span>
                        </div>
                        <div className="flex item-center justify-between mt-5">
                            {/* <h1 className="text-gray-700 font-bold text-xl">{`Price $ ${singleProduct.price}`}</h1> */}
                            {
                                (userSubscribedRes)?.includes(singleProduct._id) ? <div onClick={() => handleUnsubscribe(singleProduct._id)} className="px-3 py-2 bg-green-800 text-white text-xs hover:cursor-pointer font-bold uppercase rounded">Unsubscribe</div> : <a className="px-3 py-2 bg-gray-800 text-white text-xs hover:cursor-pointer font-bold uppercase rounded" onClick={() => handleSubscribe()}>Subscribe</a>
                            }

                            {
                                (userSubscribedRes)?.includes(singleProduct?._id) && <a download href={`${singleProduct?.link}`} className="px-3 py-2 bg-blue-800 text-white text-xs hover:cursor-pointer font-bold uppercase rounded">Download Resource</a>
                            }

                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            {
                productReviews.length > 0 ? (
                    <div className=" max-w-[500px] md:max-w-[1000px] mb-6 mx-auto mt-2">
                        <div className="flex justify-between  mb-4">
                            <h2 className="text-xl font-bold text-left">Reviews</h2>
                            {isReview === false && <div className="py-1 px-3 text-md font-semibold text-white bg-orange-500 rounded-md hover:cursor-pointer" onClick={() => setModalOpen(true)}>+ Review</div>}
                        </div>
                        <div className="grid w-full gap-4">
                            {productReviews.map((review, index) => {
                                return <ProductReview review={review} key={index} deleteCurrentReview={deleteCurrentReview} setIsReviewFunc={setIsReviewFunc} setNewReviews={setNewReviews} />

                            })}
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-[1000px] mb-6 flex justify-between align-middle">
                        <h2 className="text-xl font-bold text-left">No Reviews</h2>
                        <div className="py-1 px-3 text-md font-semibold text-white bg-orange-500 rounded-md hover:cursor-pointer" onClick={() => setModalOpen(true)}>+ Review</div>
                    </div>
                )

            }

            {/* 
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

        </div> */}
        </div>
    </>;
};

export default SingleProduct;
