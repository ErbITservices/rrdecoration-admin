import { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addProductapi, editProductapi } from "../redux/apiCalls/productsApis";
import { req } from "../axiosReqMethods";

function Editlibraray({  librarydata,setedit }) {
  const [data, setdata] = useState(librarydata);
  
  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setdata({
      ...data,
      [name]: value,
    });

    console.log(data);
  };

  
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
      setedit(false)
  }

  return (
    <div className="maincontainer">
     <h1> Edit Ordder</h1>

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
     
      
          <div className="inputfield">
            <button type="button" onClick={handleedit} className="btn ">
              Edit <AddIcon />
            </button>
          </div>
       
    </div>
  );
}

export default Editlibraray;
