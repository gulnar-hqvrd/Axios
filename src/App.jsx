import "./App.css";
import "../db.json";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "./components/loading";
import Modal from "./components/Modal";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const nagigate = useNavigate();
  const [query, setQuery] = useState("");
  const [modalShow , setModalShow] = useState(false)
  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(data.filter(d.name.toLowerCase.includes("Li")));
  // console.log(query);
  // console.log(data.filter((user) => user.name.toLowerCase().includes("li")));
  return (
    <>
    {modalShow && <Modal setModalShow = {setModalShow} />}
      {loading && <Loading />}
      <div className="wrapper">
        <h2>
          Add Product
          <button onClick={()=>setModalShow(true)} className="button">
            {/* className = "button" */}
            {/* <Link to="/create" className="button">
            </Link> */}

            Add
          </button>
          <div className="search">
            <input
              type="text"
              placeholder="search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </h2>
        <div className="products">
          {data
            .filter((user) => user.name.toLowerCase().includes(query))
            .map((d, i) => {
              return (
                <div className="product">
                  <img src={d.img} alt="" />
                  <h3>{d.name}</h3>
                  <p>{d.details}</p>
                  <button tton className="button">
                    {" "}
                    <Link className="button" to={`/edit/${d.id}`}>
                      Edit
                    </Link>
                  </button>
                  <button
                    onClick={(e) => handleSubmit(d.id)}
                    className="button"
                  >
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
