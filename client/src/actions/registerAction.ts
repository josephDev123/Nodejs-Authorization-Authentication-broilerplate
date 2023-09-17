import { axiosInstance } from "../auth.ts/axiosInstance";
import { AxiosError } from "axios";
import { errorAlert } from "../utils/errorAlert";

export interface registerActionProps {
  request: Request;
}

export const registerAction = async ({ request }: registerActionProps) => {
  try {
    const formData = await request.formData();
    const submittedFormData = {
      email: formData.get("email"),
      name: formData.get("name"),
      password: formData.get("password"),
    };
    const req = await axiosInstance({
      method: "post",
      url: "auth/register",
      data: submittedFormData,
    });

    const resp = req.data;
    if (resp.error && resp.showMessage) {
      errorAlert(resp.message);
      return resp.message;
    } else {
      console.log(resp.message);
      // localStorage.setItem("user", JSON.stringify(resp.data));
      window.location.href = "/otp";
      return null;
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      errorAlert(axiosError.response.data);
      return { error: axiosError.response.data };
    }
    if (axiosError.request) {
      errorAlert(axiosError.request);
      return { error: axiosError.request };
    } else {
      errorAlert("something went wrong");
      return { error: "something went wrong" };
    }
  }
};
