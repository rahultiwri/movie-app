import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 200) {
        setShow(true);   // scroll down → show footer
      } else {
        setShow(false);  // top → hide footer
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`footer-wrapper ${show ? "show" : ""}`}>
      <footer className="footer">

        <div className="footer-container">
          <div>
            <h3>Company</h3>
            <p>📍 Lucknow, India</p>
            <p>📧 support@movieapp.com</p>
          </div>

          <div>
            <h3>Support</h3>
            <p>Help Center</p>
          </div>

          <div>
            <h3>Follow Us</h3>

            <div className="social-icons">
              <a href="https://facebook.com"><FaFacebook /></a>
              <a href="https://instagram.com"><FaInstagram /></a>
              <a href="https://twitter.com"><FaTwitter /></a>
              <a href="https://youtube.com"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <p className="footer-bottom">© 2026 Movie App</p>

      </footer>
    </div>
  );
}

export default Footer;