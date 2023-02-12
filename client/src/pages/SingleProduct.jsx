import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../http";

const SingleProduct = () => {
    const { id } = useParams()
    const [singleProduct, setSingleProduct] = useState({})

    useEffect(() => {
        const fetchSingleProduct = async () => {
            const response = await getProduct(id)
            // console.table(response.data.data)
            setSingleProduct(response.data.data)
        }

        fetchSingleProduct()
    }, [])

    return <div className="mt-10 w-full">
        <div className="py-6">
            <div className="mx-auto flex max-w-[1000px] bg-white shadow-lg rounded-lg overflow-hidden">
                <img className="w-1/3 bg-cover" src={`${singleProduct.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lsH7aYpLKoW1sHTRp8XVzpjCyKhlojsug1uC9x7XMrP8puzol9C_O_BXkdfHPM3pVTI&usqp=CAU" : singleProduct.image}`}>
                </img>

                <div className="w-2/3 p-4 text-left relative">
                    {/* <span class="absolute top-2 right-[120px] bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${singleProduct.votes.upvote} Upvotes`}</span> */}
                    {/* <span class="absolute top-2 right-2 bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${singleProduct.votes.downvote} Downvote`}</span> */}

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

            <div class="relative overflow-x-auto w-full">
                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xsuppercase bg-gray-700 text-gray-100">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Comment
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Rating
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-4">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque aut saepe quaerat? Optio, aliquid tempore laudantium dolor autem pariatur ducimus.
                            </td>
                            <td class="px-6 py-4">
                                3
                            </td>
                        </tr>
                        <tr class="bg-white border-b">
                            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                Apple MacBook Pro 17"
                            </th>
                            <td class="px-6 py-4">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque aut saepe quaerat? Optio, aliquid tempore laudantium dolor autem pariatur ducimus.
                            </td>
                            <td class="px-6 py-4">
                                3
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

        </div>
    </div>;
};

export default SingleProduct;
