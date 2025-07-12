import React from "react";
import { Typography, Box, Paper, Alert, AlertTitle } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";

const GraphQLResolverContent: React.FC = () => {
  const basicResolverExample = `// 最もシンプルなリゾルバの例
const resolvers = {
  Query: {
    // userクエリのリゾルバ
    user: (parent, args, context, info) => {
      // args.id を使ってユーザーを取得
      return { id: args.id, name: "田中太郎", email: "tanaka@example.com" };
    }
  }
};

// GraphQLクエリ
/*
query {
  user(id: "1") {
    id
    name
    email
  }
}
*/

// レスポンス
/*
{
  "data": {
    "user": {
      "id": "1",
      "name": "田中太郎", 
      "email": "tanaka@example.com"
    }
  }
}
*/`;

  const resolverArgumentsExample = `// リゾルバの4つの引数の詳細
const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      console.log('parent:', parent);   // 親リゾルバの戻り値（Queryの場合はnull）
      console.log('args:', args);       // { id: "1" }
      console.log('context:', context); // { user: {...}, prisma: {...} }
      console.log('info:', info);       // クエリのメタデータ
      
      return getUserById(args.id);
    }
  },
  
  User: {
    // Userオブジェクトのpostsフィールドのリゾルバ
    posts: (parent, args, context, info) => {
      console.log('parent:', parent);   // 親のUserオブジェクト { id: "1", name: "田中太郎", ... }
      console.log('args:', args);       // postsフィールドの引数（例：{ limit: 10 }）
      
      // 親のUserオブジェクトのidを使って投稿を取得
      return getPostsByUserId(parent.id, args.limit);
    }
  }
};`;

  const executionFlowExample = `// GraphQLクエリの実行フロー
/*
クエリ:
query {
  user(id: "1") {
    id
    name
    posts {
      id
      title
    }
  }
}
*/

// 実行順序:
// 1. Query.user リゾルバが実行される
const userResolver = (parent, args, context, info) => {
  console.log('1. Query.user が実行される');
  console.log('args:', args); // { id: "1" }
  
  // データベースからユーザーを取得
  return {
    id: "1",
    name: "田中太郎",
    email: "tanaka@example.com"
  };
};

// 2. User.posts リゾルバが実行される
const postsResolver = (parent, args, context, info) => {
  console.log('2. User.posts が実行される');
  console.log('parent:', parent); // { id: "1", name: "田中太郎", email: "tanaka@example.com" }
  
  // 親のUserオブジェクトのidを使って投稿を取得
  return [
    { id: "1", title: "GraphQLの基本" },
    { id: "2", title: "リゾルバの仕組み" }
  ];
};

// 最終的なレスポンス:
/*
{
  "data": {
    "user": {
      "id": "1",
      "name": "田中太郎",
      "posts": [
        { "id": "1", "title": "GraphQLの基本" },
        { "id": "2", "title": "リゾルバの仕組み" }
      ]
    }
  }
}
*/`;

  const contextExample = `// contextオブジェクトの活用例
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // リクエストヘッダーから認証情報を取得
    const token = req.headers.authorization?.replace('Bearer ', '');
    const user = token ? verifyToken(token) : null;
    
    return {
      user,           // 認証されたユーザー情報
      prisma,         // データベースクライアント
      dataSources: {  // 外部API接続用
        userAPI: new UserAPI(),
        postAPI: new PostAPI()
      }
    };
  }
});

// リゾルバでcontextを使用
const resolvers = {
  Query: {
    me: (parent, args, context, info) => {
      // contextから認証情報を取得
      if (!context.user) {
        throw new Error('認証が必要です');
      }
      
      // contextのprismaを使用してデータベースにアクセス
      return context.prisma.user.findUnique({
        where: { id: context.user.id }
      });
    },
    
    posts: async (parent, args, context, info) => {
      // contextのdataSourcesを使用して外部APIにアクセス
      const externalPosts = await context.dataSources.postAPI.getPosts();
      
      // contextのprismaを使用してデータベースからも取得
      const dbPosts = await context.prisma.post.findMany();
      
      return [...externalPosts, ...dbPosts];
    }
  }
};`;

  const fieldResolverExample = `// フィールドリゾルバの詳細
const typeDefs = \`
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    fullName: String!      # 計算フィールド
    isActive: Boolean!     # 動的フィールド
  }
  
  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }
\`;

const resolvers = {
  User: {
    // 通常のフィールド（データベースから直接取得）
    // id, name, email は自動的に解決される（リゾルバ不要）
    
    // 関連フィールドのリゾルバ
    posts: async (user, args, context) => {
      return context.prisma.post.findMany({
        where: { authorId: user.id }
      });
    },
    
    // 計算フィールドのリゾルバ
    fullName: (user) => {
      return \`\${user.firstName} \${user.lastName}\`;
    },
    
    // 動的フィールドのリゾルバ
    isActive: (user) => {
      const now = new Date();
      const lastLogin = new Date(user.lastLoginAt);
      const daysSinceLogin = (now - lastLogin) / (1000 * 60 * 60 * 24);
      return daysSinceLogin < 30; // 30日以内にログインしていればアクティブ
    }
  },
  
  Post: {
    // 逆方向の関連フィールド
    author: async (post, args, context) => {
      return context.prisma.user.findUnique({
        where: { id: post.authorId }
      });
    }
  }
};`;

  const resolverChainExample = `// リゾルバチェーンの例
/*
クエリ:
query {
  user(id: "1") {
    name
    posts {
      title
      comments {
        content
        author {
          name
        }
      }
    }
  }
}
*/

// 実行される順序:
// 1. Query.user
// 2. User.posts （user の結果を受け取る）
// 3. Post.comments （各 post の結果を受け取る）
// 4. Comment.author （各 comment の結果を受け取る）

const resolvers = {
  Query: {
    user: (parent, args, context) => {
      console.log('1. Query.user 実行');
      return { id: args.id, name: "田中太郎" };
    }
  },
  
  User: {
    posts: (user, args, context) => {
      console.log('2. User.posts 実行, user:', user);
      return [
        { id: "1", title: "GraphQL入門", authorId: user.id },
        { id: "2", title: "リゾルバ解説", authorId: user.id }
      ];
    }
  },
  
  Post: {
    comments: (post, args, context) => {
      console.log('3. Post.comments 実行, post:', post);
      return [
        { id: "1", content: "勉強になります", authorId: "2", postId: post.id },
        { id: "2", content: "ありがとうございます", authorId: "3", postId: post.id }
      ];
    }
  },
  
  Comment: {
    author: (comment, args, context) => {
      console.log('4. Comment.author 実行, comment:', comment);
      return { id: comment.authorId, name: "コメント投稿者" };
    }
  }
};`;

  const errorHandlingExample = `// エラーハンドリングの実装
import { GraphQLError } from 'graphql';

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      try {
        // 認証チェック
        if (!context.user) {
          throw new GraphQLError('認証が必要です', {
            extensions: {
              code: 'UNAUTHENTICATED',
              http: { status: 401 }
            }
          });
        }
        
        // バリデーション
        if (!args.id) {
          throw new GraphQLError('ユーザーIDが必要です', {
            extensions: {
              code: 'BAD_USER_INPUT',
              argumentName: 'id'
            }
          });
        }
        
        // データベースアクセス
        const user = await context.prisma.user.findUnique({
          where: { id: args.id }
        });
        
        if (!user) {
          throw new GraphQLError('ユーザーが見つかりません', {
            extensions: {
              code: 'NOT_FOUND',
              userId: args.id
            }
          });
        }
        
        // 認可チェック
        if (user.id !== context.user.id && !context.user.isAdmin) {
          throw new GraphQLError('このユーザーの情報にアクセスする権限がありません', {
            extensions: {
              code: 'FORBIDDEN',
              http: { status: 403 }
            }
          });
        }
        
        return user;
        
      } catch (error) {
        // データベースエラーの場合
        if (error.code === 'P2002') {
          throw new GraphQLError('データベース制約エラー', {
            extensions: {
              code: 'INTERNAL_ERROR',
              originalError: error.message
            }
          });
        }
        
        // その他のエラーは再スロー
        throw error;
      }
    }
  }
};`;

  const performanceExample = `// パフォーマンス最適化の例
const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      // ページネーション
      const { limit = 10, offset = 0 } = args;
      
      return context.prisma.user.findMany({
        take: limit,
        skip: offset,
        orderBy: { createdAt: 'desc' }
      });
    }
  },
  
  User: {
    posts: async (user, args, context) => {
      // N+1問題の解決: DataLoaderを使用
      return context.dataSources.postLoader.load(user.id);
    },
    
    // 重い計算フィールドはキャッシュを活用
    statistics: async (user, args, context) => {
      const cacheKey = \`user-stats-\${user.id}\`;
      
      // キャッシュから取得を試行
      let stats = await context.redis.get(cacheKey);
      if (stats) {
        return JSON.parse(stats);
      }
      
      // キャッシュにない場合は計算
      stats = await calculateUserStatistics(user.id);
      
      // 結果をキャッシュに保存（1時間）
      await context.redis.setex(cacheKey, 3600, JSON.stringify(stats));
      
      return stats;
    }
  }
};

// DataLoaderの実装例
const DataLoader = require('dataloader');

const createPostLoader = (prisma) => {
  return new DataLoader(async (userIds) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: userIds } },
      orderBy: { createdAt: 'desc' }
    });
    
    // userIdごとにグループ化
    const postsByUserId = {};
    posts.forEach(post => {
      if (!postsByUserId[post.authorId]) {
        postsByUserId[post.authorId] = [];
      }
      postsByUserId[post.authorId].push(post);
    });
    
    // 元の順序で結果を返す
    return userIds.map(userId => postsByUserId[userId] || []);
  });
};`;

  const resolverTypes = [
    "<strong>Query リゾルバ</strong>: データの取得を行う（GET に相当）",
    "<strong>Mutation リゾルバ</strong>: データの変更を行う（POST、PUT、DELETE に相当）",
    "<strong>Subscription リゾルバ</strong>: リアルタイムデータの配信を行う",
    "<strong>フィールドリゾルバ</strong>: オブジェクトの各フィールドの値を解決する",
    "<strong>カスタムスカラーリゾルバ</strong>: 独自のデータ型の変換を行う",
  ];

  const resolverResponsibilities = [
    "<strong>データソースからのデータ取得</strong>: データベース、外部API、ファイルシステムなど",
    "<strong>データ変換・加工</strong>: 取得したデータを適切な形式に変換",
    "<strong>ビジネスロジックの実行</strong>: 計算、バリデーション、認可など",
    "<strong>エラーハンドリング</strong>: 適切なエラーメッセージとステータスコードの返却",
    "<strong>パフォーマンス最適化</strong>: キャッシュ、バッチ処理、遅延読み込みなど",
  ];

  const resolverBestPractices = [
    "<strong>単一責任の原則</strong>: 一つのリゾルバは一つの責務のみを持つ",
    "<strong>純粋関数として設計</strong>: 副作用を最小限に抑え、テストしやすくする",
    "<strong>適切なエラーハンドリング</strong>: 意味のあるエラーメッセージを返す",
    "<strong>パフォーマンスを意識</strong>: N+1問題を避け、必要に応じてキャッシュを活用",
    "<strong>型安全性の確保</strong>: TypeScriptを使用して型安全なリゾルバを作成",
    "<strong>テスタビリティ</strong>: ユニットテストが書きやすい構造にする",
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        リゾルバの完全理解
      </Typography>

      <Typography variant="body1" paragraph>
        リゾルバは「GraphQLの心臓部」と呼ばれる重要な概念
        <br />
        スキーマで定義されたフィールドに対して、実際にデータを取得・処理する関数がリゾルバ
      </Typography>

      <Paper sx={{ p: 3, mb: 3, bgcolor: "primary.50" }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          🎯 リゾルバとは何か？
        </Typography>
        <Typography variant="body2">
          リゾルバは「GraphQLスキーマの各フィールドに対して、実際のデータを返す関数」
          クライアントがクエリを送信すると、GraphQLサーバーは対応するリゾルバ関数を実行して、
          データを取得・加工してレスポンスを構築する
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        1. リゾルバの基本構造
      </Typography>

      <Typography variant="body1" paragraph>
        最もシンプルなリゾルバから始めて、その仕組みを理解する
      </Typography>

      <CodeBlock code={basicResolverExample} language="javascript" />

      <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>重要な理解</AlertTitle>
        リゾルバは「クエリの形」と「レスポンスの形」を結びつける橋渡し役
        <br />
        クライアントが要求したフィールドに対して、リゾルバが実際のデータを提供する
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        2. リゾルバの4つの引数
      </Typography>

      <Typography variant="body1" paragraph>
        すべてのリゾルバ関数は4つの引数を受け取る
      </Typography>

      <BulletPoints
        items={[
          "<strong>parent (root)</strong>: 親リゾルバの戻り値",
          "<strong>args</strong>: クエリ/ミューテーションの引数",
          "<strong>context</strong>: リクエスト間で共有される情報",
          "<strong>info</strong>: クエリのメタデータ（あまり使用しない）",
        ]}
      />

      <CodeBlock code={resolverArgumentsExample} language="javascript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. GraphQLの実行フロー
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLクエリがどのようにリゾルバによって解決されるかを説明する
      </Typography>

      <CodeBlock code={executionFlowExample} language="javascript" />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "success.50" }}>
        <Typography variant="h6" gutterBottom color="success.main">
          💡 実行フローの重要ポイント
        </Typography>
        <BulletPoints
          items={[
            "GraphQLは<strong>並行実行</strong>を行う：同じ階層のフィールドは同時に処理される",
            "<strong>親から子へ</strong>：親リゾルバの結果が子リゾルバの第一引数として渡される",
            "<strong>必要な分だけ実行</strong>：クエリで要求されたフィールドのリゾルバのみが実行される",
            "<strong>型安全性</strong>：各リゾルバの戻り値はスキーマで定義された型に準拠する必要がある",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. contextオブジェクトの活用
      </Typography>

      <Typography variant="body1" paragraph>
        contextは認証情報、データベース接続、外部API接続など、リクエスト全体で共有される情報を格納する重要なオブジェクト
      </Typography>

      <CodeBlock code={contextExample} language="javascript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        5. フィールドリゾルバの詳細
      </Typography>

      <Typography variant="body1" paragraph>
        オブジェクトの各フィールドに対してリゾルバを定義することで、複雑なデータ構造や計算フィールドを実現できる
      </Typography>

      <CodeBlock code={fieldResolverExample} language="javascript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        6. リゾルバチェーン
      </Typography>

      <Typography variant="body1" paragraph>
        複雑なクエリでは、複数のリゾルバが連鎖的に実行される
      </Typography>

      <CodeBlock code={resolverChainExample} language="javascript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        7. エラーハンドリング
      </Typography>

      <Typography variant="body1" paragraph>
        適切なエラーハンドリングにより、クライアントに有用な情報を提供できる
      </Typography>

      <CodeBlock code={errorHandlingExample} language="javascript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        8. パフォーマンス最適化
      </Typography>

      <Typography variant="body1" paragraph>
        リゾルバのパフォーマンスを最適化する重要な技術
      </Typography>

      <CodeBlock code={performanceExample} language="javascript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        リゾルバの種類
      </Typography>

      <BulletPoints items={resolverTypes} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        リゾルバの責務
      </Typography>

      <BulletPoints items={resolverResponsibilities} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        ベストプラクティス
      </Typography>

      <BulletPoints items={resolverBestPractices} />

      <Alert severity="warning" sx={{ mt: 3, mb: 3 }}>
        <AlertTitle>よくある間違い</AlertTitle>
        <BulletPoints
          items={[
            "<strong>N+1問題</strong>: 関連データを取得する際に、各アイテムごとに個別クエリを実行してしまう",
            "<strong>認証・認可の漏れ</strong>: リゾルバで適切な権限チェックを行わない",
            "<strong>エラーハンドリング不足</strong>: 意味のないエラーメッセージや、エラーの詳細情報不足",
            "<strong>パフォーマンス無視</strong>: 重い処理をリゾルバ内で同期的に実行する",
            "<strong>型安全性の軽視</strong>: TypeScriptを使わず、実行時エラーを頻発させる",
          ]}
        />
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        まとめ
      </Typography>

      <Typography variant="body1" paragraph>
        リゾルバはGraphQLの核心的な概念です。この理解があることで：
      </Typography>

      <BulletPoints
        items={[
          "GraphQLクエリがどのように実行されるかが分かる",
          "効率的なデータ取得戦略を設計できる",
          "適切なエラーハンドリングができる",
          "パフォーマンス問題を特定・解決できる",
          "カスタムリゾルバの実装が可能になる",
        ]}
      />
    </Box>
  );
};

export default GraphQLResolverContent;
