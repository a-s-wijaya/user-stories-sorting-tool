function quickSort(arr, comparisonFunction) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (comparisonFunction(arr[i], pivot) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quickSort(left, comparisonFunction).concat(
    pivot,
    quickSort(right, comparisonFunction)
  );
}
export { quickSort };
