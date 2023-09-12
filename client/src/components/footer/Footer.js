import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Footer = () => {

  // OPEN-CLOSE MODAL
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [errors, setErrors] = useState({});

  //USEREF REACT HOOK - TAKE DATAS FORM REFERENCES (USE IN SENDMAIL)
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    try {
      emailjs
        .sendForm(
          'service_8eopacl',
          'template_ic5v5rq',
          form.current,
          process.env.REACT_APP_ID,
          setOpen(true)
        )
    } catch (errors) {
      console.error("Une erreur s'est produite lors de l'envoi de ce mail", errors);
      setErrors("Une erreur s'est produite lors de l'envoi de ce mail, veuillez réessayer'");
    }
  };

  return (
    <div className='footerM'>
      <div className='mail'>
        <h1 className="mailTitle">Vous souhaitez mettre des annonces en ligne ?</h1>
        <span className="mailDesc">Envoyez nous un message et nous vous tiendrons informés.</span>
        <div className="mailInputContainer">

          {/* FORM */}
          <form id="form" ref={form} onSubmit={sendEmail}>
            <label>Nom</label>
            <input
              type="text"
              name="name"
              required
              autoComplete='off'
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              required
              autoComplete='off'
            />
            <div className="textarea">
              <label>Message</label>
            </div>
            <textarea name="message" />
            <input
              className="button"
              type="submit"
              value="Envoyer"
              required
              autoComplete='off'
            />

            {/* MODAL */}
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Merci pour votre message !
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Nous vous recontacterons trés prochainement.
                  N'oubliez pas de vous inscrire ! Cela facilitera la mise en place de votre espace.
                </Typography>
              </Box>
            </Modal>
          </form>
        </div>
      </div>

      {/* ADDRESS */}
      <div className="logoFooter">
        <h3>InsoliteHotel</h3>
      </div>
      <div className="adressFooter">
        <p>InsoliteHotel</p>
        <p>17 Rue Auguste Escoffier</p>
        <p>Villeneuve Loubet</p>
        <p>France</p>
        <p href="mailto:benoit.zel@gmail.com">benoit.zel@gmail.com</p>
      </div>
    </div>
  );
}

export default Footer;









//useref -> recupére les valeurs passées dans les input lors de l'événement onsubmit dans la balise form
//<form ref={form} onSubmit{sendEmail} -> le ref envoi toutes les valeurs au useref au submit
//form.current recupére les name/email/message

//useref equivalent de e.target.value  mais on peut l'utiliser pour récupérer la/les valeurs de un ou plusieurs input en méme temps

//sendform ->méthode de emailJs
// on parametre le .sendform en remplacant par les identifiants
// .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
//.sendForm('service_8eopacl', 'template_ic5v5rq', form.current, 'TvGXnx07Aiubo2WpG')

//form.current.reset();  remet le formulaire à zero une fois le result validé
//UN PARENT UNIQUE PAR COMPOSENT -> UNE DIV

//cacher une donnée sensible 
// on crée un fichier .env à la racine du projet 
// on crée une variable avec la donnée sensible dedans -> REACT_APP_ID= TvGXnx07Aiubo2WpG  !!! toujours REACT_APP_   puis NOM ou autre
// on remplace le 'TvGXnx07Aiubo2WpG'   par   process.env.REACT_APP_ID



//useref -> recupére les valeurs passées dans les input lors de l'événement onsubmit dans la balise form
//<form ref={form} onSubmit{sendEmail} -> le ref envoi toutes les valeurs au useref au submit
//form.current recupére les name/email/message

//useref equivalent de e.target.value  mais on peut l'utiliser pour récupérer la/les valeurs de un ou plusieurs input en méme temps

//sendform ->méthode de emailJs
// on parametre le .sendform en remplacant par les identifiants
// .sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form.current, 'YOUR_PUBLIC_KEY')
//.sendForm('service_8eopacl', 'template_ic5v5rq', form.current, 'TvGXnx07Aiubo2WpG')

//form.current.reset();  remet le formulaire à zero une fois le result validé
//UN PARENT UNIQUE PAR COMPOSENT -> UNE DIV

//cacher une donnée sensible 
// on crée un fichier .env à la racine du projet 
// on crée une variable avec la donnée sensible dedans -> REACT_APP_ID= TvGXnx07Aiubo2WpG  !!! toujours REACT_APP_   puis NOM ou autre
// on remplace le 'TvGXnx07Aiubo2WpG'   par   process.env.REACT_APP_ID
