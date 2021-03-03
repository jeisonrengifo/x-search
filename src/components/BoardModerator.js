import React, { useState, useEffect, useRef } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import InfoService from "../services/info-service";
import UserService from "../services/user.service";

const BoardModerator = () => {
  const [content, setContent] = useState("");
  const [inputList, setInputList] = useState([{ info: "", description: "" }]);
  const form = useRef();
  const checkBtn = useRef();
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    UserService.getModeratorBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

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
    console.log("BoardModerator.js-> "+JSON.stringify(list))
    setMessage("");
    setSuccessful(false);


    InfoService.infoRegister(...list).then(
        (response) => {
          const list = [{ info: "", description: "" }];
          setMessage(response.data.message);
          setSuccessful(true);
          setInputList(list);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );

    {/*form.current.validateAll(); 
    if (checkBtn.current.context._errors.length === 0) {
      InfoService.infoRegister().then(
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
    }*/}
  };



  return (
    <div className="container">
      {/**<header className="jumbotron">
       <h3>{content}</h3>**/}
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
                    <option value="1">Phone number</option>
                    <option value="2">E-mail</option>
                    <option value="3">Ip Address</option>                                    
                    <option value="4">Camera</option>                    
                    <option value="5">Bank account</option>
                    <option value="6">Address</option>
                    <option value="7">Password</option>
                    
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
        </div>       
        
        );
      })}
          {/*<div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>*/}
          <div class="row">
            <div class="col text-center p-2 bg-light border">
              <button class="btn btn-success" onClick={handleRegisterInfo}>Save</button>
            </div>
          </div>

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
    </div>
    

     {/** </div> </header>*/}
    </div>
  );
};

export default BoardModerator;
