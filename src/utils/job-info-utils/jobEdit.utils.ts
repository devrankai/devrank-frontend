interface Props {
  arrayInJSONFormat: string;
  key: string;
}

export const parseJobEdit = ({ arrayInJSONFormat, key }: Props): string[] => {
  const parseArray = JSON.parse(arrayInJSONFormat);

  return parseArray.map((data: { [key: string]: any }) => data[key].toString());
};
