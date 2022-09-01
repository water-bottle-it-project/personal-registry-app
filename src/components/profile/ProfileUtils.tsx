// convert firebase auth string output of dates into date tuple (list ig)
export function stringToDate(dateString: any) {
  if (dateString == undefined) {
    return [1, 1, 2001];
  }
  const inputArray = dateString.split(' ');

  const day = inputArray[1];
  const month = new Date(inputArray[2] + '-1-01').getMonth() + 1;
  const year = inputArray[3];

  return [day, month, year];
}

// convert tuple (d,m,y) into string for display
export function tupleToString(dateTuple: any) {
  const dateSep = '/';
  if (dateTuple == undefined) {
    return '';
  }
  return dateTuple[0] + dateSep + dateTuple[1] + dateSep + dateTuple[2];
}
