import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminHome = () => {

  return (

    <div className="homeAdmin">
      <AdminSidebar />
      <div className="homeContainerAdmin">
        <div className="homeTitle">
          <span>InsoliteHotel</span> <br />
          <div className="homeDesc">
            Bonjour et bienvenue sur votre espace pro InsoliteHotel !
            Cet espace vous permettra d'ajouter votre hotel ainsi que vos chambres. N'hésitez pas à nous contacter en cas de péobléme grace à notre formulaire de contact sur le site InsoliteHotel
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
