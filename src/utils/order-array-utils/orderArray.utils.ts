export const sortDescending = (array: any, orderBy: string) =>
  array.sort((a: any, b: any) => {
    return b[orderBy] - a[orderBy];
  });
