import React, { useContext, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Slidecontext } from '../Context/slidercontext';

export const AddUserDetails = () => {

  const {setinputUseraSliderOpen}= useContext(Slidecontext)
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        phone: '',
        accessRole: '',
      });
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://infinitycolorlabnodejs-b98a2e742923.herokuapp.com/users/signup', formData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          // Reset the form data after successful submission
          setFormData({
            email: '',
            name: '',
            phone: '',
            accessRole: '',
          });
          setinputUseraSliderOpen(false);
        } catch (error) {
          console.error('Error in submitting order details:', error);
        }
      };
    return (
      <div className="flex justify-center items-center mt-32 w-full">
        <form className="space-y-6 w-full" action="#" method="POST"  onSubmit={handleSubmit}>
          <div className=" flex flex-col w-full  justify-center gap-6 ml-10">
            <div className=" flex flex-row items-center w-full space-x-10">
              <label htmlFor="Name" className="text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <input
                    id="Name"
                    name="Name"
                    type="text"
                    autoComplete="off"
                  required
                  value={formData.name}  // Set initial value
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="flex w-1/2 rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
  
            {/* Order Date */}
            <div className=" flex flex-row items-center w-full space-x-7">
              <label htmlFor="email" className="text-sm font-medium leading-6 text-gray-900">
                Email Id
              </label>
              <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="off"
                  required
                  value={formData.email}  // Set initial value
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="flex w-1/2 rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
  
            {/* Sales Person */}
            <div className=" flex flex-row items-center w-full space-x-5">
              <label htmlFor="phone" className="text-sm font-medium leading-6 text-gray-900">
                Phone No
              </label>
              <input
                    id="phone"
                    name="phone"
                    type="text"
                    autoComplete="off"
                  required
                  value={formData.phone}  // Set initial value
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="flex w-1/2 rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            <div className="flex flex-row items-center w-full space-x-10">
              <label htmlFor="accessRole" className="block text-sm font-medium leading-6 text-gray-900">
                Access
              </label>
              <select
                    id="accessRole"
                    name="accessRole"
                    required
                    value={formData.accessRole}  // Set initial value
                    onChange={(e) => setFormData({ ...formData, accessRole: e.target.value })}
                    className="flex w-1/2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                    <option value="" disabled>Select Role</option>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>
  
          </div>
          <div className="ml-3 mt-10">
            <button
              type="submit"
              className="inline-block px-4 py-2 w-full md:w-1/3 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  };
  