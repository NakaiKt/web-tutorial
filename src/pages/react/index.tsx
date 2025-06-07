import { NextPage } from "next";
import Link from "../../components/parts/Link";
import { Box, Typography, Card, CardContent, CardActions } from "@mui/material";

const ReactPage: NextPage = () => {
  return (
    <Box sx={{ maxWidth: "800px", mx: "auto", p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        React
      </Typography>
      <Typography variant="body1" paragraph>
        Reactの基本的な概念とHooksについて学習できます。
      </Typography>

      <Box sx={{ display: "grid", gap: 2, mt: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              Memoization
            </Typography>
            <Typography variant="body2" color="text.secondary">
              React.memo、useMemo、useCallbackを使ったパフォーマンス最適化について学習します。
            </Typography>
          </CardContent>{" "}
          <CardActions>
            <Link text="学習する" url="/react/memoization" />
          </CardActions>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" component="h2" gutterBottom>
              state(useState, useRef)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              useStateとuseRefの違いと使い分けについて、実例を交えて学習します。
            </Typography>
          </CardContent>{" "}
          <CardActions>
            <Link text="学習する" url="/react/state" />
          </CardActions>
        </Card>
      </Box>
    </Box>
  );
};

export default ReactPage;
