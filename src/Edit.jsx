import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/data/" + id)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    axios.put("http://localhost:3000/data/" + id, data).then((res) => {
      alert("data edit successfully!");
      navigate("/");
    });
  }
  return (
    <>
      <div className="wrapper">
        Add Product
        <div className="add">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              disabled
              placeholder="Enter flower id"
              value={data.id}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Enter flower image address"
              value={data.img}
              onChange={(e) => setData({ ...data, img: e.target.value })}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Enter flower name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />{" "}
            <br />
            <input
              type="text"
              placeholder="Enter flower details"
              value={data.details}
              onChange={(e) => setData({ ...data, details: e.target.value })}
            />{" "}
            <br />
            <button className="button">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Edit;
