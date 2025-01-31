import react from "react";
import { Button } from "@mui/material";

interface InputBoxProps {
  label: string;
  icon: React.ElementType;
  type: string;
  text: string;
}

export const InputBox: React.FC<InputBoxProps> = ({
  label,
  icon: Icon,
  type,
  text,
}) => {
  return (
    <div style={{ marginTop: "1%"}}>
      <form action="">
        <label htmlFor={type} style={{ marginBottom: "8px", display: "block" }}>
          <b>{label}</b>
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span>
            <Icon />
          </span>
          <input
            type={type}
            name={type}
            id={type}
            placeholder={text}
            defaultValue={text}
            style={{
              padding: "8px",
              borderRadius: "4px",
              outline: "none", // Removes the focus box
              width: "100%", // Takes up the full width of the container
            }}
          />

          <Button
            sx={{
              display: "flex",
              marginLeft: "auto", // Pushes buttons to the right
              gap: 1, // Adds spacing between buttons
            }}
          >
            edit
          </Button>
        </div>
      </form>

      <hr style={{ border: "1px solid #cccccc", marginTop: "2%" }} />
    </div>
  );
};

export default InputBox;
