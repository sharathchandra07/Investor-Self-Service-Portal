import React from "react";
// import { DataContext } from "./DataContext"; // Ensure correct import
import { useContext, useState, useEffect } from "react";
import {CounterContext} from '../context/Counter';
import './profile.css';
import {User, Mail, CakeIcon, IdCardIcon} from 'lucide-react';

const Profile = () => {
  const { userdata } = useContext(CounterContext);
  const [userinfo, setuserinfo] = useState([]);

  useEffect(() => {
    if (userdata && userdata.length > 0) {
      setuserinfo([
        userdata[0]?.name || "N/A",
        userdata[0]?.email || "N/A",
        userdata[0]?.age || "N/A",
        userdata[0]?.pan || "N/A",
      ]);
    }
  }, [userdata]); 

  const labels = ["Name", "Email", "Age", "PAN"];
  const icons = [User, Mail, CakeIcon, IdCardIcon];

  return (
    <div className="card min-vh-100 d-flex align-items-center justify-content-center p-4">
      <h2><b>Profile</b></h2>
      <div className="card shadow border-0" style={{ maxWidth: '800px', backgroundColor: "white" }}>
        <div className="p-4">
          {userinfo.slice(0, 4).map((item, index) => {
            const Icon = icons[index];
            return (
              <div 
                key={index}
                className="profile-item d-flex align-items-center gap-3 p-3 rounded-3 mb-3 text-white"
              >
                <div className="profile-icon rounded-3 d-flex align-items-center justify-content-center ">
                  <Icon size={20} />
                </div>
                <div>
                  <h6 className="text-muted mb-0">{labels[index]}</h6>
                  <h6 className="fw-medium mb-0">{item}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;