import { useState } from "react";

import { useShikiHighlighter } from "react-shiki";
import { Box, IconButton, Tooltip, Typography, Paper } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  code: string;
  language?: string;
  fileName?: string;
};

const CodeBlock = ({ code, language = "tsx", fileName = "app.tsx" }: Props) => {
  const [copied, setCopied] = useState(false);
  const highlightedCode = useShikiHighlighter(code, language, "github-dark");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper sx={{ mb: 3, borderRadius: 1, fontFamily: "monospace" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          backgroundColor: "grey.900",
          color: "grey.300",
        }}
      >
        <Typography
          variant="body2"
          component="span"
          sx={{ fontFamily: "monospace" }}
        >
          {fileName}
        </Typography>

        <Tooltip title={copied ? "コピーしました" : "コピー"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{ color: "grey.400" }}
          >
            {copied ? (
              <CheckIcon fontSize="small" />
            ) : (
              <ContentCopyIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ position: "relative" }}>{highlightedCode}</Box>
    </Paper>
  );
};

export default CodeBlock;
