import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
// import logo from '../assets/logo.jpg';
import Header from "./Header"; // Import the Header
import Footer from "./Footer"; // Import the Footer
const Dashboard = () => {
  const anvigate = useNavigate()
  axios.defaults.withCredentials = true
  const handleLogout = () => {
    axios.get('http://localhost:3000/auth/logout')
    .then(result => {
      if(result.data.Status) { 
        localStorage.removeItem("valid")
        anvigate('/')
      }
    })
  }
  return (
    <>
    <Header/>
    <div className="container-fluid">
      
      <div className="row flex-nowrap">
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none"
            >
              {/* <img src={logo} alt="Logo" className="logo" style={{ width: '50%', height: 'auto', marginLeft: '20px' }} /> */}


              {/* <span className="fs-5 fw-bolder d-none d-sm-inline">
                Shivaji
              </span> */}
            </Link>
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-0 align-middle"
                >
                  <i className="fs-4 bi-speedometer2 ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-people ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">
                    Manage Employees
                  </span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-columns ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Category</span>
                </Link>
              </li>
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-person ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Profile</span>
                </Link>
              </li>
              <li className="w-100" onClick={handleLogout}>
              <Link
                  className="nav-link px-0 align-middle text-white"
                >
                  <i className="fs-4 bi-power ms-2"></i>
                  <span className="ms-2 d-none d-sm-inline">Logout</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="col p-0 m-0">
            <div className="p-2 d-flex justify-content-center shadow">
                {/* <h4>Emoployee Management System</h4> */}
            </div>
            <Outlet />
        </div>
      </div>
    
    </div>
      <Footer/>
      </>
  );
};

export default Dashboard;



// import React, { useState, useEffect, useRef } from "react";
// import { Link, Outlet, useNavigate } from "react-router-dom";
// import "bootstrap-icons/font/bootstrap-icons.css";
// import axios from "axios";
// import Header from "./Header"; 
// import Footer from "./Footer"; 
// import './Dashboard.css'; 

// const Dashboard = () => {
//   const [isSidebarVisible, setSidebarVisible] = useState(true); // Sidebar visibility state
//   const sidebarRef = useRef(null); // Sidebar reference
//   const navigate = useNavigate();
//   axios.defaults.withCredentials = true;

//   const handleLogout = () => {
//     axios.get('http://localhost:3000/auth/logout')
//       .then(result => {
//         if(result.data.Status) { 
//           localStorage.removeItem("valid");
//           navigate('/');
//         }
//       })
//   };

//   // Handle outside clicks/touches to hide sidebar
//   const handleOutsideClick = (event) => {
//     if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//       setSidebarVisible(false); // Hide the sidebar if clicked outside
//     }
//   };

//   // Add event listener for detecting clicks/touches outside the sidebar
//   useEffect(() => {
//     document.addEventListener('mousedown', handleOutsideClick);
//     return () => {
//       document.removeEventListener('mousedown', handleOutsideClick);
//     };
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className="container-fluid">
//         <div className="row flex-nowrap">
//           <div ref={sidebarRef} className={`col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark sidebar ${isSidebarVisible ? '' : 'hidden'}`}>
//             <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
//               <Link to="/dashboard" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
//               </Link>
//               <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
//                 <li className="w-100" onClick={() => setSidebarVisible(true)}>
//                   <Link to="/dashboard" className="nav-link text-white px-0 align-middle">
//                     <i className="fs-4 bi-speedometer2 ms-2"></i>
//                     <span className="ms-2 d-none d-sm-inline">Dashboard</span>
//                   </Link>
//                 </li>
//                 <li className="w-100" onClick={() => setSidebarVisible(true)}>
//                   <Link to="/dashboard/employee" className="nav-link px-0 align-middle text-white">
//                     <i className="fs-4 bi-people ms-2"></i>
//                     <span className="ms-2 d-none d-sm-inline">Manage Employees</span>
//                   </Link>
//                 </li>
//                 <li className="w-100" onClick={() => setSidebarVisible(true)}>
//                   <Link to="/dashboard/category" className="nav-link px-0 align-middle text-white">
//                     <i className="fs-4 bi-columns ms-2"></i>
//                     <span className="ms-2 d-none d-sm-inline">Category</span>
//                   </Link>
//                 </li>
//                 <li className="w-100" onClick={() => setSidebarVisible(true)}>
//                   <Link to="/dashboard/profile" className="nav-link px-0 align-middle text-white">
//                     <i className="fs-4 bi-person ms-2"></i>
//                     <span className="ms-2 d-none d-sm-inline">Profile</span>
//                   </Link>
//                 </li>
//                 <li className="w-100" onClick={() => { handleLogout(); setSidebarVisible(true); }}>
//                   <Link className="nav-link px-0 align-middle text-white">
//                     <i className="fs-4 bi-power ms-2"></i>
//                     <span className="ms-2 d-none d-sm-inline">Logout</span>
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="col p-0 m-0">
//             <div className="p-2 d-flex justify-content-center shadow">
//               <h4>Employee Management System</h4>
//             </div>
//             <Outlet />
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Dashboard;
