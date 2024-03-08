import { useEffect, useState } from "react";
import { alertFactory, copyNumberWithCharactersUtils } from "../../../utils";

export const useEventListenerPaste = () => {
  const [textInArray, setTextInArray] = useState<string[] | null>(null);

  useEffect(() => {
    const handlePaste = (event: ClipboardEvent) => {
      event.preventDefault();

      const copiedText =
        event.clipboardData?.getData("text")?.slice(0, 6) || "";

      const parseNumberToNumber = +copiedText;
      const isNumber =
        !isNaN(parseNumberToNumber) && Number.isFinite(parseNumberToNumber);

      if (!isNumber || copiedText.length !== 6) {
        return alertFactory({
          type: "feedback",
          params: {
            title: "Error To Copy",
            text: "You must copy a six digit number to paste",
            icon: "error",
          },
        });
      }

      const numberInArray = copyNumberWithCharactersUtils(copiedText, 6);

      if (numberInArray.length === 0 || numberInArray.length > 6) return;

      setTextInArray(numberInArray);
    };

    document.addEventListener("paste", handlePaste);

    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, []);

  return { textInArray };
};
