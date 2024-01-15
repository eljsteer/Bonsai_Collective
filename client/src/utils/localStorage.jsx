

// // function to retrieve saved Bonzai 
// export const getSavedBonzaiIds = () => {
//   const savedBonzaiIds = localStorage.getItem("saved_bonzai")
//   ? JSON.parse(localStorage.getItem("saved_bonzai"))
//   : [];

//   return savedBonzaiIds;
// };

// // function to save projects by Id
// export const saveBonzaiIds = (bonzaiIdArr) => {
//   if (bonzaiIdArr.length) {
//   localStorage.setItem("saved_bonzai", JSON.stringify(bonzaiIdArr));
//   } else {
//       localStorage.removeItem("saved_bonzai");
//   }
// };

// function to retrieve  Products 
export const getSavedCartProducts = () => {
  const savedCartProducts = localStorage.getItem("userCartArray")
  ? JSON.parse(localStorage.getItem("uesrCartArray"))
  : [];

  return savedCartProducts;
};

