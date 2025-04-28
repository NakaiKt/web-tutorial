import { Typography, Container } from "@mui/material";
import { ReactNode } from "react";
import Space from "@/components/parts/Space";

type TemplateProps = {
  title: string;
  children: ReactNode;
};

const BaseTemplate = ({ title, children }: TemplateProps) => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h1">
        {title}
      </Typography>
      <Space />
      <div>{children}</div>
    </Container>
  );
};
export { BaseTemplate };
