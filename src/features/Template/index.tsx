import { Typography } from "@mui/material";
import { ReactNode } from "react";

type TemplateProps = {
  title: string;
  children: ReactNode;
};

const BaseTemplate = ({ title, children }: TemplateProps) => {
  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      <div>{children}</div>
    </div>
  );
};
export { BaseTemplate };
