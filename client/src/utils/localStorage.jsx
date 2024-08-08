

// // function to retrieve saved Bonsai 
// export const getSavedBonsaiIds = () => {
//   const savedBonsaiIds = localStorage.getItem("saved_bonsai")
//   ? JSON.parse(localStorage.getItem("saved_bonsai"))
//   : [];

//   return savedBonsaiIds;
// };

// // function to save projects by Id
// export const saveBonsaiIds = (bonsaiIdArr) => {
//   if (bonsaiIdArr.length) {
//   localStorage.setItem("saved_bonsai", JSON.stringify(bonsaiIdArr));
//   } else {
//       localStorage.removeItem("saved_bonsai");
//   }
// };

// function to retrieve  Products 
export const getSavedCartProducts = () => {
  const savedCartProducts = localStorage.getItem("userCartArray")
  ? JSON.parse(localStorage.getItem("uesrCartArray"))
  : [];

  return savedCartProducts;
};

