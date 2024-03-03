import { axiosInstance } from "../../axios/axiosInstance";
import { AxiosError } from "axios";
import { errorAlert } from "../../utils/errorAlert";

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
    console.log(resp);
    if (resp.type === "error" && resp.operational) {
      errorAlert(resp.message);
      return null;
    } else if (resp.error || resp.operational == false) {
      errorAlert(resp.message);
      return null;
    } else {
      return (window.location.href = "/confirm-otp");
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.log(axiosError.response.data);
      errorAlert(axiosError.response.data?.message);
      return { error: axiosError.response.data };
    }
    if (axiosError.request) {
      errorAlert(axiosError.request.message);
      return { error: axiosError.request };
    } else {
      errorAlert("something went wrong");
      return { error: "something went wrong" };
    }
  }
};
