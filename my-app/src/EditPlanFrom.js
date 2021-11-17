import React, { useState } from 'react';
// import Axios from "axios";
import { db } from "./firebase"

export default function Form() {

  const [data, setData] = useState({
    mobileNo: "",
    batch: "",
    date: ""
  })

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handle = (e) => {
    const { id, value } = e.target
    setData(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  function addMonths(date, dbdate) {
    if (date.getMonth() - dbdate.getMonth() >= 1 || date.getYear() - dbdate.getYear() >= 1) {
      return true;
    }
    else{
    return false;
    }

  }


  // Handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.mobileNo === '' || data.batch === '' || data.date === '') {
      setError(true);
    } else {
      
      let breakcondition = false;
      await db.collection("contacts").get().then((querySnapshot) => {

        // Loop through the data and store it in array to display
        var dbdata;
        querySnapshot.forEach(element => {
          dbdata = element.data();
          if (dbdata.mobileNo === data.mobileNo && addMonths(new Date(data.date), new Date(dbdata.date))) {
            // data update after edit plan
            element.ref.update({date: data.date, batch: data.batch});
            setSubmitted(true)
            setError(false);
            breakcondition = true;
            }
          
        });
      })
      
      if (!breakcondition) {
        setSubmitted(false);
        setError(true);
      }

    }
  }


  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>Your Plan has been Updated !!</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields/ Please input valid details</h1>
      </div>
    );
  };

  return (
    <div className="form">
      <div>
        <h1>Edit Plan Form</h1>
      </div>
      {/* Calling to the methods */}
      <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>

      <form>
        <label className="label">MobileNo</label>
        <input id="mobileNo" onChange={handle} className="input"
          value={data.mobileNo} placeholder="+91-xxxxxxxxxx" type="mobileNo" />
        <br />

        <label className="label">Select Batch:</label>
        <select className="dropdown" id="batch" value={data.batch} onChange={handle}>
          <option value="" selected disabled hidden >Select Batch</option>
          <option id="6-7 A.M" value="6-7 A.M">6-7 A.M</option>
          <option id="7-8 A.M" value="7-8 A.M">7-8 A.M</option>
          <option id="8-9 A.M" value="8-9 A.M">8-9 A.M</option>
          <option id="5-6 A.M" value="5-6 P.M">5-6 P.M</option>
        </select>
        <br />
        <label className="label">Payment</label>
        <input className="input"
          value="500" type="payment" />
        <br />
        <label className="label">Date</label>
        <input id="date" onChange={handle} className="input"
          value={data.date} type="date" />
        <br />
        <button onClick={handleSubmit} className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}