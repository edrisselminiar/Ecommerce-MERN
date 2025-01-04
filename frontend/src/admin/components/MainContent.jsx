import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';
import ProductsTable from './../pages/ProductsTable';
import UsersTable from './../pages/UsersTable';

export default function MainContent() {
  return (


    <Routes>
  
        <Route path="/" element={<ProductsTable />} />
        <Route path="/products" element={<ProductsTable />} />
        <Route path="/users" element={<UsersTable />} />

    </Routes>
  );
}   


// import React from 'react'
// import {  Router, Routes, Route } from 'react-router-dom';
// import ProductsTable from './../pages/ProductsTable';
// import UsersTable from './../pages/UsersTable';



// export default function MainContent() {
//   return (
   
//       <Routes>
//         <Route path="/ProductsTable" element={<ProductsTable />} />
//         <Route path="/UsersTable" element={<UsersTable />} />
//         {/* <Route path="/products" element={<Products />} />
//         <Route path="/analytics" element={<Analytics />} />
//         <Route path="/settings" element={<Settings />} /> */}
//       </Routes>
 
//   )
// }
