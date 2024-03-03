export const copyNumberWithCharactersUtils = (
  text: string,
  amountCharacter: number
) => {
  if (text.length === amountCharacter && /^\d+$/.test(text)) {
    return text.trim().split("");
  } else {
    throw new Error("Must be a six characters number");
  }
};
