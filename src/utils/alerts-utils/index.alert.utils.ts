import { feedbackUserAlert } from "./feedbackUser.alert.util";
import { userConfirmAlert } from "./userConfirm.alert.util";

type alertType = "feedback" | "confirm";

type Params = {
  type: alertType;
  params?: { [key: string]: any };
};

export const alertFactory = ({ type, params }: Params) => {
  switch (type) {
    case "feedback":
      return feedbackUserAlert({
        position: params?.position || "top-end",
        icon: params?.icon || "success",
        title: params?.title,
        text: params?.text || "",
      });
    case "confirm":
      return userConfirmAlert({
        titleText: params?.titleText || "Confirma",
        cancelButtonText: params?.cancelButtonText || "Cancel",
        confirmButtonText: params?.confirmButtonText || "Confirm",
      });
    default:
      throw new Error("Invalid alert type");
  }
};
