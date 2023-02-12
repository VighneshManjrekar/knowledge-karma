import React, { useState, useEffect } from 'react'
import ProductContainer from "../components/ProductContainer";
import Container from '@mui/material/Container';
import { getAllProducts } from '../http';
import SideBar from '../components/Product/SideBar';
import ProductCard from '../components/Product/ProductCard';



export default function Marketplace() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      console.log(response.data.data)
      setProducts(response.data.data)
    }

    fetchProducts()
  }, [])

  return (
    <div>
      {/* <h1>Marketplace</h1> */}
      <div className="w-full flex">
        <SideBar />
        <div className="py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-9/12 gap-2">

          {
            products.map((product, index) => {
              return <ProductCard product={product} key={index} />
            })
          }

        </div>

      </div>

      {/* <ProductContainer /> */}
    </div>
  )
}
