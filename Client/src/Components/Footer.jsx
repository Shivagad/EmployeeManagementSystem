
// import React from "react";
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
// import './Footer.css'; // Import the CSS file
// const Footer = () => {
//   return (
//     <footer className="footer bg-dark text-white mt-auto">
//       <div className="footer-content">
//         <div className="footer-section">
//           <h5>About Us</h5>
//           <p>
//             TeamHub is a comprehensive employee management system, empowering teams to work more efficiently.
//           </p>
//         </div>
//         <div className="footer-section">
//           <h5>Contact</h5>
//           <p>Email: support@teamhub.com</p>
//           <p>Phone: +1 234 567 890</p>
//         </div>
//         <div className="footer-section">
//           <h5>Follow Us</h5>
//           <div className="social-icons">
//             <a
//               href="https://www.facebook.com/yourcompany"
//               className="icon"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaFacebook size={24} />
//             </a>
//             <a
//               href="https://www.twitter.com/yourcompany"
//               className="icon"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaTwitter size={24} />
//             </a>
//             <a
//               href="https://www.linkedin.com/company/yourcompany"
//               className="icon"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaLinkedin size={24} />
//             </a>
//             <a
//               href="https://www.instagram.com/yourcompany"
//               className="icon"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <FaInstagram size={24} />
//             </a>
//           </div>
//         </div>
//       </div>
//       <div className="footer-bottom text-center">
//         <p>&copy; {new Date().getFullYear()} TeamHub. All rights reserved.</p>
//         <p>
//           <a href="/privacy-policy" className="footer-link">
//             Privacy Policy
//           </a>{" "}
//           |{" "}
//           <a href="/terms-of-service" className="footer-link">
//             Terms of Service
//           </a>
//         </p>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import './Footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white mt-auto">
      <div className="footer-content">
        {/* About Us Section */}
        <div className="footer-section">
          <h5>About Us</h5>
          <p>
            TeamHub is a comprehensive employee management system, empowering teams to work more efficiently.
          </p>
        </div>
        
        {/* Contact Section */}
        <div className="footer-section">
          <h5>Contact</h5>
          <p>Email: support@teamhub.com</p>
          <p>Phone: +1 234 567 890</p>
        </div>

        {/* Follow Us Section */}
        <div className="footer-section">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="https://www.facebook.com/yourcompany" className="icon" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.twitter.com/yourcompany" className="icon" target="_blank" rel="noopener noreferrer">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.linkedin.com/company/yourcompany" className="icon" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.instagram.com/yourcompany" className="icon" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Help Center and Additional Links Section */}
        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul className="footer-links">
            <li><a href="/help-center" className="footer-link">Help Center</a></li>
            <li><a href="/careers" className="footer-link">Careers</a></li>
            <li><a href="/about-us" className="footer-link">About Us</a></li>
            <li><a href="/sitemap" className="footer-link">Sitemap</a></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom with Copyright & Legal Links */}
      <div className="footer-bottom text-center">
        <p>&copy; {new Date().getFullYear()} TeamHub. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="footer-link">Privacy Policy</a> | 
          <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
