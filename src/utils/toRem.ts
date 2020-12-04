/**
 * Convert pixels to rem.
 * @param  {String|Number} pxValue value in pixel unit
 * @return {String}                value in rem unit
 */
function convertToRem(pxValue: number, base: number = 16): string {
  return pxValue / base + 'rem';
}

/**
 * Convert a sequence of pixel values to rem values.
 * @param  {String|Number} pxValues values in px unit
 * @return {String}                 values in rem unit
 */
function rem(pxValues: number | string): string {
  const remValues = String(pxValues).split(' ');
  const resultArr: string[] = remValues.map((value: string | number) => {
    const input: number = typeof value === 'string' ? parseFloat(value) : value;
    return convertToRem(input);
  });
  return resultArr.join(' ');
}

export default rem;
