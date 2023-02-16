import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserResource } from "../http";



const RecentResource = ({ product, handleDeleteResource }) => {
    const navigate = useNavigate()
    const handleUpdate = async (e, id) => {
        await updateUserResource(id, formData)
        setModalOpen(false)
    }

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        branch: "",
        year: "",
        subjectCode: "",
        price: 0,
        type: "",
        link: ""
    })
    const [modalOpen, setModalOpen] = useState(false)

    const updateResource = (product) => {
        // e.preventDefault()
        setModalOpen(true)
        setFormData({
            name: product.name,
            description: product.description,
            branch: product.branch,
            year: product.year,
            subjectCode: product.subjectCode,
            price: product.price,
            type: product.type,
            link: product.link
        })

    }



    return <>
        {
            modalOpen && (<div className="z-10 absolute w-4/5  bg-gray-100 py-10 left-40 rounded-md">
                <form className="">
                    <div className="absolute right-4 top-3 hover:cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 w-2/3 mx-auto">
                        <div>
                            <label htmlFor="product_name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Product Name</label>
                            <input type="text" id="product_name" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 text-left">Description</label>
                            <input type="text" id="description" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="branch" className="text-left block mb-2 text-sm font-medium text-gray-900">Branch</label>
                            <select id="branch" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="branch" value={formData.branch} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                                <option >Choose a branch</option>
                                <option value="MECH">MECH</option>
                                <option value="CHEM">CHEM</option>
                                <option value="COMP">COMP</option>
                                <option value="ELEC">ELEC</option>
                                <option value="EXTC">EXTC</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="OTHER">OTHER</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="year" className="text-left block mb-2 text-sm font-medium text-gray-900">Year</label>
                            <select id="year" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="year" value={formData.year} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                                <option >Choose a class</option>
                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 text-left">Price</label>
                            <input type="number" id="price" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="subjectCode" className="block mb-2 text-sm font-medium text-gray-900 text-left">Subject Code</label>
                            <input type="text" id="subjectCode" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="subjectCode" value={formData.subjectCode} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="link" className="block mb-2 text-sm font-medium text-gray-900 text-left">Link</label>
                            <input type="text" id="link" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="link" value={formData.link} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label htmlFor="type" className="text-left block mb-2 text-sm font-medium text-gray-900">Type</label>
                            <select id="type" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="type" value={formData.type} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                                <option >Choose a type</option>
                                <option value="NOTES">NOTES</option>
                                <option value="BOOKS">BOOKS</option>
                                <option value="PROJECT">PROJECT</option>
                                <option value="ASSIGNMENT">ASSIGNMENT</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={(e) => handleUpdate(e, product._id)}>Update Resource</button>
                </form>
            </div>)
        }
        <div className="hover:cursor-pointer mx-auto flex bg-white shadow-lg rounded-lg overflow-hidden w-full">
            {/* <img className="w-1/3" src={`${product.image ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7lsH7aYpLKoW1sHTRp8XVzpjCyKhlojsug1uC9x7XMrP8puzol9C_O_BXkdfHPM3pVTI&usqp=CAU" : product.image}`}>
            </img> */}

            <div className="p-4 text-left relative">
                <h1 onClick={() => navigate(`/product/${product._id}`)} className="text-gray-900 font-bold text-xl">{product?.name.length > 10 ? product.name.split(0, 10) : product.name}</h1>
                {/* <p className="mt-3 text-gray-600 text-sm">{product?.description.length > 40 ? product.description.slice(0, 40) + "..." : product.description}</p> */}
                {/* <div className="mt-3 w-full">
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Branch : ${product.branch}`}</span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Year : ${product.year}`}</span>
                <span className="bg-gray-100 text-gray-800 text-sm font-medium mr-2 px-3 py-1 rounded">{`Category : ${product.type}`}</span>
            </div> */}
                {/* <div className="flex item-center justify-between mt-2">
                    <h1 className="text-gray-700 font-bold text-sm">{`Price $ ${product.price}`}</h1>
                    {product.price === 'free' ? <a download href={`${product.link}`} className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Download</a> : <a className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">Buy Now</a>}
                </div> */}
                <div className="flex mt-3">
                    <button className="px-3 py-2 bg-green-500 mr-2 text-white text-xs font-bold uppercase rounded" onClick={() => updateResource(product)} >Update</button>
                    <button className="px-3 py-2 bg-red-500 text-white text-xs font-bold uppercase rounded" onClick={(e) => handleDeleteResource(e, product._id)} >Delete</button>
                </div>
            </div>
        </div>
    </>
        ;
};

export default RecentResource;
