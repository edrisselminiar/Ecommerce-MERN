import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsTable from '../../pages/ProductsTable';
import UsersTable from '../../pages/UsersTable';
import ProductDetails from '../product-components/ProductDetails';
import ProductEditForm from '../product-components/ProductEditForm';
import AddProductForm from '../product-components/AddProductForm';
import Logout from '../../pages/Logout';
// import DeleteConfirmationModalUsers from './DeleteConfirmationModalUsers'


export default function MainContent() {
  return (


    <Routes>
  
        <Route path="/" element={<ProductsTable />} />
        <Route path="/products" element={<ProductsTable />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products/edit/:id" element={<ProductEditForm />} />
        <Route path="/products/add" element={<AddProductForm />} />

        <Route path="/logout" element={<Logout />} />
        <Route path="/users" element={<UsersTable />} />

    </Routes>
  );
}   
