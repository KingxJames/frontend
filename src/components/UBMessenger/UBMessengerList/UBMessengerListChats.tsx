import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import UBMessengerListAnonymous from "./UBMessengerListAnonymous"; // Import the anonymous list
import Avatar from "../../../image/avatar.png";
import Typography from "@mui/material/Typography";
import { UBMessengerListEmergencyChat } from "./UBMessengerListEmergencyChat";
import Grid from "@mui/material/Grid";

export const UBMessengerListChats: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<
    "chats" | "anonymous" | "emergencies"
  >("chats"); // Track active tab
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const users = [
    { id: 1, name: "John Doe", message: "messasasdf", time: "2:30 PM" },
    { id: 2, name: "Jane Doe", message: "hello world", time: "3:00 PM" },
    { id: 3, name: "Alice Smith", message: "how are you?", time: "4:15 PM" },
  ];

  const handleUserClick = (id: number) => {
    setSelectedUserId(id);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {/* Tabs for switching views */}
      <Box
        sx={{
          padding: "2% 2% 2% 2%",
        }}
      >
        <Grid container spacing={2} justifyContent="space-evenly">
           {/* Ensures equal spacing between buttons */}
          <Grid item xs={4} sm={4} md={4}>
          
            {/* Ensures buttons take up equal space */}
            <Button
              onClick={() => setSelectedTab("chats")}
              variant={selectedTab === "chats" ? "contained" : "outlined"}
              fullWidth // Makes the button take up full width within the grid item
            >
              All
            </Button>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button
              onClick={() => setSelectedTab("anonymous")}
              variant={selectedTab === "anonymous" ? "contained" : "outlined"}
            >
              Anonymous
            </Button>
          </Grid>
          <Grid item xs={4} sm={4} md={4}>
            <Button
              onClick={() => setSelectedTab("emergencies")}
              variant={selectedTab === "emergencies" ? "contained" : "outlined"}
            >
              Emergencies
            </Button>
          </Grid>
        </Grid>
      </Box>

      {/* Conditionally render based on selected tab */}
      {selectedTab === "chats" ? (
        <Box sx={{ backgroundColor: "#ffffff", borderRight: "1px solid #ddd" }}>
          <Box>
            {users.map((user) => (
              <Box
                key={user.id}
                onClick={() => handleUserClick(user.id)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5% 7% 0% 5%",
                  borderBottom: "1px solid #ddd",
                  cursor: "pointer",
                  transition: "background-color 0.3s, box-shadow 0.3s",
                  backgroundColor:
                    user.id === selectedUserId ? "#e7e7e7" : "#f9f9f9",
                  "&:hover": {
                    backgroundColor:
                      user.id === selectedUserId ? "#f9f9f9" : "#f9f9f9",
                    boxShadow: "0 4px 8px rgba(85, 84, 84, 0.1)",
                  },
                }}
              >
                <img
                  src={Avatar}
                  alt="Profile"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "50%",
                    marginRight: 16,
                    marginTop: "-7%",
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ marginBottom: "0.5%" }}>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.message}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ position: "relative", bottom: "50px", left: "80%" }}
                  >
                    {user.time}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      ) : selectedTab === "anonymous" ? (
        <UBMessengerListAnonymous />
      ) : (
        <UBMessengerListEmergencyChat />
      )}
    </Box>
  );
};

export default UBMessengerListChats;
