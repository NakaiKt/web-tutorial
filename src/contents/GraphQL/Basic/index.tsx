import React from "react";
import { Typography, Box, Paper, Alert, AlertTitle } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";
import Table from "@/components/parts/Table";

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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Phase 1: GraphQL基本概念
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの基本概念について説明します。RESTとの違いから始めて、
        スキーマ、クエリ、リゾルバという核となる概念を扱います。
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        1. GraphQLとRESTの違い
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLは従来のRESTful APIとは根本的に異なるアプローチを取ります：
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
        GraphQLは「RESTの置き換え」ではなく、「異なる設計思想」です。
        クライアント主導でデータ取得を行うことで、効率的なAPIを実現します。
      </Alert>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        RESTが今でも広く使われている理由
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの方が効率的に見えますが、RESTが残っている理由があります。
        これには技術的・組織的な理由があります：
      </Typography>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "warning.50" }}>
        <Typography variant="h6" gutterBottom color="warning.main">
          🔍 RESTが残る理由
        </Typography>
        <BulletPoints
          items={[
            "<strong>学習コストの低さ</strong>: RESTはHTTPの標準的な使い方で、理解しやすい",
            "<strong>キャッシュの簡単さ</strong>: HTTPキャッシュ（CDN、ブラウザキャッシュ）がそのまま使える",
            "<strong>デバッグの容易さ</strong>: curl、Postman等の標準ツールで簡単にテストできる",
            "<strong>既存システムとの親和性</strong>: 既存のHTTPインフラがそのまま活用できる",
            "<strong>チーム全体の習熟度</strong>: 多くの開発者がRESTに慣れ親しんでいる",
            "<strong>セキュリティの理解しやすさ</strong>: HTTPベースのセキュリティ対策が適用できる",
          ]}
        />
      </Paper>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        GraphQLの導入障壁
      </Typography>

      <BulletPoints
        items={[
          "<strong>学習曲線</strong>: スキーマ設計、リゾルバ、型システムなど新しい概念が多い",
          "<strong>キャッシュの複雑さ</strong>: クエリごとに異なるレスポンスのため、キャッシュ戦略が複雑",
          "<strong>セキュリティの複雑さ</strong>: クエリの深度制限、レート制限、認可の実装が困難",
          "<strong>既存システムの移行コスト</strong>: RESTから移行する際の開発・テスト・運用コスト",
          "<strong>チーム教育コスト</strong>: 開発チーム全体のスキルアップが必要",
          "<strong>ツールエコシステム</strong>: RESTと比べてツールやライブラリが少ない場合がある",
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
            "<strong>複雑なデータ関係</strong>: ユーザー、投稿、コメント等が複雑に関連するSNSアプリ",
            "<strong>多様なクライアント</strong>: Web、モバイル、管理画面で異なるデータが必要",
            "<strong>リアルタイム性</strong>: Subscriptionを活用したリアルタイム更新",
            "<strong>開発者体験重視</strong>: 型安全性、自動補完、ドキュメント生成を重視",
            "<strong>フロントエンド主導</strong>: クライアント側でデータ要件を柔軟に変更したい",
          ]}
        />
      </Paper>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          ✅ RESTが適している場面
        </Typography>
        <BulletPoints
          items={[
            "<strong>シンプルなCRUD</strong>: 基本的な作成・読み取り・更新・削除操作が中心",
            "<strong>キャッシュ重視</strong>: CDNやHTTPキャッシュを最大限活用したい",
            "<strong>既存システム</strong>: 既にRESTで構築されていて、移行コストが高い",
            "<strong>チームスキル</strong>: GraphQLの学習コストを避けたい",
            "<strong>外部API連携</strong>: サードパーティのREST APIとの連携が多い",
            "<strong>ファイルアップロード</strong>: 単純なファイルアップロード機能",
          ]}
        />
      </Paper>

      <Alert severity="success" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>現実的な選択</AlertTitle>
        多くの企業では「新規機能はGraphQL、既存機能はREST」や「内部APIはGraphQL、外部APIはREST」
        といったハイブリッドアプローチを取っています。完全に一つに統一する必要はありません。
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        2. GraphQLの基本的な流れ
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの全体像をつかむために、クライアントからサーバーへのリクエスト〜レスポンスの流れを簡単にまとめます。
      </Typography>

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          🔄 GraphQLの流れ
        </Typography>
        <Typography variant="body2" paragraph>
          1. クライアントが<strong>1つのエンドポイント</strong>（通常
          /graphql）にクエリを送信
          <br />
          2. GraphQLサーバーが<strong>スキーマ</strong>
          に基づいてクエリを解析・バリデーション
          <br />
          3. 認証・認可の確認
          <br />
          4. <strong>リゾルバ関数</strong>
          が各フィールドごとに実行され、データを取得
          <br />
          5. <strong>クライアントが指定した形式</strong>でレスポンスを構築
          <br />
          6. クライアントが必要なデータだけを受け取る
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. GraphQLの設計自由度と仕様の違い
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLでは、どこまでがユーザー（開発者）が設計でき、どこからがGraphQL仕様として固定されているのかを明確に理解することが重要です。RESTと比較しながら、設計自由度の違いを整理します。
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
        {/* Mermaid図のイメージをテキストで説明 */}
        <Typography variant="body2" color="text.secondary">
          下図は、GraphQLの処理フローにおいて「どこがユーザーの設計領域か」「どこがGraphQL仕様で固定されているか」を示しています。
        </Typography>
        <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 2, mt: 1 }}>
          <pre style={{ fontSize: "0.9em", lineHeight: 1.5 }}>
            {`flowchart TD
  subgraph クライアント
    Q[GraphQLクエリ]
  end
  subgraph サーバー
    direction TB
    S[GraphQLスキーマ\n(ユーザーが設計)]
    R[リゾルバ実装\n(ユーザーが実装)]
    E[GraphQLエンジン\n(仕様で固定)]
  end
  Q-->|HTTPリクエスト|E
  E-->|スキーマ参照|S
  E-->|リゾルバ呼び出し|R
  R-->|データ取得/計算|E
  E-->|HTTPレスポンス|Q
`}
          </pre>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          ※「スキーマ設計」「リゾルバ実装」がユーザーの設計領域、「GraphQLエンジン」が仕様で固定されている部分です。
        </Typography>
      </Box>

      <Typography variant="body1" paragraph>
        このように、GraphQLでは「スキーマ」と「リゾルバ」がユーザーの設計・実装領域であり、クエリの解析や実行フローなどはGraphQL仕様で固定されています。
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. スキーマとタイプシステム
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLスキーマは、APIで利用可能なデータとオペレーションを定義します。
        強力な型システムにより、実行時エラーを大幅に削減できます。
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
        GraphQLクエリは、必要なデータを宣言的に指定します。
        クエリの形がそのままレスポンスの形になるのが特徴です。
      </Typography>

      <CodeBlock code={queryExample} language="graphql" />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        ミューテーション（データ変更）
      </Typography>

      <Typography variant="body1" paragraph>
        データの作成、更新、削除はミューテーションを使用します：
      </Typography>

      <CodeBlock code={mutationExample} language="graphql" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. リゾルバ関数の概念
      </Typography>

      <Typography variant="body1" paragraph>
        リゾルバ関数は、スキーマの各フィールドに対してデータを取得・処理する関数です。
        GraphQLの「心臓部」とも言える重要な概念です。
      </Typography>

      <CodeBlock code={resolverConcept} language="javascript" />

      <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>リゾルバの重要性</AlertTitle>
        リゾルバ関数を理解することで、GraphQLがどのようにデータを取得し、
        クライアントに返すかの仕組みが分かります。カスタムリゾルバの理解にも必須の概念です。
        <Box sx={{ mt: 2 }}>
          <Link url="/graphql/resolver" text="🔍 リゾルバの詳細解説" />
        </Box>
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        5. GraphQLの実行フロー
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLサーバーがクエリを処理する流れは以下の通りです：
      </Typography>

      <BulletPoints items={executionFlow} />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          🔄 実行フローの詳細
        </Typography>
        <Typography variant="body2" paragraph>
          GraphQLは各フィールドを並行して解決します。つまり、同じ階層の複数フィールドは
          同時に処理され、効率的にデータを取得できます。
        </Typography>
        <Typography variant="body2">
          これにより、RESTのようにウォーターフォール的なリクエストではなく、
          最適化されたデータ取得が可能になります。
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        次のステップ
      </Typography>

      <Typography variant="body1" paragraph>
        基本概念を理解したら、まずリゾルバの仕組みを深く理解することが効果的です。
        その後、Apollo Serverを使って実際にGraphQLサーバーを構築します。
      </Typography>

      <Box sx={{ mt: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <Link url="/graphql/resolver" text="🔍 リゾルバの完全理解" />
        <Link url="/graphql/server" text="🚀 サーバーサイドの実装" />
      </Box>
    </Box>
  );
};

export default GraphQLBasicContent;
