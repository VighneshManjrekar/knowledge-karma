import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import productService from "../features/product/productService";
import { useDispatch } from "react-redux"
import { setProducts } from "../features/product/productSlice";
import { getResources, getReviews, updateResources } from "../http";
import { Navigate, useNavigate } from "react-router-dom";
import authService from "../features/auth/authService";
import { setUser } from "../features/auth/authSlice";

const Admin = () => {
    const { products } = useSelector(state => state.resources)
    const { user } = useSelector(state => state.auth)
    const [currentProducts, setCurrentProducts] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        const fetchResources = async () => {
            try {
                const response = await getResources();
                console.log(response)
                const resources = response.data.data

                dispatch(setProducts(resources))
                setCurrentProducts(resources)

            } catch (error) {
                if (error.response.status === 401) {
                    console.error("Unauthorized error: ", error);

                }
            }
        }

        fetchResources()


        if (user !== null) {

            if ((user?.role)?.toString() !== "admin") {
                navigate('/marketplace')
            }
        }


    }, [user])

    useEffect(() => {
        const checkSession = async () => {
            const userData = await authService.getLoginUser();
            // console.log(userData)

            const subscribedRes = userData.user.resourceSubscribed
            let subscribedResList = []
            subscribedRes?.map(res => subscribedResList.push(res._id))


            if (userData.success) {
                dispatch(setUser({ ...userData.user, userSubscribedRes: subscribedResList }))
            } else {
                console.log("User session expired")
            }
        }


        checkSession()


    }, [])





    const handleApprove = async (id) => {
        await updateResources(id)
        const newProducts = currentProducts.filter((product) => product._id !== id)
        setCurrentProducts(newProducts)
    }

    const handleReject = async (id) => {
        const newProducts = currentProducts.filter((product) => product._id !== id)
        setCurrentProducts(newProducts)
        // return
    }

    return <>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-[1200px] mx-auto mt-10">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">

                <thead className="text-xs uppercase  bg-gray-700 text-gray-400">
                    <tr className=" bg-gray-700 text-gray-400">
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Link
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Approve
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Reject
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product, index) => {
                        return <tr key={index} className="bg-white border-b ">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <a href={`/product/${product._id}`}>{product.name}</a>
                            </th>
                            <td className="px-6 py-4">
                                {product.description}
                            </td>
                            <td className="px-6 py-4">
                                {product.price}
                            </td>
                            <td className="px-6 py-4">
                                {product.link}
                            </td>
                            <td className="px-6 py-4 text-right" onClick={() => handleApprove(product._id)}>
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Approve</a>
                            </td>
                            <td className="px-6 py-4 text-right" onClick={() => handleReject(product._id)}>
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Reject</a>
                            </td>
                        </tr>

                    })}

                </tbody>
            </table>
        </div>
    </>;
};

export default Admin;
