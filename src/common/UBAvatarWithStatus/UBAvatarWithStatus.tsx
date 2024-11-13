import Badge from "@mui/joy/Badge";
import Avatar, { AvatarProps } from "@mui/joy/Avatar";
import React from "react";

type IUBAvatarWithStatusProps = AvatarProps & {
  online?: boolean;
};

export const UBAvatarWithStatus: React.FC<IUBAvatarWithStatusProps> = (props) => {
  const { online = false, ...other } = props;

  return (
    <div>
      <Badge
        color={online ? "success" : "neutral"}
        variant={online ? "solid" : "soft"}
        size="sm"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeInset="4px 4px"
      >
        <Avatar size="sm" {...other} />
      </Badge>
    </div>
  );
};

export default UBAvatarWithStatus;