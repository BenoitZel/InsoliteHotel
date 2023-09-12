
//INPUT MODELS FOR FORM NEW USER
export const userInputs = [
  {
    id: "username",
    label: "Nom d'utilisateur",
    type: "text",
    placeholder: "Tintin",
  },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "tintin@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "0663783782",
  },
  {
    id: "password",
    label: "Mod de passe",
    type: "password",
  },
  {
    id: "country",
    label: "Pays",
    type: "text",
    placeholder: "France",
  },
  {
    id: "city",
    label: "Ville",
    type: "text",
    placeholder: "Villeneuve-Loubet",
  },
];

//INPUT MODELS FOR FORM NEW HOTEL
export const hotelInputs = [
  {
    id: "name",
    label: "Nom",
    type: "text",
    placeholder: "Mon hotel",
  },
  {
    id: "type",
    label: "Type",
    type: "text",
    placeholder: "EcoLodge",
  },
  {
    id: "city",
    label: "Ville",
    type: "text",
    placeholder: "Villeneuve-Loubet",
  },
  {
    id: "address",
    label: "Adresse",
    type: "text",
    placeholder: "50 Rue Tartenpion",
  },
  {
    id: "distance",
    label: "Distance des commerces",
    type: "text",
    placeholder: "500",
  },
  {
    id: "title",
    label: "Titre de votre annonce",
    type: "text",
    placeholder: "Le meilleur hotel",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "Description",
  },
  {
    id: "cheapestPrice",
    label: "Prix de la chambre minimum",
    type: "text",
    placeholder: "100",
  },
];

//INPUT MODELS FOR FORM NEW ROOM
export const roomInputs = [
  {
    id: "title",
    label: "Titre",
    type: "text",
    placeholder: "Chambre de charme dans une roulotte cosie",
  },
  {
    id: "desc",
    label: "Description",
    type: "text",
    placeholder: "1 lit King Size.",
  },
  {
    id: "price",
    label: "Prix",
    type: "number",
    placeholder: "100",
  },
  {
    id: "maxPeople",
    label: "Personnes max",
    type: "number",
    placeholder: "2",
  },
];