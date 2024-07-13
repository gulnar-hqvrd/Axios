import './App.css'
import "../db.json"
import axios from 'axios'
import { useEffect } from 'react'
function App() {

  useEffect(()=>{
    axios.get("http://localhost:8080/data").then((res)=>res.json()).then(data=>console.log(data))
  },[])
  return (

    <>
      <div className='wrapper'>
        <div className='products'>
            <div className='product'>
                <img src="https://t4.ftcdn.net/jpg/05/57/29/25/360_F_557292539_2kXYz0frOcCGISoYEd2MNTmxyT0lYyOj.jpg" alt="" />
                <h3>Gül</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, amet.</p>

            </div>
        </div>
      </div>
    </>
  )
}

export default App
