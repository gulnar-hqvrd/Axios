import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState({ img: "", name: "", details: "" });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/data/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({ ...data, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios.put("http://localhost:3000/data/" + id, data).then((res) => {
      alert("Data edited successfully!");
      navigate("/");
    });
  }

  return (
    <>
      <div className="wrapper">
        <h2>Edit Product</h2>
        <div className="add">
          <form onSubmit={handleSubmit}>
            Flower id: 
            <input type="text" disabled value={data.id} />
            <br />
            Flower img address:
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <br />
            Flower name:
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <br />
            Flower details:
            <input
              type="text"
              value={data.details}
              onChange={(e) => setData({ ...data, details: e.target.value })}
            />
            <br />
            <button className="button" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
