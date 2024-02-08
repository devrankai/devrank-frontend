export const capitalizeFirstLetterOfEachWord = (inputString: string): string =>  {
  const words = inputString.split(' ');
  const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  const result = capitalizedWords.join(' ');

  return result;
}