import axios from "axios";

export const getAllProducts = () => {
  return axios
    .get("http://localhost:8080/product")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};

export const deleteProducts = (id: number) => {
  return axios
    .delete(`http://localhost:8080/product/${id}`)
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
    });
};

export const getOneProduct = (id: any) => {
  return axios
    .get(`http://localhost:8080/product/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error!!!!", error);
      return [];
    });
};
