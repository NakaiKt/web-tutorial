import React from "react";
import { Typography, Box, Paper } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";

const GraphQLContent: React.FC = () => {
  const learningPhases = [
    "Phase 1: 基礎概念の理解 - GraphQLとは何か、スキーマとタイプシステム",
    "Phase 2: サーバーサイドの基本 - リゾルバ関数、Apollo Server基本",
    "Phase 3: データベース連携 - Prismaとの連携、CRUD操作",
    "Phase 4: 実践的な機能 - 認証・認可、エラーハンドリング",
    "Phase 5: 高度な機能 - カスタムリゾルバ、パフォーマンス最適化",
  ];

  const whyGraphQL = [
    "RESTよりも効率的なデータ取得 - 必要なデータのみを1回のリクエストで取得",
    "強力な型システム - スキーマによる明確なAPI仕様",
    "優れた開発者体験 - GraphQL Playground、自動補完、ドキュメント生成",
    "フロントエンドとバックエンドの分離 - クライアント主導のデータ取得",
  ];

  const businessBenefits = [
    "開発速度の向上 - フロントエンドとバックエンドの並行開発が可能",
    "保守性の向上 - 型安全性による実行時エラーの削減",
    "パフォーマンス最適化 - Over-fetchingとUnder-fetchingの解決",
    "API進化の容易さ - バージョニング不要でスキーマを進化させられる",
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        GraphQL概要
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLは、APIのためのクエリ言語であり、既存のデータに対してクエリを実行するためのランタイム
        <br />
        Facebookによって開発され、現在では多くの企業で採用されている現代的なAPI設計パラダイム
      </Typography>

      <Paper sx={{ p: 3, mb: 3, bgcolor: "primary.50" }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          🎯 目標
        </Typography>
        <Typography variant="body2">
          業務で出てくる「カスタムリゾルバ」を理解し、実装できるようになることが目標
          <br />
          基礎から段階的に進め、実際のプロジェクトで活用できるスキルを身につける
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        GraphQLの特徴
      </Typography>

      <BulletPoints items={whyGraphQL} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        ビジネス上のメリット
      </Typography>

      <BulletPoints items={businessBenefits} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        学習フロー
      </Typography>

      <Typography variant="body1" paragraph>
        以下の5つのPhaseに分けて、段階的に進める
      </Typography>

      <BulletPoints items={learningPhases} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        必要な前提知識
      </Typography>

      <BulletPoints
        items={[
          "JavaScript/TypeScriptの基本的な知識",
          "Node.jsでのサーバー開発経験（Express等）",
          "RESTful APIの基本的な理解",
          "データベースの基本概念（SQL/NoSQL）",
        ]}
      />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        次のステップ
      </Typography>
    </Box>
  );
};

export default GraphQLContent;
