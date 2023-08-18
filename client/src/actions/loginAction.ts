import { axiosInstance } from "../auth.ts/axiosInstance";

export interface loginActionProps {
  request: Request;
}
export const loginAction = async ({ request }: loginActionProps) => {
  try {
    const formData = await request.formData();

    const extractFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    console.log(extractFormData);
    const req = await axiosInstance({
      method: "post",
      url: "auth/login",
      data: extractFormData,
    });
    const res = req.data;
    return null;
  } catch (error) {
    throw new Error();
  }
};
