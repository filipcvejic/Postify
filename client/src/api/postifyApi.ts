import axios from "axios";
import { toast } from "react-toastify";

export const postifyApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export const handleApiError = (error: any) => {
  console.log(error.response.data.message);
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

      toast.error(error.response.data.message);
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
