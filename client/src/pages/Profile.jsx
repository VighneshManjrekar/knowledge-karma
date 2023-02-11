import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            setEmail(user.email)
            setName(user.name)
        }

    }, [user])

    return <>
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
                <span className="bg-green-100 text-green-800 text-lg font-medium mx-3 p-3 rounded-md text-center">
                    <div>40</div>
                    <span>Products</span>
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