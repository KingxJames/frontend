import React from "react";
import { Box, Tabs, Tab } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface UBMediaProps {
  onBack: () => void;
  // mediaFiles: string[]; // ✅ Pass mediaFiles instead of setMediaFiles
  documents: string[];
  links: string[];
}

export const UBMedia: React.FC<UBMediaProps> = ({
  onBack,
  // mediaFiles,
  documents,
  links,
}) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        width: "25vw",
        height: "100vh",
        border: "1px solid #ddd",
        backgroundColor: "rgba(87, 87, 87, 0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Back Button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "8vh",
          borderBottom: "1px solid #f1f1f1",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
        }}
      >
        <ArrowBackIcon
          sx={{ marginLeft: "2%", cursor: "pointer" }}
          onClick={onBack}
        />
      </Box>

      {/* Tabs */}
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="chat categories"
        variant="fullWidth"
        centered
        sx={{ background: "rgba(224, 218, 218, 0.1)" }}
      >
        <Tab label="Media" value={0} />
        <Tab label="Docs" value={1} />
        <Tab label="Links" value={2} />
      </Tabs>

      {/* Documents Tab */}
      {value === 1 && (
        <Box p={2}>
          {documents.length === 0 ? (
            <p>No Documents</p>
          ) : (
            documents.map((doc, index) => (
              <a
                key={index}
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginBottom: "8px" }}
              >
                {doc.split("/").pop()}
              </a>
            ))
          )}
        </Box>
      )}

      {/* Links Tab */}
      {value === 2 && (
        <Box p={2}>
          {links.length === 0 ? (
            <p>No Links</p>
          ) : (
            links.map((link, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "block", marginBottom: "8px", color: "blue" }}
              >
                {link}
              </a>
            ))
          )}
        </Box>
      )}
    </Box>
  );
};

export default UBMedia;
