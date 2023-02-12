import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createProduct } from "../http";

const Profile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const { user } = useSelector(state => state.auth)
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
    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(formData)

        let hasNullValue = false;

        for (const key in formData) {
            if (formData[key] === null || !formData[key]) {
                hasNullValue = true;
                return
            }
        }

        const response = await createProduct(formData)
        console.log(response.data)
        setModalOpen(false)

    }

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.name)
        }

    }, [user])



    return <>
        {
            modalOpen && (<div className="absolute w-4/5  bg-gray-100 py-10 left-40 rounded-md">
                <form className="">
                    <div className="absolute right-4 top-3 hover:cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2 w-2/3 mx-auto">
                        <div>
                            <label for="product_name" className="block mb-2 text-sm font-medium text-gray-900 text-left">Product Name</label>
                            <input type="text" id="product_name" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label for="description" className="block mb-2 text-sm font-medium text-gray-900 text-left">Description</label>
                            <input type="text" id="description" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label for="branch" class="text-left block mb-2 text-sm font-medium text-gray-900">Branch</label>
                            <select id="branch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="branch" value={formData.branch} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
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
                            <label for="year" class="text-left block mb-2 text-sm font-medium text-gray-900">Year</label>
                            <select id="year" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="year" value={formData.year} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                                <option >Choose a class</option>
                                <option value="FE">FE</option>
                                <option value="SE">SE</option>
                                <option value="TE">TE</option>
                                <option value="BE">BE</option>
                            </select>
                        </div>
                        <div>
                            <label for="price" className="block mb-2 text-sm font-medium text-gray-900 text-left">Price</label>
                            <input type="number" id="price" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label for="subjectCode" className="block mb-2 text-sm font-medium text-gray-900 text-left">Subject Code</label>
                            <input type="text" id="subjectCode" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="subjectCode" value={formData.subjectCode} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label for="link" className="block mb-2 text-sm font-medium text-gray-900 text-left">Link</label>
                            <input type="text" id="link" className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required name="link" value={formData.link} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
                        </div>
                        <div>
                            <label for="type" class="text-left block mb-2 text-sm font-medium text-gray-900">Type</label>
                            <select id="type" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="type" value={formData.type} onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}>
                                <option >Choose a type</option>
                                <option value="NOTES">NOTES</option>
                                <option value="BOOKS">BOOKS</option>
                                <option value="PROJECT">PROJECT</option>
                                <option value="ASSIGNMENT">ASSIGNMENT</option>
                            </select>
                        </div>

                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Create Resource</button>
                </form>
            </div>)
        }

        <div className="w-full mx-auto mt-20 flex flex-col justify-center items-center ">
            <img className="w-35 h-35 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Bordered avatar" />
            <span className="text-lg text-cyan-900 mt-5 text-center font-bold">{name}</span>
            <span className="text-lg text-cyan-900 mt-2 text-center">{email}</span>

            <div className="flex justify-center mt-10">
                <span className="bg-blue-100 text-blue-800 text-lg font-medium mx-3 p-3 rounded-md text-center">
                    <div>40</div>
                    <span>Products</span>
                </span>
                <span className="bg-orange-100 text-orange-800 text-lg font-medium mx-3 p-3 rounded-md text-center">
                    <div>40</div>
                    <span>Products</span>
                </span>
                <span className="bg-green-100 text-green-800 text-lg font-medium mx-3 p-3 rounded-md text-center hover:cursor-pointer" onClick={() => setModalOpen(!modalOpen)}>
                    <div>+</div>
                    <span>Add Resource</span>
                </span>
            </div>
        </div>
        <hr className="my-6" />
        <div className="w-full px-10">
            <h2 className="text-2xl font-bold">Shared Products</h2>
            <div className="grid grid-cols-1 gap-5 w-full my-5 md:grid-cols-2 xl:grid-cols-3">
                <div className="h-20 bg-blue-100 text-blue-800 p-5 rounded-md">Hello</div>
                <div className="h-20 bg-blue-100 text-blue-800 p-5 rounded-md">Hello</div>
                <div className="h-20 bg-blue-100 text-blue-800 p-5 rounded-md">Hello</div>
                <div className="h-20 bg-blue-100 text-blue-800 p-5 rounded-md">Hello</div>
            </div>
        </div>
        <hr className="my-6" />
        <div className="w-full px-10">
            <h2 className="text-2xl font-bold">Overview</h2>
            <div className="h-40 rounded-md my-10 bg-gray-400">
            </div>
        </div>
    </>;
};

export default Profile;