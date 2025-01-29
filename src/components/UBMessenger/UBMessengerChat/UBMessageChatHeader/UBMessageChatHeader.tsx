import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";

export const UBMessageChatHeader: React.FC = () => {
    return(
        <Box sx={{width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 20px", borderBottom: "1px solid #f1f1f1" }}>
            <img src="" alt="" />
            <Typography variant="h6">Name</Typography>
        </Box>
    )
}

export default UBMessageChatHeader;