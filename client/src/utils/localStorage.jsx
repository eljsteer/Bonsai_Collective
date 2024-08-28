

////------ Function to retrieve saved Bonsai ------>>
// export const getSavedBonsaiIds = () => {
//   const savedBonsaiIds = localStorage.getItem("saved_bonsai")
//   ? JSON.parse(localStorage.getItem("saved_bonsai"))
//   : [];

//   return savedBonsaiIds;
// };

////------ Function to save Bonsai by Id ------>>
// export const saveBonsaiIds = (bonsaiIdArr) => {
//   if (bonsaiIdArr.length) {
//   localStorage.setItem("saved_bonsai", JSON.stringify(bonsaiIdArr));
//   } else {
//       localStorage.removeItem("saved_bonsai");
//   }
// };

////------ Function to retrieve Products ------>>
export const getSavedCartProducts = () => {
  const savedCartProducts = localStorage.getItem("userCartArray")
  ? JSON.parse(localStorage.getItem("uesrCartArray"))
  : [];

  return savedCartProducts;
};

