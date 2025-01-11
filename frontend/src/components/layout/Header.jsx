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
                  {/* <span class="px-1 relative z-10 group-hover:text-white"> {item}</span>
                  <span class="absolute left-0 bottom-0 w-full h-[1.5px] transition-all bg-slate-950 z-0 group-hover:h-full rounded-sm "></span> */}
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
