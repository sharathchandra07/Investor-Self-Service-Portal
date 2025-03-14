import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, CreditCard, Calendar, Lock } from 'lucide-react';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [age, setAge] = useState("");
  const [pass, setpass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !pan || !age) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (pan.length !== 12) {
      alert("PAN must be 12 characters long");
      return;
    }

    if (age < 18) {
      alert("Age must be 18 or above");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/api/data", { name, email, pan, age, pass });
      console.log(response.data);

      if (response.status === 200) {
        alert("Signup Successful!");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      style={{
        // background: 'linear-gradient(135deg, #001D37 0%, #004D99 100%)',
        backgroundColor: "rgba(14, 13, 13, 0.21)",
        backgroundSize: 'cover'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 col-lg-6">
            <div className="card border-0 shadow-lg">
              <div className="card-body p-4 p-md-5" style={{backgroundColor: "rgba(19, 47, 76, 0.8)"}}>
                <div className="text-center mb-4">
                  <h2 className="fw-bold text-light mb-2">Create Account</h2>
                  <p className="text-muted">Join our investment community today</p>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <User size={18} className="text-primary" />
                      </span>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="form-control bg-light border-0 ps-2"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <Mail size={18} className="text-primary" />
                      </span>
                      <input
                        type="email"
                        placeholder="Email Address"
                        className="form-control bg-light border-0 ps-2"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <CreditCard size={18} className="text-primary" />
                      </span>
                      <input
                        type="text"
                        placeholder="PAN Number"
                        className="form-control bg-light border-0 ps-2"
                        value={pan}
                        onChange={(e) => setPan(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <Calendar size={18} className="text-primary" />
                      </span>
                      <input
                        type="number"
                        placeholder="Age"
                        className="form-control bg-light border-0 ps-2"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0">
                        <Lock size={18} className="text-primary" />
                      </span>
                      <input
                        type="password"
                        placeholder="Create Password"
                        className="form-control bg-light border-0 ps-2"
                        value={pass}
                        onChange={(e) => setpass(e.target.value)}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 mb-3"
                    style={{
                      borderRadius: '10px',
                      fontSize: '1.1rem',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Create Account
                  </button>

                  <p className="text-center mb-0">
                    Already have an account?{' '}
                    <a 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                      }}
                      className="text-primary text-decoration-none fw-bold"
                    >
                      Sign In
                    </a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;