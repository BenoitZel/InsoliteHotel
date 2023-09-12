import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../components/context/AuthContext';
import axios from 'axios';

const Login = () => {

    //STATE FOR ID
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    //USECONTEXT REACT HOOK - AUTHCONTEXT -TAKE AUTH DATAS AND DISPATCH ON APPLICATION
    const { dispatch } = useContext(AuthContext);

    //OVERRIDE PREVIOUS CREDENTIALS STATE
    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }

    //SUBMIT WITH USECONTEXT - LOGIN START -> AXIOS POST -> LOGIN SUCCESS -> DETAILS INTO LOCAL STORAGE -> NAVIGATE HOME
    //                                                   -> LOGIN FAILURE -> ERROR
    const handleClick = async (e) => {
        e.preventDefault();
        //SET ERRORS TO 0 WHEN LOGIN
        setErrors({});
        const { username, password } = credentials;
        if (!username || !password) {
            setErrors({ message: "Tous les champs sont obligatoires." });
            return;
        }
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        dispatch({ type: "LOGIN_START" })
        try {
            const res = await axios.post("/auth/login", credentials, {
                headers: {
                    'X-CSRF-Token': csrfToken,
                },
            });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
            navigate("/");
        } catch (err) {
            if (err.response) {
                const responseData = err.response.data;
                const errorMessages = responseData.errors || { message: "Une erreur s'est produite lors de la connexion." };
                setErrors(errorMessages);
            }
        }
    };

    return (
        <div className="login">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="logo">InsoliteHotel</span>
            </Link>
            <div className="lContainer">
                <input
                    type="text"
                    placeholder="Identifiant"
                    id="username"
                    required
                    className="lInput"
                    onChange={handleChange} />
                {errors.username && <span className="error">{errors.username}</span>}

                <input
                    type="password"
                    placeholder="Mot de passe"
                    id="password"
                    className="lInput"
                    onChange={handleChange} />
                {errors.password && <span className="error">{errors.password}</span>}
                <button onClick={handleClick} className="lButton">Se connecter</button>
                {errors.message && <span className="error">{errors.message}</span>}
            </div>
        </div>
    );
};

export default Login;