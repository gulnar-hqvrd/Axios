import "./App.css";
import "../db.json";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
function App() {
  const [data, setData] = useState([]);
  const nagigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="wrapper">
        <h2>
          Add Product
        <button className="button"><Link to="/create" className="button">
            Add
          </Link>
          </button>  
        </h2>
        <div className="products">
          {data.map((d, i) => {
            return (
              <div className="product">
                <img src={d.img} alt="" />
                <h3>{d.name}</h3>
                <p>{d.details}</p>
              <button tton className="button"> <Link className="button" to={`/edit/${d.id}`}>
                  Edit
                </Link></button> 
                <button onClick={(e) => handleSubmit(d.id)} className="button">
                  Delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );

  function handleSubmit(id) {
    const conf = window.confirm("Do you want to delete");
    if (conf) {
      axios
        .delete("http://localhost:3000/data/" + id)
        .then((res) => {
          alert("flower delete");
          nagigate("/");
        })
        .catch((err) => console.log(err));
    }
  }
}

export default App;
