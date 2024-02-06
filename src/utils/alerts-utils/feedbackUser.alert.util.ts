import Swal, { SweetAlertPosition, SweetAlertIcon } from "sweetalert2";

type Params = {
  position?: SweetAlertPosition;
  icon?: SweetAlertIcon;
  title: string;
  text?: string;
};

export const feedbackUserAlert = ({ position, icon, title, text }: Params) => {
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    text: text,
    showConfirmButton: false,
    timer: 3000,
  });
};
