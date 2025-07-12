import React from "react";
import { Typography, Box, Paper, Alert, AlertTitle } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";
import Table from "@/components/parts/Table";
import Mermaid from "@/components/parts/Mermaid";

const GraphQLBasicContent: React.FC = () => {
  const restVsGraphQLData = [
    {
      feature: "データ取得",
      rest: "複数のエンドポイントが必要",
      graphql: "1つのエンドポイントで完結",
    },
    {
      feature: "データ形式",
      rest: "サーバーが決定",
      graphql: "クライアントが指定",
    },
    { feature: "Over-fetching", rest: "発生しやすい", graphql: "発生しない" },
    { feature: "Under-fetching", rest: "発生しやすい", graphql: "発生しない" },
    { feature: "型安全性", rest: "実装依存", graphql: "スキーマで保証" },
    { feature: "ドキュメント", rest: "手動で作成", graphql: "自動生成" },
  ];

  const scalarTypes = [
    "String - 文字列型",
    "Int - 32bit整数型",
    "Float - 浮動小数点型",
    "Boolean - 真偽値型",
    "ID - 一意識別子型（文字列として扱われるが意味的に異なる）",
  ];

  const schemaExample = `# GraphQLスキーマの例
type User {
  id: ID!           # 必須のID
  name: String!     # 必須の文字列
  email: String     # オプショナルな文字列
  age: Int          # オプショナルな整数
  posts: [Post!]!   # Postの配列（配列自体は必須、要素も必須）
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!     # 必須のUser
  publishedAt: String
}

# クエリのエントリーポイント
type Query {
  user(id: ID!): User
  users: [User!]!
  post(id: ID!): Post
  posts: [Post!]!
}

# ミューテーション（データ変更）のエントリーポイント
type Mutation {
  createUser(name: String!, email: String!): User!
  updateUser(id: ID!, name: String, email: String): User
  deleteUser(id: ID!): Boolean!
}`;

  const queryExample = `# 基本的なクエリ
query GetUser {
  user(id: "1") {
    id
    name
    email
    posts {
      id
      title
      publishedAt
    }
  }
}

# 複数のフィールドを取得
query GetUsersAndPosts {
  users {
    id
    name
  }
  posts {
    id
    title
    author {
      name
    }
  }
}

# 変数を使用したクエリ
query GetUserById($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
  }
}`;

  const mutationExample = `# ユーザー作成のミューテーション
mutation CreateUser {
  createUser(name: "田中太郎", email: "tanaka@example.com") {
    id
    name
    email
  }
}

# 変数を使用したミューテーション
mutation UpdateUser($id: ID!, $name: String) {
  updateUser(id: $id, name: $name) {
    id
    name
    email
  }
}`;

  const resolverConcept = `// リゾルバ関数の基本構造
const resolvers = {
  Query: {
    // user(root, args, context, info) の4つの引数
    user: (root, args, context, info) => {
      // args.id を使ってユーザーを取得
      return getUserById(args.id);
    },
    users: () => {
      return getAllUsers();
    }
  },
  
  User: {
    // User型のpostsフィールドのリゾルバ
    posts: (user, args, context, info) => {
      // userオブジェクトのidを使って投稿を取得
      return getPostsByUserId(user.id);
    }
  },
  
  Mutation: {
    createUser: (root, args, context, info) => {
      return createNewUser(args.name, args.email);
    }
  }
};`;

  const executionFlow = [
    "1. クエリの解析（Parse）- クエリ文字列をASTに変換",
    "2. バリデーション（Validate）- スキーマに対してクエリの妥当性をチェック",
    "3. 実行（Execute）- リゾルバ関数を順次実行してデータを取得",
    "4. レスポンス構築 - 取得したデータをクエリの形に合わせて整形",
  ];

  const diagram = `
  flowchart TD
  subgraph クライアント
    Q[GraphQLクエリ]
  end
  subgraph サーバー
    direction TB
    S[GraphQLスキーマ（ユーザーが設計）]
    R[リゾルバ実装（ユーザーが実装）]
    E[GraphQLエンジン（仕様で固定）]
  end
  Q-->|HTTPリクエスト|E
  E-->|スキーマ参照|S
  E-->|リゾルバ呼び出し|R
  R-->|データ取得/計算|E
  E-->|HTTPレスポンス|Q
  `;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Phase 1: GraphQL基本概念
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの基本概念について説明します。RESTとの違いから始めて、
        スキーマ、クエリ、リゾルバという核となる概念を扱う
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        1. GraphQLとRESTの違い
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLはRESTful APIとは根本的に異なるアプローチを取る
      </Typography>

      <Table
        columns={[
          { header: "機能", key: "feature" },
          { header: "REST", key: "rest" },
          { header: "GraphQL", key: "graphql" },
        ]}
        rows={restVsGraphQLData}
      />

      <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>重要なポイント</AlertTitle>
        GraphQLはRESTの置き換えではなく異なる設計思想
        クライアント主導でデータ取得を行うことで効率的なAPIを実現
      </Alert>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        RESTが今でも広く使われている理由
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの方が効率的に見えるがRESTが残る理由がある
        技術的・組織的な理由がある
      </Typography>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "warning.50" }}>
        <Typography variant="h6" gutterBottom color="warning.main">
          🔍 RESTが残る理由
        </Typography>
        <BulletPoints
          items={[
            "学習コストの低さ: RESTはHTTPの標準的な使い方で理解しやすい",
            "キャッシュの簡単さ: HTTPキャッシュ（CDN、ブラウザキャッシュ）がそのまま使える",
            "デバッグの容易さ: curl、Postman等の標準ツールで簡単にテストできる",
            "既存システムとの親和性: 既存のHTTPインフラがそのまま活用できる",
            "チーム全体の習熟度: 多くの開発者がRESTに慣れ親しんでいる",
            "セキュリティの理解しやすさ: HTTPベースのセキュリティ対策が適用できる",
          ]}
        />
      </Paper>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        GraphQLの導入障壁
      </Typography>

      <BulletPoints
        items={[
          "学習曲線: スキーマ設計、リゾルバ、型システムなど新しい概念が多い",
          "キャッシュの複雑さ: クエリごとに異なるレスポンスのためキャッシュ戦略が複雑",
          "セキュリティの複雑さ: クエリの深度制限、レート制限、認可の実装が困難",
          "既存システムの移行コスト: RESTから移行する際の開発・テスト・運用コスト",
          "チーム教育コスト: 開発チーム全体のスキルアップが必要",
          "ツールエコシステム: RESTと比べてツールやライブラリが少ない場合がある",
        ]}
      />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        実際の使い分け指針
      </Typography>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "success.50" }}>
        <Typography variant="h6" gutterBottom color="success.main">
          ✅ GraphQLが適している場面
        </Typography>
        <BulletPoints
          items={[
            "複雑なデータ関係: ユーザー、投稿、コメント等が複雑に関連するSNSアプリ",
            "多様なクライアント: Web、モバイル、管理画面で異なるデータが必要",
            "リアルタイム性: Subscriptionを活用したリアルタイム更新",
            "開発者体験重視: 型安全性、自動補完、ドキュメント生成を重視",
            "フロントエンド主導: クライアント側でデータ要件を柔軟に変更したい",
          ]}
        />
      </Paper>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          ✅ RESTが適している場面
        </Typography>
        <BulletPoints
          items={[
            "シンプルなCRUD: 基本的な作成・読み取り・更新・削除操作が中心",
            "キャッシュ重視: CDNやHTTPキャッシュを最大限活用したい",
            "既存システム: 既にRESTで構築されていて移行コストが高い",
            "チームスキル: GraphQLの学習コストを避けたい",
            "外部API連携: サードパーティのREST APIとの連携が多い",
            "ファイルアップロード: 単純なファイルアップロード機能",
          ]}
        />
      </Paper>

      <Alert severity="success" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>現実的な選択</AlertTitle>
        多くの企業は新規機能はGraphQL、既存機能はRESTや内部APIはGraphQL、外部APIはRESTなどハイブリッドアプローチを取る
        完全に一つに統一する必要はない
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        2. GraphQLの基本的な流れ
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの全体像
        クライアントからサーバーへのリクエスト〜レスポンスの流れを簡単にまとめる
      </Typography>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          🔄 GraphQLの流れ
        </Typography>
        <Typography variant="body2" paragraph>
          1. クライアントが1つのエンドポイント（通常 /graphql）にクエリを送信 2.
          GraphQLサーバーがスキーマに基づいてクエリを解析・バリデーション 3.
          認証・認可の確認 4.
          リゾルバ関数が各フィールドごとに実行されデータを取得 5.
          クライアントが指定した形式でレスポンスを構築 6.
          クライアントが必要なデータだけを受け取る
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. GraphQLの設計自由度と仕様の違い
      </Typography>

      <Typography variant="body1" paragraph>
        どこまでがユーザーが設計できるか，どこからがGraphQL仕様で固定されているかを明確に理解することが重要
        RESTと比較しながら設計自由度の違いを整理する
      </Typography>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          RESTとGraphQLの設計自由度比較
        </Typography>
        <Table
          columns={[
            { header: "項目", key: "item" },
            { header: "REST", key: "rest" },
            { header: "GraphQL", key: "graphql" },
          ]}
          rows={[
            {
              item: "エンドポイント",
              rest: "複数（/users, /posts など）",
              graphql: "通常1つ（/graphql）",
            },
            {
              item: "メソッド",
              rest: "GET/POST/PUT/DELETE/PATCH",
              graphql: "POST/GET（ほぼPOST）",
            },
            {
              item: "リクエスト構造",
              rest: "ヘッダー/ボディ/クエリパラメータ",
              graphql: "query/variables/operationName",
            },
            {
              item: "レスポンス構造",
              rest: "任意（JSON, XML, etc.）",
              graphql: "{ data, errors }",
            },
            {
              item: "型の定義",
              rest: "サーバー/ドキュメントで任意",
              graphql: "スキーマで厳密に定義",
            },
            {
              item: "ユーザーの自由度",
              rest: "エンドポイント設計・型設計",
              graphql: "スキーマ設計・リゾルバ実装",
            },
            {
              item: "仕様で固定の部分",
              rest: "メソッド・HTTP構造",
              graphql: "クエリ構文・スキーマ言語・レスポンス形式",
            },
          ]}
        />
      </Paper>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        GraphQLでユーザーが設計できる部分
      </Typography>
      <BulletPoints
        items={[
          "スキーマ設計（型・クエリ・ミューテーション・サブスクリプションの定義）",
          "各リゾルバの実装（データ取得・計算・認証など）",
          "認証・認可の仕組み（contextやリゾルバ内で設計）",
          "カスタムスカラーやディレクティブの追加",
          "エラー処理やレスポンスのカスタマイズ",
        ]}
      />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        GraphQL仕様で固定されている部分
      </Typography>
      <BulletPoints
        items={[
          "スキーマ言語（SDL）の構文やキーワード（type, query, mutation, input, scalar等）",
          "クエリの構文（フィールドのネスト、引数の指定方法など）",
          "リクエスト方法（/graphqlエンドポイント、query/variables/operationNameのJSON構造）",
          "レスポンス形式（{ data, errors } で返す）",
          "クエリのパース・バリデーション・実行フロー（GraphQLエンジンが自動で処理）",
        ]}
      />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        図解：ユーザー設計領域とGraphQL仕様領域
      </Typography>
      <Box sx={{ my: 2 }}>
        <Typography variant="body2" color="text.secondary">
          下図はGraphQLの処理フローにおいてどこがユーザーの設計領域か，どこがGraphQL仕様で固定されているかを示す
        </Typography>
        <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2, mt: 1 }}>
          <Mermaid code={diagram} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          スキーマ設計・リゾルバ実装がユーザーの設計領域，GraphQLエンジンが仕様で固定されている部分
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        GraphQLではスキーマとリゾルバがユーザーの設計・実装領域，クエリの解析や実行フローなどはGraphQL仕様で固定されている
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. スキーマとタイプシステム
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLスキーマは、APIで利用可能なデータとオペレーションを定義する
        <br />
        強力な型システムにより、実行時エラーを大幅に削減できる
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        スカラータイプ（基本型）
      </Typography>

      <BulletPoints items={scalarTypes} />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        スキーマ定義の例
      </Typography>

      <CodeBlock code={schemaExample} language="graphql" />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "success.50" }}>
        <Typography variant="h6" gutterBottom color="success.main">
          💡 型システムのメリット
        </Typography>
        <BulletPoints
          items={[
            "コンパイル時に型エラーを検出できる",
            "IDEでの自動補完とエラー検出",
            "スキーマから自動的にドキュメントが生成される",
            "フロントエンドとバックエンドで型定義を共有できる",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. クエリの基本
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLクエリは、必要なデータを宣言的に指定する
        <br />
        クエリの形がそのままレスポンスの形になるのが特徴
      </Typography>

      <CodeBlock code={queryExample} language="graphql" />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        ミューテーション（データ変更）
      </Typography>

      <Typography variant="body1" paragraph>
        データの作成、更新、削除はミューテーションを使用する
      </Typography>

      <CodeBlock code={mutationExample} language="graphql" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. リゾルバ関数の概念
      </Typography>

      <Typography variant="body1" paragraph>
        リゾルバ関数は、スキーマの各フィールドに対してデータを取得・処理する関数
        <br />
        GraphQLの「心臓部」とも言える重要な概念
      </Typography>

      <CodeBlock code={resolverConcept} language="javascript" />

      <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>リゾルバの重要性</AlertTitle>
        リゾルバ関数を理解することで、GraphQLがどのようにデータを取得し、クライアントに返すかの仕組みが分かる
        <br />
        カスタムリゾルバの理解にも必須の概念
        <Box sx={{ mt: 2 }}>
          <Link url="/graphql/resolver" text="🔍 リゾルバの詳細解説" />
        </Box>
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        5. GraphQLの実行フロー
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLサーバーがクエリを処理する流れは以下の通り
      </Typography>

      <BulletPoints items={executionFlow} />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          🔄 実行フローの詳細
        </Typography>
        <Typography variant="body2" paragraph>
          GraphQLは各フィールドを並行して解決する
          <br />
          つまり、同じ階層の複数フィールドは同時に処理され、効率的にデータを取得できる
        </Typography>
        <Typography variant="body2">
          これにより、RESTのようにウォーターフォール的なリクエストではなく、最適化されたデータ取得が可能になる
        </Typography>
      </Paper>
    </Box>
  );
};

export default GraphQLBasicContent;
