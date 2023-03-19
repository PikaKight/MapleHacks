import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import './home.css';

function Home() {
  const [phone, setPhone] = useState(0);
  const [PC, setPC] = useState(0);
  const [TV, setTV] = useState(0);
  const [car, setCar] = useState(0);
  const [bike, setBike] = useState(0);
  const [bus, setBus] = useState(0);
  const [redMeat, setRedMeat] = useState(0);
  const [dairy, setDairy] = useState(0);
  const [grains, setGrains] = useState(0);
  const navigate = useNavigate();

    const redirect = () => {
        navigate('/Login')
    }

  const handleSubmit = (event) => {
    event.preventDefault

    let body = {
      Phone: phone,
      PC: PC,
      TV: TV,
      Car: car,
      Bike: bike,
      Bus: bus,
      RedMeat: redMeat,
      Dairy: dairy,
      Grains: grains
    }

    let request = new Request('http://127.0.0.1:8000/calc', {
      method: "POST",
      mode: "no-cors",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })

    fetch(request)
    

  }

  return (
    <div className="App">
      <button onClick={redirect}>Account</button>
      <div className='welcome'>
        <div className="wmessage">
          <h1>Welcome to CO2lator</h1>
          <p>This is a C02 Calculator to help reduce emissions.</p>
        </div>
        <div className="calc">
          <form onSubmit={handleSubmit}>
            <h2>CO2 Emission</h2>
            
            <h3>Electricity</h3>
            <p>Please enter the amount of time of each catagory in hours</p>
              <label>
                Phone Time: 
                <input 
                  type='number' 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </label>
              <label>
                Computer: 
                <input 
                  type='number'
                  id="PC"
                  value={PC}
                  onChange={(e) => setPC(e.target.value)}
                />
              </label>
              <label>
                TV: 
                <input 
                  type='number'
                  id="TV"
                  value={TV}
                  onChange={(e) => setTV(e.target.value)}
                />
              </label>

            <h3>Travel</h3>
            <p>Please enter the amount of time of each catagory in hours</p>
              <label>
                Car: 
                <input
                  type='number'
                  id="car"
                  value={car}
                  onChange={(e) => setCar(e.target.value)}
                />
              </label>
              <label>
                Bike: 
                <input
                  type='number'
                  id="bike"
                  value={bike}
                  onChange={(e) => setBike(e.target.value)}
                />
              </label>
              <label>
                Bus: 
                <input
                  type='number'
                  id="bus"
                  value={bus}
                  onChange={(e) => setBus(e.target.value)}
                />
              </label>
          
            <h3>Food</h3>
            <p>Please enter the amount of kilogram of each catagory</p>
              <label>
                Red Meat: 
                <input
                  type='number'
                  id="redMet"
                  value={redMeat}
                  onChange={(e) => setRedMeat(e.target.value)}
                />
              </label>
              <label>
                Dairy: 
                <input
                  type='number'
                  id="dairy"
                  value={dairy}
                  onChange={(e) => setDairy(e.target.value)}
                />
              </label>
              <label>
                Grains: 
                <input
                  type='number'
                  id="grains"
                  value={grains}
                  onChange={(e) => setGrains(e.target.value)}
                />
              </label>
            <input type='submit'/>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
