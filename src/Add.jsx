import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [input, setInput] = useState({ img: "", name: "", details: "" });

  const navigat = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post("http://localhost:3000/data", input)
      .then((res) => {
        alert("Data Added Successfully!");
        navigat("/");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="wrapper">
        <h2>Add Product </h2>
        <div className="add">
          <form onSubmit={handleSubmit}>
            Flower img address :
            <input
              type="text"
              onChange={(e) => setInput({ ...input, img: e.target.value })}
            />
            <br />
            Flower name:
            <input
              type="text"
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            <br />
            Flower details :
            <input
              type="text"
              onChange={(e) => setInput({ ...input, details: e.target.value })}
            />
            <br />
            <button className="button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Add;
