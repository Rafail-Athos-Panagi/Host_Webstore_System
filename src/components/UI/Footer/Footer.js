import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.min.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Footer.css';
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import logo from "../../../assets/logo/cut_logo.png";

export default function Footer() {

  const madeby = () => {
    Swal.fire({
      iconHtml: `<img src=${logo} style="width:300px"alt="logo" />`,
      title: 'Developed By',
      html: 'The system was developed by <b> Matthew Paraskeva, Sotiris Vasileiadis, Raphael Panayi, Charalambos Michaelides, Emmanuel Economou</b>,'
        + ' third year students of the Department of Electrical and Computer Engineering and Information Technology of the Cyprus University of Technology,'
        + ' under the supervision of Professor <b>Andreas S. Andreou</b> in the context of the course "Software Technology Work and Professional Practice" of'
        + ' the degree of Computer Engineering and Information Technology.' +
        '<br><br>Copyright © Cyprus University of Technology ',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      heightAuto: false,
    })
  }

  const navigate = useNavigate();
  return (
    <div className="homefooter">
      <div className="container">
        <div className="homefooter-row">
          <div className="homefooter-col">
            <h4>Restaurant</h4>
            <p onClick={() => navigate("/aboutus")}>About us</p>
            <p onClick={() => navigate("/terms")}>Terms and Conditions</p>
          </div>
          <div className="homefooter-col">
            <h4>Get Help</h4>
            <p onClick={() => navigate("/contact")}>Contact Us</p>
            <p onClick={() => navigate("/faq")}>FAQ</p>
          </div>
          <div className="homefooter-col">
            <h4>Other</h4>
            <p onClick={() => navigate("/privacy")}>Privacy Policy</p>
            <p onClick={madeby}>Developed By</p>

          </div>
          <div className="homefooter-col">
            <h4>Follow Us</h4>
            <div className="float-sm-left float-lg-center">
              <FontAwesomeIcon icon="fa-brands fa-facebook" className="social-links" id="facebook" onClick={() => window.location = "https://www.facebook.com/homeofstreetfood"} />
              <FontAwesomeIcon icon="fa-brands fa-instagram" className="social-links" id="instagram" onClick={() => window.location = "https://www.instagram.com/host_larnaca/"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
