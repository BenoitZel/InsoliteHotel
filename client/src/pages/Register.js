import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {

  const [info, setInfo] = useState({})
  const [errors, setErrors] = useState({});

  const navigate = useNavigate()

  //OVERRIDE PREVIOUS INFO STATE
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  //SUBMIT REGISTER
  const handleClick = async (e) => {
    e.preventDefault();
    //SET ERRORS TO 0 WHEN REGISTER
    setErrors({});
    if (!info.username || !info.email || !info.password) {
      setErrors({ message: "Tous les champs sont obligatoires." });
      return;
    }
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    try {
      const newUser = { ...info };
      const response = await axios.post("/auth/register", newUser, {
        headers: {
          'X-Csrf-Token': csrfToken,
        },
      })
      navigate("/login")
    } catch (err) {
      if (err.response) {
        const responseData = err.response.data;
        const errorMessages = responseData.errors || { message: "Une erreur s'est produite lors de l'enregistrement." };
        setErrors(errorMessages);
      }
    }
  }

  //INPUTS FOR FORM REGISTER
  const userInputs = [
    {
      id: "username",
      type: "text",
      placeholder: "Nom",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Email",
    },
    {
      id: "phone",
      type: "text",
      placeholder: "Téléphone",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Mot de passe",
    },
    {
      id: "country",
      type: "text",
      placeholder: "Pays",
    },
    {
      id: "city",
      type: "text",
      placeholder: "Ville",
    },
  ];

  return (
    <div className="register">
      <Link to="/" style={{ textDecoration: "none" }}>
        <span className="logo">InsoliteHotel</span>
      </Link>
      {/* MAP ON INPUTS */}
      <div className="lContainer">
        {userInputs.map((input) => (
          <div className="formInput" key={input.id}>
            <input className="formInput" onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
            {errors[input.id] && <span className="error">{errors[input.id]}</span>}
          </div>
        ))}
        <button onClick={handleClick} className='lButton'>Envoyer</button>
        {errors.message && <span className="error">{errors.message}</span>}
      </div>
    </div>
  );
};

export default Register;