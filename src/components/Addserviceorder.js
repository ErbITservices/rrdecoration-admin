import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProductapi, editProductapi } from "../redux/apiCalls/productsApis";
import { req } from "../axiosReqMethods";



function Addserviceorder({title,edit,setedit,librarydata}) {

  const [data, setdata] = useState({
    lname: "",
    service: "",
    startdate: "",
    enddate: "",
    amount: "",
  });
  if (librarydata != undefined) {
    setdata(librarydata)
  }
  
if (librarydata) {
  // setdata(librarydata)
}
  const handleInput = (e) => {
    
    const name = e.target.name;
    const value = e.target.value;

    setdata({
      ...data,
      [name]: value,
    });

    
    console.log(data);
  };

  const handleSubmit = async() => {
    console.log(data);
     try {
        console.log("mihir1");
        
        const res = await req.post(`/api/ticket`, data);  
       console.log(res);
       setdata({
         lname: "",
         service: "",
         startdate: "",
         enddate: "",
         amount: "",
       });
        
    } catch (error) {
        
        console.log(error)
    }
    
    
  } 
  async function handleedit() {
    console.log("hey");
    const res = await req.put(`/api/ticket/setdate/${librarydata._id}`, data);  
       console.log(res);
       setdata({
         lname: "",
         service: "",
         startdate: "",
         enddate: "",
         amount: "",
       });
    edit = false
  }
   
  return (
    <div className="maincontainer">
      {title && <h1>{title} Ordder</h1>}
      {!title && <h1>Add Ordder</h1>}

      <div className="inputfield">
        <label>Enter Library Name </label>
        <input
          name="lname"
          onChange={handleInput}
          value={data.lname}
          required
          type="text"
        />
      </div>
      <div className="inputfield">
        <label>Enter Service name </label>
        <input
          name="service"
          onChange={handleInput}
          value={data.service}
          required
          type="text"
        />
      </div>
      <div className="inputfield">
        <label>Start Date of service </label>
        <input
          name="startdate"
          onChange={handleInput}
          value={data.startdate}
          required
          type="date"
        />
      </div>
      <div className="inputfield">
        <label>End Date of service </label>
        <input
          name="enddate"
          onChange={handleInput}
          value={data.enddate}
          required
          type="date"
        />
      </div>
      <div className="inputfield">
        <label>Amount </label>
        <input
          name="amount"
          onChange={handleInput}
          value={data.amount}
          required
          type="number"
        />
      </div>
      {!edit && (
        <div className="inputfield">
          <button type="button" onClick={handleSubmit} className="btn ">
            Add <AddIcon />
          </button>
        </div>
      )}

      {edit && (
        <>
          <div className="inputfield">
            <button type="button" onClick={handleedit} className="btn ">
              Edit <AddIcon />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Addserviceorder;
