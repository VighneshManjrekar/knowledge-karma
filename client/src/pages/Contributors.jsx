import React, { useEffect, useState } from 'react'
import { getRanking } from '../http';
import styles from "../components/Navbar/Navbar.module.css";
import { Link } from 'react-router-dom';
import "./css/table.css";

export default function Contributors() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await getRanking();
      console.log(response.data.data);
      setUsers(response.data.data);
    }

    fetchUsers()

  }, []);
  

  return (
    <div className='container mx-auto'>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <div className="rankingTable col-span-12">
          <table className="w-full border-collapse bg-transparent text-left text-sm text-gray-600">
            <thead className='bg-gray-200'>
              <th scope='col' className='px-6 py-4 text-2xl text-gray-900'>Rank🔥</th>
                <th scope='col' className='px-6 py-4 text-2xl text-gray-900'>Account</th>
                <th scope='col' className='px-6 py-4 text-2xl text-gray-900'>Name</th>
                <th scope='col' className='px-6 py-4 text-2xl text-gray-900'>Email</th>
                <th scope='col' className='px-6 py-4 text-2xl text-gray-900'>Points</th>
              </thead>
            <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
              {
                users.map((user, index) =>(
                  <tr className='bg-gray-100 hover:bg-gray-50'>
                    <td className="px-6 py-4"><div className='flex-align items-center text-center text-2xl'> <b> {index+1}</b> </div></td>
                    <td className="px-6 py-4">
                      <div className='flex-align items-center'> 
                          <div className={`${styles.userSection} hover:cursor-pointer hover:bg-slate-500 flex items-center justify-center`}>
                            <Link to={`/profile/${user.id}`}>
                                <span className="font-semibold text-2xl text-white">{user.name.charAt(0).toUpperCase()}</span>
                            </Link>
                          </div>
                     </div>
                    </td>
                    <td className="px-6 py-4"><div className='flex-align items-center text-xl'> {user.name} </div></td>
                    <td className="px-6 py-4"><div className='flex-align items-center text-xl'> {user.email} </div></td>
                    <td className="px-6 py-4"><div className='flex-align items-center text-xl'> {user.points} </div></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
