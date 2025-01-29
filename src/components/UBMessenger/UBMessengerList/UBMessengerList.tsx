import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "../../../image/avatar.png";
import { Button } from "@mui/base/Button";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

export const UBMessengerList: React.FC = () => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd",
        width: "25%",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box sx={{ p: 0 }}>
        <h1
          style={{ fontSize: "30px", marginBottom: "3%", padding: "5% 0 0 5%" }}
        >
          Chats
        </h1>

        <Box sx={{ pb: "2%", pl: "5%", pt: "2%" }}>
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div
              className="relative"
              style={{
                backgroundColor: "#fff",
                borderRadius: "15px",
                paddingBottom: "3%",
                width: "90%",
                marginBottom: "5%",
              }}
            >
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2"
                style={{ marginLeft: "2%" }}
              >
                <SearchIcon />
              </button>

              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent pl-9 pr-4 text-black focus:outline-none dark:text-white xl:w-125"
                style={{ marginLeft: "5%", marginTop: "4%" }}
              />
            </div>
          </form>

          <button
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "1%",
              marginRight: "3%",
              width: "15%",
            }}
          >
            All
          </button>
          <button
            style={{
              backgroundColor: "#fff",
              borderRadius: "15px",
              padding: "1%",
              marginRight: "10px",
              width: "20%",
            }}
          >
            Unread
          </button>
        </Box>

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
                  user.id === selectedUserId ? "#e7e7e7" : "#f9f9f9", // Highlight selected user
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
                  sx={{ position: "relative", bottom: "50px", left: "90%" }}
                >
                  {user.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default UBMessengerList;
