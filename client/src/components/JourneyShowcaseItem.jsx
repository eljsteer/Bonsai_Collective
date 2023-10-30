// import { useState } from 'react';
// import JourneysData from "../utils/journeysData.json"

// const [side, setSide] = useState("leftSide")

// const numRandomBonzaiChapters = () => {
//   const numBonzaiDB = JourneysData.length
//   const randomInt = Math.floor(Math.random() * numBonzaiDB);
//   const chapters = JourneysData[randomInt].chapers;
//   return chapters;
// }

// let numChapters  = numRandomBonzaiChapters();

// function JourneyShowcaseItem() {
//   if
//         {numChapters.forEach((chapters) => {
//     if(side === "leftSide") {
//       <Grid key={chapters.chapterId}>
//         <Box container="true" sx={{ flexGrow: 1 }}>
//           <Grid  sx={{display:"flex", alignItems: "center", flexDirection:"row"}}>
//             <Grid item="true" xs={6} md={8}>
//               <img  src={JourneyImageURL} />
//             </Grid>
//             <Grid item xs={6} md={8}>
//               <Item>
//                 <p>{chapters.text}</p>
//               </Item>
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//     setSide = "rightSide"
//     } else if(side === "rightSide") {
//       <Grid key={chapters.chapterId}>
//         <Box container="true" sx={{ flexGrow: 1 }}>
//           <Grid  sx={{display:"flex", alignItems: "center", flexDirection:"row"}}>
//             <Grid item xs={6} md={8}>
//               <Item>
//                 <p>{chapters.text}</p>
//               </Item>
//             </Grid>
//             <Grid item="true" xs={6} md={8}>
//               <img  src={JourneyImageURL} />
//             </Grid>
//           </Grid>
//         </Box>
//       </Grid>
//     } 
//   })}