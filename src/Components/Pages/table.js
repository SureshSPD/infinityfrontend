import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Slider from './Slider';
import { AddOrderDetails } from './AddOrderdetails';
import { Slidecontext } from '../Context/slidercontext';
import { Navbar } from './Navbar';
import { AddUserDetails } from './AddUserDetails';

export const Table = () => {

    const [orderInformation, setOrderInformation] = useState([]);
    const [enableAddDetails, setenableAdddetails] = useState(false)
    const [enableUserAddDetails, setenableUserAdddetails] = useState(false)
    const {inputDataSliderOpen, setInputDataSliderOpen, inputUseraSliderOpen, setinputUseraSliderOpen, userRole, setUserRole}= useContext(Slidecontext)

    const storedEmail = sessionStorage.getItem("UserRole");

    useEffect(() => {
      // Fetch order information when the component mounts
      axios.get('https://infinitycolorlabnodejs-b98a2e742923.herokuapp.com/users/all-users')
        .then(response => {
            console.log("response",response)
          setOrderInformation(response.data.users);
        })
        .catch(error => {
          console.error('Error fetching order information:', error);
        });
    }, []);


    const Adddetailsbutton = ()=>{
        setenableAdddetails(true)
        setenableUserAdddetails(true)
    }

    function handleModelClose (){
        setenableAdddetails(false)
        setenableUserAdddetails(false)
    }

    console.log("storedEmail",storedEmail)

  return (
    <>
    {
        enableAddDetails && (
         <Slider
               sliderOpen={inputDataSliderOpen}
               setSliderOpen={setInputDataSliderOpen}
               onClose={handleModelClose}
               title="Order Details"
               width={50}><AddOrderDetails />
         </Slider>
        ) 
     }

{
        enableUserAddDetails && (
         <Slider
               sliderOpen={inputUseraSliderOpen}
               setSliderOpen={setinputUseraSliderOpen}
               onClose={handleModelClose}
               title="Add User"
               width={30}><AddUserDetails />
         </Slider>
        ) 
     }

    <div className="max-full-screen-xl mx-auto px-4 md:px-8">
    <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
            Order Details
        </div>
      { storedEmail === "Admin" ? ( <div className='flex flex-row space-x-4'>
        <div className="mt-3 md:mt-0">
            <button
               onClick={()=>setenableUserAdddetails(true)}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
                Add User
            </button>
        </div>
        <div className="mt-3 md:mt-0">
            <button
               onClick={()=>setenableAdddetails(true)}
                className="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm"
            >
                Add Details
            </button>
        </div>
        </div>):""}
    </div>
    <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
    <table className="w-full table-auto text-sm text-left">
        <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
                <th className="py-3 px-6">Order Number</th>
                <th className="py-3 px-6">Date</th>
                <th className="py-3 px-6">Sales Person</th>
                <th className="py-3 px-6">Incharge Person</th>
                <th className="py-3 px-6">Client Details</th>
                <th className="py-3 px-6">Delivery Date</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6"></th>
            </tr>
        </thead>
        <tbody className="text-gray-600 divide-y">
            {orderInformation.flatMap(user => user.orderInformation).map(order => (
                <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{order.orderNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toISOString().split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.salesPerson}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.inchargePerson}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.clientDetails}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(order.deliveryDate).toISOString().split('T')[0]}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                    {/* Add your edit and delete buttons if needed */}
                </tr>
            ))}
        </tbody>
    </table>
</div>

</div>
</>
)
}
