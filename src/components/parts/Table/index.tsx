import React from "react";
import { Box, useTheme } from "@mui/material";

interface TableColumn {
  header: string;
  key: string;
}

interface TableRow {
  [key: string]: string;
}

interface TableProps {
  columns: TableColumn[];
  rows: TableRow[];
}

const Table: React.FC<TableProps> = ({ columns, rows }) => {
  const theme = useTheme();

  return (
    <Box
      component="table"
      sx={{
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        overflow: "hidden",
      }}
    >
      <Box component="thead">
        <Box component="tr">
          {columns.map((column, index) => (
            <Box
              key={index}
              component="th"
              sx={{
                border: `1px solid ${theme.palette.divider}`,
                p: 2,
                textAlign: "left",
                fontWeight: "bold",
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[800]
                    : theme.palette.grey[50],
                color: theme.palette.text.primary,
              }}
            >
              {column.header}
            </Box>
          ))}
        </Box>
      </Box>
      <Box component="tbody">
        {rows.map((row, rowIndex) => (
          <Box
            key={rowIndex}
            component="tr"
            sx={{
              "&:nth-of-type(even)": {
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? theme.palette.grey[900]
                    : theme.palette.grey[50],
              },
            }}
          >
            {columns.map((column, colIndex) => (
              <Box
                key={colIndex}
                component="td"
                sx={{
                  border: `1px solid ${theme.palette.divider}`,
                  p: 2,
                  color: theme.palette.text.primary,
                }}
              >
                {row[column.key]}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Table;
