'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TicketDetails({ params }) {
  const name = params.id[0];
  const amount = params.id[1]
  const [data, setData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [inputamount, setinputAmount] = useState(null);
  const [Send, setSend] = useState(false);

  useEffect(() => {
    // Check if running on the client side
    if (typeof window !== 'undefined') {
      // Check if the phone number exists in local storage
      const storedPhoneNumber = localStorage.getItem('esenpiCustomer');
      
      // Perform the fetchData logic only if storedPhoneNumber is available
      if (amount && Send && storedPhoneNumber) {
        fetchData(storedPhoneNumber);
      }
    }
  }, [amount, Send]); // Add amount and Send to the dependency array
  
  const fetchData = async (storedPhoneNumber) => {
    try {
      if (storedPhoneNumber) {
        // If it exists, use it in the request
        const response = await axios.post('https://esenpi.onrender.com/stkpush', {
          businessId: "Hiuhu",
          amount: amount, 
          tillNumber: 4087480,
          customerMSISDN: parseInt(storedPhoneNumber), // Convert to integer if needed
        });

        setData(response.data);
        console.log(response.data);
      } else {
        // If it doesn't exist, show the input fields and add buttons
        // You can customize the UI based on your requirements
        setPhoneNumber('');
        setinputAmount(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddPhoneNumber = () => {
    // Add the phone number to local storage
    localStorage.setItem('esenpiCustomer', phoneNumber);
    // Now make the call with the new phone number
    if (amount&&Send) {
      fetchData(phoneNumber);
    }
  };

  return (
    <main>
      <nav>
        <h2>Ticket Details</h2>
      </nav>
      <div className="card">
        <h3>Esenpi</h3>
        <small>Created by</small>
        <small> {name}</small>
      {(typeof window !== 'undefined')&& 
      <>
        {!localStorage.getItem('esenpiCustomer') && (
          <div>
            <input
              type="number"
              placeholder="Enter phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              max={999999999} // Max 9 digits
            />
            <button onClick={handleAddPhoneNumber}>Add Number</button>
          </div>
        )}
      </>
}

        {amount===null&&!Send&& (
          <div>
            <input
              type="number"
              placeholder="Enter amount"
              value={inputamount}
              onChange={(e) => setinputAmount(e.target.value)}
            />
            <button onClick={() =>setSend(true)}>Add Amount</button>
          </div>
        )}
      </div>
    </main>
  );
}
