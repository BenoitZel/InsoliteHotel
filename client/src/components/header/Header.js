import React, { useContext, useState } from 'react';
import { faBridgeWater, faMoon, faTree, faUserGroup, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSearch from './HeaderSearch';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    textAlign: "center",
    p: 4,
};

const Header = ({ type }) => {
    //OPEN-CLOSE MODAL
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    const [errors, setErrors] = useState({});

    //USECONTEXT REACT HOOK 
    const { user, dispatch } = useContext(AuthContext);

    //LOGOUT REMOVE TOKEN LOCALSTORAGE
    const logout = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGOUT" })
        try {
            await axios.post('/auth/logout');
            localStorage.removeItem('user');
            setOpen(true)
        } catch (error) {
            console.error("Une erreur s'est produite lors de la deconnexion", errors);
            setErrors({ message: "Une erreur s'est produite, veuillez réessayer" });
        }
    }

    return (
        <div className='header'>

            {/* HEADER ICONS */}
            <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active">
                        <FontAwesomeIcon icon={faTree} />
                        <span>Nature</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faMoon} />
                        <span>Calme</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faWater} />
                        <span>Elements</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faUserGroup} />
                        <span>Convivialité</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBridgeWater} />
                        <span>Aventures</span>
                    </div>
                </div>

                {/* HEADER PRESENTATION AND BUTTONS AUTH */}
                {type !== "list" &&
                    <>
                        <h1 className="headerTitle">À la recherche d'aventures et d'experiences ?</h1>
                        <p className="headerDescription">Ne restez pas sur des logements classiques et découvrez nos offres de logements insolites en France.</p>
                        <NavLink to={"/login"} style={{ textDecoration: "none" }}>
                            <button className="headerButton">S'identifier</button>
                        </NavLink>
                        <NavLink to={"/register"} style={{ textDecoration: "none" }}>
                            <button className="headerButton">S'enregistrer</button>
                        </NavLink>
                        <NavLink to={"/"} style={{ textDecoration: "none" }}>
                            <button onClick={logout} className="headerButton">Déconnexion</button>
                        </NavLink>
                        {(user === null || user.isAdmin === false && user.isSuperAdmin === false) ? ("") : (
                            <NavLink to={"/admin"} style={{ textDecoration: "none" }}>
                                <button className="headerButton">Espace pro</button>
                            </NavLink>
                        )}
                        {errors.message && <p className="error">{errors.message}</p>}

                        {/* MODAL LOGOUT */}
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={modalStyle}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Vous étes déconnecté.
                                </Typography>
                            </Box>
                        </Modal>

                        {/* SEARCHBAR COMPONENT */}
                        <HeaderSearch />
                    </>
                }
            </div>
        </div>
    );
};

export default Header;