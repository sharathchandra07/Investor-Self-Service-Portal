import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import axios from 'axios';
import SignUp from './components/signup';
import Dashboard from './components/Dashboard';
import Profile from './components/profile';
import './styles.css';
import { createContext } from 'react';
// Import all images
import myImage from './AdobeStock_916879209_Preview.jpeg';
import img1 from './Screenshot 2024-11-30 120254.jpg';
import img2 from './Screenshot 2024-11-30 120551.jpg';
import img3 from './folios.jpg';
import img4 from './kyc.jpg';
import img5 from './manage.jpg';
import img6 from './nominee.jpg';
import com from './other/complaint.jpg';
import fat from './other/fatcha.jpg';
import pay from './other/payouts.jpg';
import red from './other/reddem.jpg';
import unc from './other/uncliamed.jpg';
import warr from './other/warrant.jpg';
import footer from './other/footer.jpg';
import { CounterContext } from './context/Counter';
// import { Wheat } from 'lucide-react';


const Login = () => {
  const navigate = useNavigate();
  const { setuserdata } = useContext(CounterContext);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [pan, setpan] = useState("");
  const [age, setage] = useState("");

  const myfunc = () => {
    navigate('/');
  };

  const myfun = async () => {
    let pan = document.getElementById('pan').value;
    let pass = document.getElementById('pass').value;
    
    if (pan === "" || pass === "" || pan.length < 12) {
      alert("Please Enter Valid Details");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/check", { pan, pass });
      if (response.data) {
        navigate('/dash');
        try {
          const sentinfo = await axios.post("http://localhost:8000/api/profile", { pan, pass });
          setuserdata(sentinfo.data);
          // console.log(sentinfo.data);
          setname(sentinfo.data[0].name);
          setemail(sentinfo.data[0].email);
          setpan(sentinfo.data[0].pan);
          setage(sentinfo.data[0].age);
        } catch (err) {
          console.log(err);
        }
      } else {
        alert("Incorrect Details");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main>
      {/* Hero Section */}
      <div
        className="min-vh-100"
        style={{
          backgroundImage: `url(${myImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '650px'
        }}
      >
        {/* Navigation */}
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon bg-secondary"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/learntoinvest.html"><b className='text-white'>Learn to Invest</b></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/PlanInvestment.html"><b className='text-white'>Plan Investment</b></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Browse.html"><b className='text-white'>Browse and Invest</b></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section1"><b className='text-white'>Services</b></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#section2"><b className='text-white'>About Us</b></a>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/signup')}
                className="btn btn-outline-light ms-auto"
              >
                <b>Sign up</b>
              </button>
            </div>
          </div>
        </nav>

        {/* Login Form */}
        <div className="container-fluid mt-5">
          <div className="row justify-content-start" style={{marginTop: "150px"}}>
            <div className="col-lg-4 col-md-6 col-lg-5 mt-5">
              <h2 className="text-white fw-bold display-6 mb-1 mt-5 text-center">
                Investor Self Service Zone
              </h2>
              <h5 className="text-white fw-bold mb-3 text-center">
                Manage your account with ease
              </h5>
              <div className="card bg-white bg-opacity-10 p-3">
                <form 
                onSubmit={(e) => { 
                  e.preventDefault(); // Prevents default form submission
                  myfun(); 
                }}
                >
                <div className="mb-2">
                  <input
                    type="text"
                    id="pan"
                    className="form-control form-control-md"
                    placeholder="Enter PAN or Folio Number"
                  />
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    id="pass"
                    className="form-control form-control-md"
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-md w-100">
                  <b>Login</b>
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="section1" className="py-5" style={{ backgroundColor: "#001D37" }}>
        <div className="container">
          <h2 className="text-white display-5 mb-4"><b>Explore Our Services</b></h2>
          <div className="row g-4">
            {[img1, img2, img3, img4, img5, img6].map((img, index) => (
              <div key={index} className="col-12 col-md-6 col-lg-4">
                <button 
                  onClick={myfunc}
                  className="btn p-0 w-100 h-100"
                >
                  <img 
                    src={img} 
                    alt={`Service ${index + 1}`}
                    className="img-fluid rounded shadow"
                    style={{ transition: 'transform 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="display-5 mb-4 text-dark"><b style={{color: "black"}}>Other Services</b></h2>
          <div className="row g-4">
            {[com, fat, pay, red, unc, warr].map((img, index) => (
              <div key={index} className="col-12 col-md-6">
                <button 
                  onClick={myfunc}
                  className="btn p-0 w-100"
                >
                  <img 
                    src={img} 
                    alt={`Other Service ${index + 1}`}
                    className="img-fluid rounded shadow"
                    style={{ 
                      height: '80px', 
                      width: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <section id="section2" style={{ backgroundColor: "#001D37" }}>
        <div className="container py-5">
          <img 
            src={footer} 
            alt="contact" 
            className="img-fluid rounded shadow"
          />
        </div>
      </section>
    </main>
  );
};

const ScreenTime = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dash' element={<Dashboard />} />
        <Route path='/dash/profile' element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default ScreenTime;