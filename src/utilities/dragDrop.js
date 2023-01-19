// nhận vào arr và dragResult, trả về arr mới
export const applyDrag = (arr, dragResult) => {
   const { removedIndex, addedIndex, payload } = dragResult; // removedIndex: vị trí của phần tử bị xóa, addedIndex: vị trí của phần tử được thêm vào, payload: phần tử được thêm vào
   if (removedIndex === null && addedIndex === null) return arr;

   const result = [...arr]; // tạo ra một mảng mới với các phần tử giống như mảng arr
   let itemToAdd = payload;

   if (removedIndex !== null) {
      itemToAdd = result.splice(removedIndex, 1)[0]; // splice: xóa phần tử ở vị trí removedIndex, trả về mảng chứa phần tử bị xóa
   }

   if (addedIndex !== null) {
      result.splice(addedIndex, 0, itemToAdd); // splice: thêm phần tử itemToAdd vào vị trí addedIndex
   }

   return result;
};
