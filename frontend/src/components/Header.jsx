import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Phone, Mail, MapPin, ShoppingCart, Search, User } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll event for hiding nav on desktop
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    'Laptop',
    'Desktop',
    'Components',
    'Peripherals',
  ];

  return (
    <div>
    
      {/* Spacer div to prevent content from going under fixed header */}
      <div className="hidden md:block w-full bg-gray-100 text-black">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-10 text-xs md:text-sm">
            {/* Contact Info */}
            <div className="flex space-x-4 items-center">
              <div className="flex items-center hover:bg-white rounded-lg px-2 py-1">
                <Phone className="h-4 md:w-4 md:mr-2" />
                <span>+0544223726</span>
              </div>
              <div className="flex items-center hover:bg-white rounded-lg px-2 py-1">
                <Mail className="h-4 md:w-4 md:mr-2" />
                <span>newpc@gmail.ma</span>
              </div>
            </div>
            {/* Location */}
            <div className="flex items-center hover:bg-white rounded-lg px-2 py-1">
              <MapPin className="h-4 md:w-4 mr-2" />
              <span>123 new PC, Casablanca</span>
            </div>
          </div>
        </div>
      </div>



        {/* top-0 left-0 right-0 */}
      <header className={` w-full bg-white shadow-md z-50 transition-transform duration-3000 ${
        isScrolled ? 'transform top-0 left-0 right-0 fixed' : ''
      }`} >
        {/* Top Bar - Always visible */}
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl text-black font-extrabold">newPC</span>
            </div>

            {/* Desktop Menu Items */}
            <div className="hidden md:flex items-center space-x-8">

              <div className="flex items-center text-gray-600 hover:bg-gray-100 rounded-xl px-2 py-2">
                <MapPin className="w-4 h-4 mr-1" />
                <span className="text-sm">Select Address</span>
              </div>
              
              {/* Search Bar */}
              <div className="relative ">   
                <input
                  type="text"
                  placeholder="Search products..."
                  // w-54
                  className=" xl:w-96 w-54 px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute right-3 top-1.5 w-4 h-4 text-gray-400" />
              </div>

              {/* Auth & Cart */}
              <div className="flex items-center space-x-6 xl:w-96 w-54 ">
                
                <div className="flex items-center text-gray-600 w-10/12 justify-center hover:bg-gray-100 rounded-xl px-2 py-2">
                  <User className="w-4 h-4 mr-1" />
                  <Link to="/login" className="text-sm">Login/Register</Link>
                </div>

                <div className="relative w-2/12 hover:bg-gray-100 bg-gray-100 rounded-xl justify-center border-[1px] px-2 py-1 ">
                  <ShoppingCart className="w-6 h-6 text-gray-600 text-center " />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Menu Icons */}
            <div className="flex md:hidden items-center space-x-4">


              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-gray-600" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              
            </div>
          </div>
        </div>

        {/* Navigation Bar - Hidden on scroll for desktop */}
        <nav className={`border-t bg-white transition-transform duration-300 ${
          isScrolled ? 'hidden md:hidden' : ''
        }`}>
          <div className="container mx-auto px-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 py-4">
              {navigation.map((item) => (
              
                <a
                key={item}
                href="#"
                className="text-lg  group relative w-max"
                >
                  <span class="px-1 relative z-10 group-hover:text-white"> {item}</span>
                  <span class="absolute left-0 bottom-0 w-full h-[1.5px] transition-all bg-slate-950 z-0 group-hover:h-full rounded-sm "></span>
                </a>
              ))}
            </div>

         

          </div>
        </nav>

        {/* Mobile Menu */}
        <div className={`md:hidden border-t bg-white transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'
        }`}>
          <div className="px-4 py-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="px-4 py-2 border-t">
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              <span>Select Address</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <User className="w-4 h-4 mr-2" />
              <span>Login/Register</span>
            </div>
          </div>
          <nav className="border-t">
            {navigation.map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Header;











// import React, { useState, useEffect } from 'react';
// import { Menu, ShoppingCart, Search, MapPin, User } from 'lucide-react';

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
//   // Handle scroll event for hiding nav on desktop
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 100);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navigation = [
//     'Home',
//     'Products',
//     'Categories',
//     'Deals',
//     'About'
//   ];

//   return (
//     <header className="w-full bg-white shadow-md">
//       {/* Top Bar - Always visible */}
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center">
//             <span className="text-xl font-bold">EStore</span>
//           </div>

//           {/* Desktop Menu Items */}
//           <div className="hidden md:flex items-center space-x-8">
//             <div className="flex items-center text-gray-600">
//               <MapPin className="w-4 h-4 mr-1" />
//               <span className="text-sm">Select Address</span>
//             </div>
            
//             {/* Search Bar */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 className="w-64 px-4 py-1 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
//               />
//               <Search className="absolute right-3 top-1.5 w-4 h-4 text-gray-400" />
//             </div>

//             {/* Auth & Cart */}
//             <div className="flex items-center space-x-6">
//               <div className="flex items-center text-gray-600">
//                 <User className="w-4 h-4 mr-1" />
//                 <span className="text-sm">Login/Register</span>
//               </div>
//               <div className="relative">
//                 <ShoppingCart className="w-6 h-6 text-gray-600" />
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                   0
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Mobile Menu Icons */}
//           <div className="flex md:hidden items-center space-x-4">
//             <button 
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="text-gray-600"
//             >
//               <Menu className="w-6 h-6" />
//             </button>
//             <div className="relative">
//               <ShoppingCart className="w-6 h-6 text-gray-600" />
//               <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
//                 0
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Bar - Hidden on scroll for desktop */}
//       <nav className={`border-t ${isScrolled ? 'hidden md:hidden' : ''}`}>
//         <div className="container mx-auto px-4">
//           {/* Desktop Navigation */}
//           <div className="hidden md:flex space-x-8 py-4">
//             {navigation.map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="text-gray-600 hover:text-gray-900"
//               >
//                 {item}
//               </a>
//             ))}
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden border-t">
//           <div className="px-4 py-2">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-500"
//             />
//           </div>
//           <div className="px-4 py-2 border-t">
//             <div className="flex items-center text-gray-600 mb-4">
//               <MapPin className="w-4 h-4 mr-2" />
//               <span>Select Address</span>
//             </div>
//             <div className="flex items-center text-gray-600 mb-4">
//               <User className="w-4 h-4 mr-2" />
//               <span>Login/Register</span>
//             </div>
//           </div>
//           <nav className="border-t">
//             {navigation.map((item) => (
//               <a
//                 key={item}
//                 href="#"
//                 className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
//               >
//                 {item}
//               </a>
//             ))}
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header;





































// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';


// // const Navbar = () => {
// //   const [isOpen, setIsOpen] = useState(false);

// //   return (
// //     <div className="relative bg-white">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6">
// //         <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
// //           {/* Logo */}
// //           <div className="flex justify-start lg:w-0 lg:flex-1">
// //             <a href="#" className="text-2xl font-bold text-indigo-600">
// //               Logo
// //             </a>
            
// //           </div>

// //           {/* Mobile menu button */}
// //           <div className="-mr-2 -my-2 md:hidden">
// //             <button
// //               type="button"
// //               className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
// //               onClick={() => setIsOpen(!isOpen)}
// //             >
// //               <span className="sr-only">Open menu</span>
// //               {/* Hamburger icon */}
// //               <svg
// //                 className="h-6 w-6"
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //               >
// //                 <path
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                   strokeWidth={2}
// //                   d="M4 6h16M4 12h16M4 18h16"
// //                 />
// //               </svg>
// //             </button>
// //           </div>

// //           {/* Desktop navigation */}
// //           <nav className="hidden md:flex space-x-10">
// //             <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
// //               Home
// //             </a>
// //             <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
// //               Features
// //             </a>
// //             <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
// //               About
// //             </a>
// //             <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
// //               Contact
// //             </a>
// //           </nav>

// //           {/* Auth buttons */}
// //           <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
           


// //             <Link to="/login" className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
// //             Sign in
// //             </Link>


        
// //             <Link to="/register" className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
// //                 Register
// //             </Link>

            



// //           </div>
// //         </div>
// //       </div>

// //       {/* Mobile menu */}
// //       <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
// //         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
// //           <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
// //             Home
// //           </a>
// //           <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
// //             Features
// //           </a>
// //           <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
// //             About
// //           </a>
// //           <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">
// //             Contact
// //           </a>
// //         </div>
// //         <div className="pt-4 pb-3 border-t border-gray-200">
// //           <div className="flex items-center px-5">
// //             <a
// //               href="#"
// //               className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
// //             >
// //               Sign in
// //             </a>
// //           </div>
// //           <div className="mt-3 px-2 space-y-1">
// //             <a
// //               href="#"
// //               className="block w-full px-5 py-3 text-center font-medium text-white bg-indigo-600 hover:bg-indigo-700"
// //             >
// //               Register
// //             </a>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };



// // export default Navbar;

















