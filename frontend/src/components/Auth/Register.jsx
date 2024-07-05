import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/register",
        { name, phone, email, role, password }, 
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

//   if(isAuthorized){
//     return <Navigate to={'/'}/>
//   }


  return (
    <>
      <section className="authPage">
      <div class="logobanner">
        <img src="/drdo_logo_0.png" width="369" height="85" alt="Defence Research and Development Organisation - DRDO, Ministry of Defence, Government of India"/>
        <h1>Instruments Research & Development Establishment (IRDE) Internship Portal</h1>
      </div>
      <div class="topbanner">
            <img src="https://www.drdo.gov.in/drdo/sites/default/files/subsite_banner_image/lab-image.jpg" width="959" height="587" alt="Instruments Research & Development Establishment" title="Instruments Research & Development Establishment"/>
            <div class="textContent">
                <h1>Instruments Research & Development Establishment (IRDE)</h1>
                <p>Instruments Research and Development Establishment (IRDE), is devoted to research, design, development and technology transfer in optical and electro-optical instrumentation primarily…</p>
                <a href="https://www.drdo.gov.in/drdo/labs-establishment/about-us/instruments-research-development-establishment-irde" class="knowMore">Know More</a>
            </div>
        </div>
      
        <div className="container">
          <div className="header">
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Admin</option>
                  <option value="Job Seeker">Student</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="number"
                  placeholder="Your Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login"}>Login Now</Link>
          </form>
        </div>

      </section>
    </>
  );
};

export default Register;