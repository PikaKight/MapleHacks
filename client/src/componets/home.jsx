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

  const [ephone, setePhone] = useState(0);
  const [ePC, setePC] = useState(0);
  const [eTV, seteTV] = useState(0);
  const [ecar, seteCar] = useState(0);
  const [ebike, seteBike] = useState(0);
  const [ebus, seteBus] = useState(0);
  const [eredMeat, seteRedMeat] = useState(0);
  const [edairy, seteDairy] = useState(0);
  const [egrains, seteGrains] = useState(0);
  const [electronic, setelectronic] = useState(0);
  const [travel, settravel] = useState(0);
  const [food, setfood] = useState(0);
  const [emission, setEmission] = useState(0);

  const navigate = useNavigate();

    const redirect = () => {
        navigate('/Login')
    }

  const handleSubmit = async (event) => {
    event.preventDefault()

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

    let request = new Request('http://localhost:5000/calc', {
      method: "POST",
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(body)
    })

    fetch(request)
    .then(res => {return res.json()})
    .then(data => {
      setePhone(data.Phone);
      setePC(data.PC);
      seteTV(data.TV);
      seteCar(data.Car);
      seteBike(data.Bike);
      seteBus(data.Bus);
      seteRedMeat(data['Red Meat']);
      seteDairy(data.Dairy);
      seteGrains(data.grains)
      setelectronic(data['Total Electronic']);
      settravel(data['Total Travel']);
      setfood(data['Total Food']);
      setEmission(data['Total Emission']);

    })
    .catch(e => console.log(e))
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
      <div className="result">
        <ul>
          <li>
            Phone: {ephone}
          </li>
          <li>
            PC: {ePC}
          </li>
          <li>
            TV: {eTV}
          </li>
          <li>
            Car: {ecar}
          </li>
          <li>
            Bike: {ebike}
          </li>
          <li>
            Bus: {ebus}
          </li>
          <li>
            Red Meat: {eredMeat}
          </li>
          <li>
            Dairy: {edairy}
          </li>
          <li>
            Grains: {egrains}
          </li>
          <li>
            Total Electronic: {electronic}
          </li>
          <li>
            Total Travel: {travel}
          </li>
          <li>
            Total Food: {food}
          </li>
          <li>
            Total Emission: {emission}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Home
