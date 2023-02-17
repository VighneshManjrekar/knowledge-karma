import React, { useState, useEffect } from 'react'
import Container from '@mui/material/Container';
import { getAllProducts } from '../http';
import SideBar from '../components/Product/SideBar';
import ProductCard from '../components/Product/ProductCard';
import Drawer from "../components/Drawer"
import { useSelector } from 'react-redux';


export default function Marketplace() {
  const [products, setProducts] = useState([])
  const { user, userSubscribedRes } = useSelector(state => state.auth)

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      console.log(response.data.data)
      setProducts(response.data.data)
    }

    fetchProducts()
  }, [userSubscribedRes])

  return (
    <div>
      {/* <h1>Marketplace</h1> */}
      <div className="w-full flex justify-center">
        {/* <SideBar /> */}
        {/* <Drawer /> */}

        <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-9/12 gap-4 mt-10">

          {
            products.map((product, index) => {
              if (product?.owner !== user?._id) {
                console.log(product.image)
                return <ProductCard product={product} key={index} />
              }
            })
          }

        </div>

      </div>
    </div>
  )
}
