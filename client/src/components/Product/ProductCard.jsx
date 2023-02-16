import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { subscribe } from "../../http";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
    const { user } = useSelector(state => state.auth)

    const navigate = useNavigate()

    const handleSubscribe = async (resourceId) => {
        const response = await subscribe(resourceId)
        console.log(response.data)
    }

    // const product = {
    //     name: "DSA Book",
    //     description: "DSA notes for placement by Devendra sir",
    //     branch: "COMP",
    //     year: "BE",
    //     subjectCode: "DSA",
    //     price: 0,
    //     type: "BOOKS",
    //     link: "https://drive.google.com/drive/u/0/folders/178reWxyiZQ5ib578dWbH-OToBZlOj2Z0",
    //     image: "image"

    // }


    return <div className="flex flex-col mx-auto bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product._id}`)}>
        <img className="w-full bg-cover" src={`${product.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lsH7aYpLKoW1sHTRp8XVzpjCyKhlojsug1uC9x7XMrP8puzol9C_O_BXkdfHPM3pVTI&usqp=CAU" : product.image}`}>
        </img>

        <div className="w-full p-3 text-left relative">
            {/* <span class="absolute top-2 right-[120px] bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${product.votes.upvote} Upvotes`}</span> */}
            {/* <span class="absolute top-2 right-2 bg-blue-500 text-blue-100 text-xs font-medium mr-2 px-3 py-1.5 rounded-full">{`${product.votes.downvote} Downvote`}</span> */}

            <h1 className="text-gray-900 font-bold text-2xl">{product?.name}</h1>
            {/* <p className="mt-2 text-gray-600 text-sm">{product?.description}</p> */}
            <div className="mt-3 w-full">
                <span className="inline-block my-1 bg-orange-200 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Branch : ${product.branch}`}</span>
                <span className="inline-block my-1 bg-green-200 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Year : ${product.year}`}</span>
                <span className="inline-block my-1 bg-red-200 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Category : ${product.type}`}</span>
            </div>
            <div className="flex item-center justify-between mt-3">
                {/* <h1 className="text-gray-700 font-bold text-xl">{`Price $ ${product.price}`}</h1> */}
                {/* <a href={`${product.link}`} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={() => handleSubscribe(product._id)}>Subscribe</a> */}
                {
                    (user?.userSubscribedRes)?.includes(product._id) ? <a href={`${product.link}`} className="px-3 py-2 bg-green-800 text-white text-xs font-bold uppercase rounded" >Subscribed</a> : <a href={`${product.link}`} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded" onClick={() => handleSubscribe(product._id)}>Subscribe</a>
                }
            </div>
        </div>
    </div>;
};

export default ProductCard;
