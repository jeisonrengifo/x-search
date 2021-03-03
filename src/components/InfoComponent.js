import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import InfoService from "../services/info-service";


export default function InfoComponent() {
  const form = useRef();
  const checkBtn = useRef();
  const [inputList, setInputList] = useState([{ info: "", description: "" }]);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick 
  = () => {
    setInputList([...inputList, { info: "", description: ""}]);
  };



  const handleRegisterInfo = (e) => {
    e.preventDefault();
    const list = [...inputList];
    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      InfoService.infoRegister(...inputList).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };


  return (
    <div class="xsearch">
      <h3>Info saver</h3>
      <Form onSubmit={handleRegisterInfo} ref={form}> 
      
      {inputList.map((x, i) => {
        return (
          
        <div class="d-grid gap-4 p-2 bg-light border">
          
          <div class="row">
              <div class="col-3">
                
                <select name="typeInfo" onChange={e => handleInputChange(e,i)}>
                    <option value="0">Select Info type</option>
                    <option value="PH">Phone number</option>
                    <option value="IP">Ip Address</option>                
                    <option selectedvalue="Cam">Camera</option>
                    <option value="BA">Bank account</option>
                    <option value="Add">Address</option>
                    <option value="PS">Password</option>
                    <option value="EM">E-maile</option>
                </select>
              </div>
              <div class="col-3">
                <input
                  className="ml10"
                  name="description"
                  placeholder="Enter Description"
                  value={x.description}
                  onChange={e => handleInputChange(e, i)}
                />
              </div>
              <div class="col-3">
              <input
                name="info"
                placeholder="Enter Info"
                value={x.info}
                onChange={e => handleInputChange(e, i)}
              />
              </div>              
              <div class="col-3">
                
                  {inputList.length !== 1 && <button
                    class="btn btn-danger"




                    onClick={() => handleRemoveClick(i)}>Remove</button>}
                  {inputList.length - 1 === i && <button class="btn btn-success" onClick={handleAddClick}>Add</button>}                
              </div>
          </div>   
          <div style={{ marginTop: 120 }}>{JSON.stringify(inputList)}hola</div>       
        </div>
        
        
        );
      })}
         
          <div class="row">
            <div class="col text-center p-2 bg-light border">
              
              <button class="btn btn-success" >Saves</button>
            </div>
          </div>
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
    </div>
      
      
    
  );
}
