
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assests/INFINITY COLOR LAB LOGO 8.png';
import { Dropdown, Avatar } from "flowbite-react";
import { Slidecontext } from '../Context/slidercontext';
// import avatarImage from 'path-to-your-avatar-image'; 


export const Navbar = () => {

    const history = useNavigate();
    const {EmailId, setEmailId}= useContext(Slidecontext)
    const handleSignOut = () => {
      // Add your sign-out logic here
      // For example, clear session storage, navigate to the sign-in page, etc.
      console.log('Signing out...');
      // Clear session storage
      sessionStorage.clear();
      // Redirect to the sign-in page
      history('/infinityfrontend');
    };

  return (
    <nav className="bg-white w-full border-b md:border-0 md:static">
      <div className="flex ml-4 items-center justify-between py-3 md:py-5 md:block">
        <div className='relative flex items-center justify-between overflow-x-clip mr-9'>
        <a>
          <img className="w-20 h-18" src={logo} alt="Infinity" />
        </a>
        {/* Avatar Section */}
        <div className="items-center hidden lg:block">
            <Dropdown
              arrowIcon={false}
              inline={true}
              placement="bottom"
              label={
                <Avatar
                  alt="User settings"
                  img=""
                  rounded={true}
                />
              }
            >
              <Dropdown.Header >
                <span className="block truncate text-sm font-medium">
                  {EmailId}
                </span>
              </Dropdown.Header>
              <Dropdown.Item  onClick={handleSignOut} ><span className="w-20">Sign out</span></Dropdown.Item>
            </Dropdown>
        </div>
        </div>
      </div>
    </nav>
)

  
}
