import { useState } from "react";

import { useShikiHighlighter } from "react-shiki";
import { Box, IconButton, Tooltip, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  code: string;
  language?: string;
  fileName?: string;
};

const CodeBlock = ({ code, language = "tsx", fileName = "app.tsx" }: Props) => {
  const [copied, setCopied] = useState(false);
  const theme = useTheme();

  // ダークモード対応: テーマに応じてShikiのテーマを選択
  const shikiTheme =
    theme.palette.mode === "dark" ? "github-dark" : "github-light";
  const highlightedCode = useShikiHighlighter(code, language, shikiTheme);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Paper sx={{ mb: 3, borderRadius: 1, fontFamily: "monospace", p: 0 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          py: 1,
          // ダークモード対応: テーマに応じてヘッダー色を調整
          backgroundColor:
            theme.palette.mode === "dark" ? "grey.900" : "grey.100",
          color: theme.palette.mode === "dark" ? "grey.300" : "grey.700",
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
            sx={{
              color: theme.palette.mode === "dark" ? "grey.400" : "grey.600",
            }}
          >
            {copied ? (
              <CheckIcon fontSize="small" />
            ) : (
              <ContentCopyIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ position: "relative", overflowX: "auto", width: "100%" }}>
        {highlightedCode}
      </Box>
    </Paper>
  );
};

export default CodeBlock;
