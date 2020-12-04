const cloneMultiDimArray = (arr: any[][]): any[][] => {
  return arr.map((subArr: any[]) => subArr.slice());
};

export default cloneMultiDimArray;
