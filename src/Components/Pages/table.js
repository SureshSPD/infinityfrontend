import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Slider from './Slider';
import { AddOrderDetails } from './AddOrderdetails';
import { Slidecontext } from '../Context/slidercontext';
import { Navbar } from './Navbar';
import { AddUserDetails } from './AddUserDetails';
import { useNavigate } from "react-router-dom";

export const Table = () => {

    const [orderInformation, setOrderInformation] = useState([]);
    const [enableAddDetails, setenableAdddetails] = useState(false)
    const [enableUserAddDetails, setenableUserAdddetails] = useState(false)
    const {inputDataSliderOpen, setInputDataSliderOpen, inputUseraSliderOpen, setinputUseraSliderOpen, userRole, setUserRole}= useContext(Slidecontext)

    const storedRole = sessionStorage.getItem("UserRole");
    const storedEmail = sessionStorage.getItem("Emailid");
    const [selectedOrderId, setSelectedOrderId] = useState(null);
      // Use navigate function
  const history = useNavigate();


    useEffect(() => {
      // Fetch order information when the component mounts
      
    //   axios.get('http://127.0.0.1:5000/users/all-users')
      axios.get('https://backendinfinity-8b393b9bf8e9.herokuapp.com/users/all-users')
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


    const handleRowClick = (orderId) => {
        setSelectedOrderId(orderId);
    };

    const handleLogoClick = () => {
        // Reload the page
        history("/OrderManagement");
       
      };
      const [formData, setFormData] = useState({
        email: storedEmail,
        orderNumber: '',
        date: new Date(),
        salesPerson: '',
        inchargePerson: '',
        clientDetails: '',
        deliveryDate: new Date(),
        status: '',
        printingstatus:'',
        laminationstatus:'',
        padmakingstatus:''
      });
const handleFormOpen=(data)=>{
    setFormData(data);
 setenableAdddetails(true)
}
  return (
    <>
    {
        enableAddDetails && (
         <Slider
               sliderOpen={inputDataSliderOpen}
               setSliderOpen={setInputDataSliderOpen}
               onClose={handleModelClose}
               title="Order Details"
               width={50}><AddOrderDetails formData={formData}
               setFormData={setFormData} />
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
      { storedRole === "Admin" ? ( <div className='flex flex-row space-x-4'>
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
                        <th className="py-3 px-6">Printing Status</th>
                        <th className="py-3 px-6">Lamination Status</th>
                        <th className="py-3 px-6">Pad Making</th>
                        { storedRole === "Admin" ? (   <th className="py-3 px-6">Edit</th>):""}
                    </tr>
                </thead>
                <tbody className="text-gray-600 divide-y">
                    {orderInformation.flatMap(user => user.orderInformation).map(order => (
                        <tr key={order._id} className={selectedOrderId === order._id ? 'bg-blue-100' : ''} onClick={() => handleRowClick(order._id)}>
                            <td className="px-6 py-4 whitespace-nowrap">{order.orderNumber}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(order.date).toISOString().split('T')[0]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.salesPerson}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.inchargePerson}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.clientDetails}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{new Date(order.deliveryDate).toISOString().split('T')[0]}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.status}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.printingstatus}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.laminationstatus}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{order.padmakingstatus}</td>
                            { storedRole === "Admin" ? ( <td>
                                <button>
                            <svg onClick={(e)=>{e.preventDefault();handleFormOpen(order)}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="ml-4 w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
</svg></button>

                            </td>):""}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

</div>
</>
)
}
