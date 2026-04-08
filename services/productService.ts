import axios from "axios";

const api = axios.create({
    baseURL: "https://api.escuelajs.co/api/v1",
});

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};