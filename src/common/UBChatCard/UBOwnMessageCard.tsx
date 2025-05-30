// import React from "react";
// import { Paper, Typography } from "@mui/material";

// interface UBOwnMessageCardProps {
//   text: string;
//   time?: string; // Optional time for messages
// }

// export const UBOwnMessageCard: React.FC<UBOwnMessageCardProps> = ({ text, time = "4:59" }) => {
//   return (
//     <Paper
//       sx={{
//         backgroundColor: "rgb(108, 55, 119)",
//         display: "flex",
//         alignSelf: "flex-end",
//         maxWidth: "60%",
//         textAlign: "start",
//         padding: ".35rem .8rem",
//         flexDirection: "column",
//         borderRadius: ".625rem",
//         position: "relative",
//         "&::after": {
//           content: '" "',
//           border: "20px solid transparent",
//           position: "absolute",
//           top: 0,
//           right: "-1.25rem",
//           borderTopRightRadius: ".5rem",
//           borderTopColor: "rgb(108, 55, 119)",
//         },
//       }}
//     >
//       <Typography sx={{ color: "white", fontSize: "1rem" }}>{text}</Typography>
//       <Typography
//         color={"rgb(209, 209, 209)"}
//         sx={{
//           fontSize: ".85rem",
//           display: "flex",
//           alignSelf: "flex-end",
//         }}
//       >
//         {time}
//       </Typography>
//     </Paper>
//   );
// };

// export default UBOwnMessageCard;
