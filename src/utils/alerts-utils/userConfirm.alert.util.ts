import Swal from "sweetalert2";

type Params = {
  titleText?: string;
  cancelButtonText?: string;
  confirmButtonText?: string;
};

const userConfirm = ({
  titleText,
  cancelButtonText,
  confirmButtonText,
}: Params) => {
  return Swal.fire({
    title: titleText,
    showCancelButton: true,
    cancelButtonColor: "#CD1812",
    cancelButtonText: cancelButtonText,
    confirmButtonText: confirmButtonText,
    confirmButtonColor: "#0067CA",
    icon: "question",
  }).then((result) => {
    if (result.isConfirmed) return true;
  });
};

export const userConfirmAlert = async ({
  titleText,
  cancelButtonText,
  confirmButtonText,
}: Params) =>
  await userConfirm({ titleText, cancelButtonText, confirmButtonText });
