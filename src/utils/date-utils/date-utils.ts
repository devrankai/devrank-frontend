import dayjs from "dayjs";

/**
 * Convert date at Unix format to a string with the format YYYY-MM-DD
 */
export const convertUnixToStringFormatYYYYMMDD = (unixDate: number): string => {
  const dateFormat = dayjs.unix(unixDate).format("YYYY-MM-DD");
  return dateFormat;
};

/**
 * Convert a string with the format YYYY-MM-DD to date Unix format
 */
export const convertStringFormatYYYYMMDDToUnix = (date: string): number => {
  const dateFormat = dayjs(date).unix();
  return dateFormat;
};

/**
 * Convert a full date to string format YYYY-MM-DD
 */
export const convertDateToStringFormatYYYYMMDD = (date: Date): string => {
  const dateFormat = dayjs(date).format("YYYY-MM-DD");
  return dateFormat;
};

/**
 * Convert a date in format YYYY-MM-DD to MM/DD/YYYY
 * @param date
 * @returns a date at format MM/DD/YYYY
 */
export const convertYYYYMMDDToMMDDYYYY = (date: Date): string => {
  const dateFormat = dayjs(date, { format: "YYYY-MM-DD" }).format("MM/DD/YYYY");
  return dateFormat;
};

/**
 * Convert a full date to string format DD/MM/YYYY
 */
export const convertDateToStringFormatDDMMYYYY = (date: Date): string => {
  const dateFormat = dayjs(date).format("DD/MM/YYYY");
  return dateFormat;
};

export const convertTimestampDateToDateFormatMMDDYYYY = (
  timestampDate: number
): string => {
  const date = new Date(timestampDate);
  const formattedDate = dayjs(date).format("MM/DD/YYYY");

  return formattedDate;
};

export const getDayMonthYEarForCandidate = (): string =>  {
  const dateNow = dayjs();
  const day = dateNow.format('DD');
  const month = dateNow.format('MMM');
  const year = dateNow.format('YYYY');

  return `${day}, ${month}, ${year}`;
}