import React, { useEffect, useRef, useState } from "react";
import { socketInit } from "../socket";
import { useSelector } from "react-redux";

const CommunityTab = () => {
    const { user } = useSelector(state => state.auth)
    const [joinedRoom, setJoinedRoom] = useState('')
    const [joinedUsers, setJoinedUsers] = useState([])

    const socket = useRef(null)

    useEffect(() => {
        socket.current = socketInit()


        socket.current.on("roomUsers", (data) => {
            setJoinedUsers(data.users)
        })


    }, [])

    const joinRoom = (roomId) => {
        if (joinedRoom === roomId) {
            return
        }
        socket.current.emit('JOIN', { username: user?.name, userId: user?._id, roomId })
    }



    return <>
        <div className="flex mt-10 h-[500px]">
            <div className=" mx-2 w-1/12 bg-gray-400 h-full rounded-sm p-2">
                {
                    joinedUsers?.map((user, index) => {
                        return <div className="bg-gray-700 text-white rounded-full w-full h-12 flex justify-center items-center font-semibold my-2">
                            {user.username.slice(0, 1).toUpperCase()}
                        </div>
                    })
                }
            </div>
            <div className="mx-2 w-3/12 bg-gray-400 h-full rounded-sm p-2">
                <div className="rounded-md w-full h-12 hover:cursor-pointer my-2 bg-gray-700 text-white flex items-center justify-center" onClick={() => joinRoom("123")}>
                    <span className="font-semibold">COMP</span>
                </div>
                <div className="rounded-md w-full h-12 hover:cursor-pointer my-2 bg-gray-700 text-white flex items-center justify-center" onClick={() => joinRoom("234")} >
                    <span className="font-semibold">MECH</span>
                </div>
            </div>
            <div className="mx-2 flex-1 bg-gray-400 h-full rounded-sm">
                <div className="flex flex-col m-2">
                    <div className="min-h-[420px] bg-gray-700">Hello</div>
                    <div className="h-11 bg-gray-700 flex mt-2" >
                        <input type="text" className="flex-1" />
                        <div className="w-12">For</div>
                    </div>
                </div>
            </div>
        </div>

    </>;
};

export default CommunityTab;
