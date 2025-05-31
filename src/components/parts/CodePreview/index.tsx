import JsxParser from "react-jsx-parser";
import CodeBlock from "@/components/parts/CodeBlock";
import PreviewBlock from "@/components/parts/PreviewBlock";

import {
  Typography,
  Box,
  Container,
  Paper,
  Stack,
  Skeleton,
  CircularProgress,
  Button,
  Avatar,
} from "@mui/material";

type Props = {
  code: string;
};

const component = {
  Typography,
  Box,
  Container,
  Paper,
  Stack,
  Skeleton,
  CircularProgress,
  Button,
  Avatar,
};

const CodePreview = ({ code }: Props) => {
  return (
    <div className="py-4">
      <PreviewBlock>
        <JsxParser jsx={code} components={component} />
      </PreviewBlock>
      <CodeBlock code={code} />
    </div>
  );
};

export default CodePreview;
