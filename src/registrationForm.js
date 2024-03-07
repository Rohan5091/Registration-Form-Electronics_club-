import React, { useState, useRef } from "react";
import qr from "./website/main-photo/qr.jpg"
import axios from "axios"


function RegistrationForm() {
  const formRef = useRef(null);
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbzhqwFLKY84zw_YXp3xF8RKnvFuy457eioGLsTJMFtn099I1DsqMpkTMKX-c-GYeBdZmA/exec";
  const [openForm, setOpenForm] = useState(true);
  const [isChecked1, setIsChecked1] = useState(true);
  const [isChecked2, setIsChecked2] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);

 
  const regex = /^\d{4}[A-Z]{2}\d{6}$/;

  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setIsChecked1(true);
      setIsChecked2(false);
    } else {
      setIsChecked1(false);
      setIsChecked2(true);
    }
  };
  const [formData, setFormData] = useState({
    tLName: "",
    tLEnrollmentno: "",
    p2name: "",
    p3name: "",
    p4name: "",
    p4Enroll: "",
    p2Enroll: "",
    p3Enroll: "",
    p2mobileno: "",
    p3mobileno: "",
    p4mobileno: "",
    teamName: "",
    email: "",
    college: "",
    major: "",
    year: "",
    branch: "",
    monumber: "",
    payment:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;
    // if (["tLEnrollmentno", "p2Enroll", "p3Enroll", "p4Enroll"].includes(name)) {
    //     if (!value.match(regex)) {
    //         console.log("Incorrect Enrollment No");
    //         updatedValue = ""; // Reset the value if it doesn't match the regex
    //     }
    // }
    setFormData(prevState => ({ ...prevState, [name]: updatedValue }));
};

   
  const handleImageUpload = async (e) => {
    try {
        e.preventDefault();
        const present_key = "Rohan5091";
        const cloud_name = "dka8ozyqn";
        const uploadedImage = e.target.files[0];
        if (uploadedImage) {
            const ImageData = new FormData();
            ImageData.append("file", uploadedImage);
            ImageData.append("upload_preset", present_key);
            const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, ImageData);
            console.log(res.data.secure_url);
            setFormData(prevState => ({ ...prevState, payment:res.data.secure_url}));
            setImageUploaded(true); // Set imageUploaded state to true
        }
    } catch (error) {
        console.log("Error uploading image:", error.message);
    }
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      console.log(formData);
      
      setOpenForm(false); // Close the form
       const Form= new FormData(formRef.current)
       Form.append("payment",formData.payment)
      await axios.post(scriptUrl,Form);
      console.log("SUCCESSFULLY SUBMITTED");
  } catch (error) {
      console.error("Error submitting form:", error);
  }
};


  return (
    <>
      {openForm && (
        <>
          <div className="container registration-form">
            <h2>Electronics Club Registration</h2>
            <form ref={formRef} onSubmit={handleSubmit} name="google-sheet">
              <div className="form-group">
                <label>Name:</label>
                <input
                  required
                  type="text"
                  name="tLName"
                  className="form-control"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  required
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Enrollment No. :</label>
                <input
                  size={12}
                  required
                  type="text"
                  name="tLEnrollmentno"
                  className="form-control"
                  value={formData.tLEnrollmentno}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>College:</label>
                <input
                  required
                  type="text"
                  name="college"
                  className="form-control"
                  value={formData.college}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Major/Degree:</label>
                <input
                  required
                  type="text"
                  name="major"
                  className="form-control"
                  value={formData.major}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Year:</label>
                <select
                  required
                  name="year"
                  className="form-control"
                  value={formData.year}
                  onChange={handleChange}
                >
                  <option value="">Select Year</option>
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Forth Year">Forth Year</option>
                </select>
              </div>
              <div className="form-group">
                <label>Branch:</label>
                <input 
                  required
                  type="text"
                  name="branch"
                  className="form-control"
                  value={formData.branch}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Contact No.(Whatsapp) :</label>
                <input 
                  size={10}
                  required
                  type="number"
                  name="monumber"
                  className="form-control"
                  value={formData.monumber}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <div>
                  <label>
                    <input 
                      className="participation"
                      type="radio"
                      checked={isChecked1}
                      onChange={() => handleCheckboxChange(1)}
                    />
                    {"  "} Individual Participantion
                  </label>
                  <br />
                  <label>
                    <input
                      className="participation"
                      type="radio"
                      checked={isChecked2}
                      onChange={() => handleCheckboxChange(2)}
                    />
                    {"  "} Team Participantion
                  </label>
                </div>
              </div>

             { !isChecked1 &&  ( 
              <>
             <div className="form-group">
                <label>Team Name :</label>
                <input 
                  required
                  type="text"
                  name="teamName"
                  className="form-control"
                  value={formData.teamName}
                  onChange={handleChange}
                ></input>
              </div>
             <div className="form-group">
                <label>2nd Participant Name :</label>
                <input
                  required
                  type="text"
                  name="p2name"
                  className="form-control"
                  value={formData.p2name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Enrollment no. :</label>
                <input 
                  required
                  size={12}
                  type="text"
                  name="p2Enroll"
                  className="form-control"
                  value={formData.p2Enroll}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Mobile no. :</label>
                <input 
                  required
                  size={10}
                  type="number"
                  name="p2mobileno"
                  className="form-control"
                  value={formData.p2mobileno}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>3rd Participant Name :</label>
                <input 
                  required
                  type="text"
                  name="p3name"
                  className="form-control"
                  value={formData.p3name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Enrollment no. :</label>
                <input
                  required
                  size={12}
                  type="text"
                  name="p3Enroll"
                  className="form-control"
                  value={formData.p3Enroll}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Mobile no. :</label>
                <input
                  required
                  size={10}
                  type="number"
                  name="p3mobileno"
                  className="form-control"
                  value={formData.p3mobileno}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>4th Participant Name :</label>
                <input
                  required
                  type="text"
                  name="p4name"
                  className="form-control"
                  value={formData.p4name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Enrollment no. :</label>
                <input
                  required
                  size={12}
                  type="text"
                  name="p4Enroll"
                  className="form-control"
                  value={formData.p4Enroll}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="form-group">
                <label>Mobile no. :</label>
                <input
                  required
                  size={10}
                  type="number"
                  name="p4mobileno"
                  className="form-control"
                  value={formData.p4mobileno}
                  onChange={handleChange}
                ></input>
              </div>
              </> 
              )}
              <div className="form-group imgdiv">
                <label>Scan QR for payment</label>
                <img className="qrImage" src={qr} alt="qr" />
              </div>
              <div className="form-group">
                <label>Submit payment screenshort :</label>
                <input
                  required
                  type="file"
                  name="screenshort"
                  className="form-control"
                  onChange={handleImageUpload}
                ></input>
              </div>
              <button disabled={!imageUploaded} type="submit" className="btn btn-primary">
                Register
              </button>
            </form>
          </div>
        </>
      )}
      {!openForm && (
        <>
          <div className="thank-you-container">
            <h1>Thank You for Submitting Your Data</h1>
            <p>Your registration has been successfully submitted.</p>
            <p>We appreciate your interest in our college club event.</p>
            <a href="#"> Join our Whatsapp group</a>
          </div>
        </>
      )}
    </>
  );
}

export default RegistrationForm;
