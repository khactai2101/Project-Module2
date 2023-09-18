import axios from "axios";

export const getAllUsers = () => {
  return axios
    .get("http://localhost:8080/users")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};
export const getOneUser = (id: any) => {
  return axios
    .get(`http://localhost:8080/users/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};

export const deleteUser = (id: number) => {
  return axios
    .delete(`http://localhost:8080/users/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};
export const addToCart = async (data: any) => {
  return await axios
    .put(`http://localhost:8080/users/${data.id}`, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};
