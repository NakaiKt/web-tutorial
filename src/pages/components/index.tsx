import React from "react";
import { Typography, Container, Paper, Box } from "@mui/material";
import { BaseTemplate as Template } from "../../features/Template";

export default function ComponentsPage() {
  return (
    <Template title="Components">
      <Container maxWidth="lg">
        <Typography variant="h1" component="h1" gutterBottom>
          Components
        </Typography>

        <Paper elevation={1} sx={{ p: 3, mb: 3 }}>
          {" "}
          <Typography variant="body1" component="p">
            このセクションでは、Webアプリケーション開発で使用される主要なUIコンポーネントについて学習します。
            各コンポーネントの基本概念から実装方法まで、実践的な内容を提供します。
          </Typography>
          <Typography variant="body1" component="p">
            各コンポーネントページでは以下の構成で解説しています：
          </Typography>
          <Box component="ul" sx={{ pl: 3 }}>
            <Typography component="li" variant="body1">
              基本概念とUX/UI理論
            </Typography>
            <Typography component="li" variant="body1">
              アクセシビリティとベストプラクティス
            </Typography>
            <Typography component="li" variant="body1">
              MUIを使用した具体的な実装方法
            </Typography>
            <Typography component="li" variant="body1">
              実際のコード例とライブデモ
            </Typography>
          </Box>
        </Paper>

        <Typography variant="h2" component="h2" gutterBottom>
          学習可能なコンポーネント
        </Typography>

        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h3" component="h3" gutterBottom>
              Button
            </Typography>
            <Typography variant="body2">
              ユーザーインタラクションの要となるボタンコンポーネントの実装
            </Typography>
          </Paper>

          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h3" component="h3" gutterBottom>
              Typography
            </Typography>
            <Typography variant="body2">
              テキスト表示とタイポグラフィの効果的な活用方法
            </Typography>
          </Paper>

          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h3" component="h3" gutterBottom>
              Skeleton
            </Typography>
            <Typography variant="body2">
              ローディング状態を表現するスケルトンUIの実装
            </Typography>
          </Paper>

          <Paper elevation={1} sx={{ p: 2 }}>
            <Typography variant="h3" component="h3" gutterBottom>
              Theme
            </Typography>
            <Typography variant="body2">
              一貫性のあるデザインシステムとテーマの構築
            </Typography>
          </Paper>
        </Box>
      </Container>
    </Template>
  );
}
