import React from "react";
import "./ContactUs.css";
import ReCAPTCHA from 'react-google-recaptcha';
import useInput from "../../hooks/use-input";
import { notEmpty, validEmail } from "../../Regex/Regex";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export default function ContactUs() {
  const captchaRef = React.useRef(null);
  const isNotEmpty = (value) => notEmpty.test(value); // isnot empty check using regex
  const isValidEmail = (value) => validEmail.test(value); // isnot empty check using regex
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetch("config/config.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const {
    value: emailValue,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isValidEmail);

  const {
    value: reasonValue,
    isValid: reasonIsValid,
    hasError: reasonHasError,
    valueChangeHandler: reasonChangeHandler,
    inputBlurHandler: reasonBlurHandler,
    reset: resetReason,
  } = useInput(isNotEmpty,"Complaint");

  const {
    value: messageValue,
    isValid: messageIsValid,
    hasError: messageHasError,
    valueChangeHandler: messageChangeHandler,
    inputBlurHandler: messageBlurHandler,
    reset: resetMessage,
  } = useInput(isNotEmpty);

  const handleMessage = (e) => {
    e.preventDefault();
    /* if(captchaRef.current.getValue())
     return; */
    const options = {
      method: "POST",
      credentials: "include",
      mode: "cors",


      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailValue,
        reason: reasonValue,
        message: messageValue
      })
    };
    fetch("/api/misc/sendmessage", options).then((res) => {
      if (res.status === 200)
        Swal.fire({
          title: "Message sent!",
          text: "We will get back to you as soon as possible!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          resetEmail("");
          resetReason("");
          resetMessage("");
        });
      else
        Swal.fire({
          title: "Error!",
          text: "Something went wrong, please try again later.",
          icon: "error",
          confirmButtonText: "OK",
        });

    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <div style={{ padding: "20px 0px 20px 0px" }}>
        <div className="contact-container">
          <div className="form-container">
            <h3>Contact Us</h3>
            <div style={{ color: "#F58C23", fontFamily: "inherit", fontWeight: "bold" }}>
              <span>Telephone: {data.phone}</span>
              <br />
              <span>Or</span>
              <br />
              <span>Send us a message:</span>
            </div>
            <form component="form" onSubmit={handleMessage}>
              <div className="form-group">
                <label htmlFor="contactemail">Your Email Address: </label>
                <input
                  type="email"
                  className="form-control"
                  id="contactemail"
                  placeholder="name@example.com"
                  value={emailValue}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                />
                <br />
                <label htmlFor="emailtype">Reason (select):  </label>
                <select
                  className="form-control"
                  id="emailtype"
                  value={reasonValue}
                  onChange={reasonChangeHandler}
                  onBlur={reasonBlurHandler}
                >
                  <option value="Complaint">Complaint</option>
                  <option value="Comment">Comment</option>
                  <option value="Question">Question</option>
                </select>
                <br />
                <label htmlFor="message">Message:</label>
                <TextField type="text" className="form-control" id="message" value={messageValue}
                 onChange={messageChangeHandler} onBlur={messageBlurHandler} multiline rows={4}
                 inputProps={{
                    maxLength: 500
                 }}/>
                    <span>
                      {`${messageValue.length} / ${
                        500
                      }`}
                    </span>
                <br />
                {/* <label htmlFor="emailimages">Attach images if needed:</label>
                <p />
                <input type="file" className="form-control-file" id="emailimages" /> */}
                <br />
                <ReCAPTCHA sitekey="6LdkZnIlAAAAAPZuEFGN2su0muH49hhlG-8ZdrYI" ref={captchaRef} />
                <br />
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="map">
            <iframe
              title="HOST_Google_Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.559754705517!2d33.625022115536225!3d34.917496079083335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e0839541b2d2b9%3A0x1316f6f8431394a!2sHOST%20home%20of%20street%20food!5e0!3m2!1sel!2s!4v1679262749376!5m2!1sel!2s"
              width={600}
              height={450}
              style={{ border: "0" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
      <script src="https://www.google.com/recaptcha/api.js"></script>
    </motion.div>
  );
}
