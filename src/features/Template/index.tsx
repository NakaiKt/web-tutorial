import { Typography, Container, Box } from "@mui/material";
import { ReactNode } from "react";
import Space from "@/components/parts/Space";
import TableOfContents from "@/features/TableOfContents";

type TemplateProps = {
  title: string;
  children: ReactNode;
};

const BaseTemplate = ({ title, children }: TemplateProps) => {
  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <div className="flex flex-col mx-auto mt-10 mb-10 max-w-[720px]">
          <Typography variant="h1">{title}</Typography>
          <Space />
          <div>{children}</div>
        </div>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            right: (theme) => theme.spacing(2),
            transform: "translateY(-50%)",
          }}
        >
          <TableOfContents />
        </Box>
      </Box>
    </Container>
  );
};
export { BaseTemplate };
