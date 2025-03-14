// import React from "react";
// import { Paper, Box, Typography } from "@mui/material";

// interface UBReplyCardProps {
//   text: string;
//   sender: string;
//   time: string;
// }

// export const UBReplyCard: React.FC<UBReplyCardProps> = ({ text, sender, time }) => {
//   return (
//     <Paper
//       sx={{
//         background: "rgb(223, 223, 223)",
//         display: "flex",
//         alignSelf: "flex-start",
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
//           left: "-1.25rem",
//           borderTopLeftRadius: ".5rem",
//           borderTopColor: "rgb(223, 223, 223)",
//         },
//       }}
//     >
//       <Typography
//         color={"black"}
//         sx={{
//           fontSize: "1rem",
//         }}
//       >
//         {text}
//       </Typography>
//       <Typography
//         color={"gray"}
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
// export default UBReplyCard;
