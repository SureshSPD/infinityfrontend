import React, { useContext, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Slidecontext } from '../Context/slidercontext';

export const AddOrderDetails = () => {

  const {setInputDataSliderOpen}= useContext(Slidecontext)
 // Retrieve email from sessionStorage
  const storedEmail = sessionStorage.getItem("Emailid");
    const [formData, setFormData] = useState({
        email: storedEmail,
        orderNumber: '',
        date: new Date(),
        salesPerson: '',
        inchargePerson: '',
        clientDetails: '',
        deliveryDate: new Date(),
        status: '',
      });
    
    const handleDateChange = (date) => {
        setFormData({ ...formData, date });
      };

      const isoDateString = formData.date;
      const dateObject = new Date(isoDateString);

      const handleDeliveryDateChange = (deliveryDate) => {
        setFormData({ ...formData, deliveryDate });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://backendinfinity-8b393b9bf8e9.herokuapp.com/users/add-order-details', formData, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
          // Reset the form data after successful submission
          setFormData({
            email: storedEmail,
            orderNumber: '',
            date: dateObject,
            salesPerson: '',
            inchargePerson: '',
            clientDetails: '',
            deliveryDate: '',
            status: '',
          });
          setInputDataSliderOpen(false);
        } catch (error) {
          console.error('Error in submitting order details:', error);
        }
      };

    return (
      <div className="flex justify-center items-center mt-32 w-full">
        <form className="space-y-6 w-full" action="#" method="POST"  onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ml-3">
            {/* Order Number */}
            <div className="mb-4">
              <label htmlFor="orderNumber" className="block text-sm font-medium leading-6 text-gray-900">
                Order Number
              </label>
              <input
                    id="Order Number"
                    name="Order Number"
                    type="text"
                    autoComplete="off"
                  required
                  value={formData.orderNumber}  // Set initial value
            onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                  className="block w-full rounded-md border-0 py-1.5 text-center text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
  
            {/* Order Date */}
            <div className="mb-4">
              <label htmlFor="orderDate" className="block text-sm font-medium leading-6 text-gray-900">
                Order Date
              </label>
              <DatePicker
        id="orderDate"
        name="orderDate"
        selected={formData.date}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
            </div>
  
            {/* Sales Person */}
            <div className="mb-4">
              <label htmlFor="salesPerson" className="block text-sm font-medium leading-6 text-gray-900">
                Sales Person
              </label>
              <input
                id="salesPerson"
                name="salesPerson"
                type="text"
                autoComplete="salesPerson"
                required
                value={formData.salesPerson}  // Set initial value
                onChange={(e) => setFormData({ ...formData, salesPerson: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
  
            {/* Incharge Person */}
            <div className="mb-4">
              <label htmlFor="inchargePerson" className="block text-sm font-medium leading-6 text-gray-900">
                Incharge Person
              </label>
              <input
                id="inchargePerson"
                name="inchargePerson"
                type="text"
                autoComplete="inchargePerson"
                required
                value={formData.inchargePerson}  // Set initial value
                onChange={(e) => setFormData({ ...formData, inchargePerson: e.target.value })}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
  
          {/* Client Details */}
          <div className="mb-4 ml-3">
            <label htmlFor="clientDetails" className="block text-sm font-medium leading-6 text-gray-900">
              Client Details
            </label>
            <textarea
              id="clientDetails"
              name="clientDetails"
              rows="4"
              autoComplete="clientDetails"
              required
              value={formData.clientDetails}  // Set initial value
              onChange={(e) => setFormData({ ...formData, clientDetails: e.target.value })}
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            ></textarea>
          </div>
  
          {/* Delivery Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 ml-3">
            <div className="mb-4">
              <label htmlFor="deliveryDate" className="block text-sm font-medium leading-6 text-gray-900">
                Delivery Date
              </label>
              <DatePicker
        id="orderDate"
        name="orderDate"
        selected={formData.deliveryDate}
        onChange={handleDeliveryDateChange}
        dateFormat="yyyy-MM-dd"
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 text-center shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      />
            </div>
  
            {/* Status */}
            <div className="mb-4">
              <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">
                Status
              </label>
              <select
    id="status"
    name="status"
    required
    value={formData.status}  // Set initial value
    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <option value="" disabled>Select status</option>
    <option value="Printing Section">Printing Section</option>
    <option value="Lamination Section">Lamination Section</option>
    <option value="Pad Making">Pad Making</option>
  </select>
            </div>
          </div>
  
          {/* Save Button */}
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
  