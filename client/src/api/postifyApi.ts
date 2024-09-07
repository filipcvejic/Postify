import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

export const postifyApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

interface ErrorResponse {
  status: number;
  data: string | { message?: string } | Array<{ ErrorMessage?: string }>;
}

export const handleApiError = (error: AxiosError<ErrorResponse>) => {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        if (typeof data === "string") {
          toast.error(data);
        } else if (Array.isArray(data)) {
          data.forEach((item) => {
            if (item.ErrorMessage) {
              toast.error(item.ErrorMessage);
            }
          });
        } else {
          toast.error("Greška 400");
        }
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
  } else {
    toast.error("Greška u komunikaciji sa serverom");
  }
};
