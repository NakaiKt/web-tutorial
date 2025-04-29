import { Typography, Container } from "@mui/material";
import { ReactNode } from "react";
import Space from "@/components/parts/Space";

type TemplateProps = {
  title: string;
  children: ReactNode;
};

const BaseTemplate = ({ title, children }: TemplateProps) => {
  return (
    <Container>
      <div className="w-[960px] mx-auto mt-10 mb-10">
        <Typography variant="h1">{title}</Typography>
        <Space />
        <div>{children}</div>
      </div>
    </Container>
  );
};
export { BaseTemplate };
