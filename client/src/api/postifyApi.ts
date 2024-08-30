import axios from "axios";
import { cookies } from "next/headers";
import { toast } from "react-toastify";
import { getCookie } from "react-use-cookie";

console.log(getCookie("jwt"));

export const postifyApi = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${cookies().get("jwt")}`,
  },
});

export const handleApiError = (error: any) => {
  switch (error.response.status) {
    case 400:
      if (!error.response.data) {
        toast.error("Greška 400");
        return;
      }

      if (Array.isArray(error.response.data)) {
        error.response.data.forEach(
          (item: any) => item.ErrorMessage && toast.error(item.ErrorMessage)
        );
        return;
      }

      toast.error(error.response.data);
      return;
    case 401:
      toast.error("Niste autentikovani");
      return;
    case 403:
      toast.error("Nemate pravo pristupa");
      return;
    case 404:
      toast.error("Nije pronađeno");
      return;
    case 500:
      toast.error("Greška na serveru");
      return;
    default:
      toast.error("Greška");
      return;
  }
};
