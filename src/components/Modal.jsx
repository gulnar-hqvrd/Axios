import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "./loading";

function Modal({ setModalShow }) {
  const [input, setInput] = useState({ img: "", name: "", details: "" });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInput({ ...input, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const validationErrors = {};
    if (!input.img.trim()) {
      validationErrors.img = "Image is required";
    }
    if (!input.name.trim()) {
      validationErrors.name = "Name is required";
    }
    if (!input.details.trim()) {
      validationErrors.details = "Details are required";
    }
    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const validationErrors = validate();
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      axios
        .post("http://localhost:3000/data", input)
        .then((res) => {
          alert("Data Added Successfully!");
          navigate("/");
          setModalShow(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <>
      <div className="modal wrapper">
        <h2>Add Product</h2>
        <div className="add">
          <button onClick={() => setModalShow(false)}>&times;</button>
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              Flower img:
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {errors.img && <span>{errors.img}</span>}
              <br />
              Flower name:
              <input
                type="text"
                name="name"
                onChange={handleChange}
              />
              {errors.name && <span>{errors.name}</span>}
              <br />
              Flower details:
              <input
                type="text"
                name="details"
                onChange={handleChange}
              />
              {errors.details && <span>{errors.details}</span>}
              <br />
              <button className="button" type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
