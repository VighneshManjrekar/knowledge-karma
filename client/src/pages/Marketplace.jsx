import React from 'react'
import ProductContainer from "../components/ProductContainer";
import Container from '@mui/material/Container';
import Drawer from "../components/Drawer";



export default function Marketplace() {
  return (
    <div>
      <h1 style={{ fontSize: 30, margin: 10 }}>Marketplace</h1>
      <Drawer />
        <ProductContainer />
    </div>
  )
}
