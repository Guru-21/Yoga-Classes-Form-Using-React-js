import React, { useState } from 'react';
import Form from './Form';
import './form.css';
import EditPlanForm from './EditPlanFrom';

function App() {
  const [newUser, setNewUser] = useState();
  const [firstTime, setFirstTime] = useState(true);

  const handleClick = (e) => {
    setNewUser(true);
    setFirstTime(false);
  };
    
     const handleEditPlan = (e) => {
      setNewUser(false);
      setFirstTime(false);
    }

 
  return (
    <div className="App">
      <div>
        <h1>Welcome to Yoga Classes</h1>
      </div>
  
      <button onClick ={handleClick} className="btn1">New User</button>
      <button onClick ={handleEditPlan} className="btn2" >Edit Plan</button>
      {firstTime ? null : <div> {newUser ? (<Form/> ): (<EditPlanForm />)} </div>}
      
    </div>
  );
}

export default App;
