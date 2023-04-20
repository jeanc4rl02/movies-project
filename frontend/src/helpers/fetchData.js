import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "https://atm-production.up.railway.app/api/v1";

/**
 * Esta funcion realiza una solicitud HTTP utilizando axios.
 *
 * Ejemplo url - ruta: "/users".
 *
 * Ejemplo url - completa: "http://localhost:3000/users".
 * @param {string} url -  La ruta del endpoint al que se enviará la solicitud , si le pasas la url completa en este parametro se usara como endpoint
 * @param {string} method - El método HTTP utilizado para la solicitud (get, post, etc.), por defecto usa "get"
 * @param {Object{}} data - Los datos que se enviarán con la solicitud, por defecto es un obj vacio.
 * @returns {Promise<Object>} - Data retornada si la peticion es exitosa!.
 * @throws {Error} - Es un Error disparado, si la solicitud falla.
 */
const fetchData = async (url, method = "get", data = {}) => {
  const options = {
    url: url.includes("http") ? url : `${baseURL}${url}`,
    method,
    data,
    headers: {
      "Content-Type": "application/json",
      "x-access-token": `${localStorage.getItem("token")}`,
    },
  };
  try {
    const { data } = await axios(options);
    console.log("successful request");
    return data;
  } catch (error) {
    console.log(error);
    Swal.fire("Error", `${error.response.data.message}`, "error");
  }
};

export default fetchData;