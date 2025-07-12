import React from "react";
import { Typography, Box, Paper, Alert, AlertTitle } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";

const GraphQLServerContent: React.FC = () => {
  const apolloServerSetup = `// package.json の依存関係
{
  "dependencies": {
    "apollo-server-express": "^3.12.0",
    "express": "^4.18.0",
    "graphql": "^16.6.0",
    "@prisma/client": "^4.0.0",
    "prisma": "^4.0.0"
  },
  "devDependencies": {
    "@types/node": "^18.0.0",
    "typescript": "^4.7.0",
    "ts-node": "^10.8.0"
  }
}`;

  const basicServerSetup = `// server.ts - 基本的なApollo Serverのセットアップ
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

async function startServer() {
  // Express アプリケーションとHTTPサーバーを作成
  const app = express();
  const httpServer = http.createServer(app);

  // Apollo Server インスタンスを作成
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req }) => {
      // コンテキストに認証情報やデータベースクライアントを含める
      return {
        user: req.headers.authorization ? getUserFromToken(req.headers.authorization) : null,
        // prisma: prismaClient, // Prismaクライアント
      };
    },
  });

  // サーバーを開始
  await server.start();
  
  // Apollo GraphQLミドルウェアを適用
  server.applyMiddleware({ app, path: '/graphql' });

  // HTTPサーバーを起動
  const PORT = process.env.PORT || 4000;
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
  
  console.log(\`🚀 Server ready at http://localhost:\${PORT}\${server.graphqlPath}\`);
}

startServer().catch(error => {
  console.error('Error starting server:', error);
});`;

  const schemaDefinition = `// schema.ts - GraphQLスキーマの定義
import { gql } from 'apollo-server-express';

export const typeDefs = gql\`
  # スカラータイプ
  scalar Date

  # ユーザー型
  type User {
    id: ID!
    name: String!
    email: String!
    posts: [Post!]!
    createdAt: Date!
  }

  # 投稿型
  type Post {
    id: ID!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    createdAt: Date!
    updatedAt: Date!
  }

  # 入力型（ミューテーション用）
  input CreateUserInput {
    name: String!
    email: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    authorId: ID!
  }

  input UpdatePostInput {
    title: String
    content: String
    published: Boolean
  }

  # クエリ型
  type Query {
    # ユーザー関連
    user(id: ID!): User
    users: [User!]!
    
    # 投稿関連
    post(id: ID!): Post
    posts(published: Boolean): [Post!]!
    postsByUser(userId: ID!): [Post!]!
  }

  # ミューテーション型
  type Mutation {
    # ユーザー関連
    createUser(input: CreateUserInput!): User!
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean!
    
    # 投稿関連
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: UpdatePostInput!): Post
    deletePost(id: ID!): Boolean!
    publishPost(id: ID!): Post!
  }

  # サブスクリプション型（リアルタイム）
  type Subscription {
    postAdded: Post!
    postUpdated: Post!
  }
\`;`;

  const resolverImplementation = `// resolvers.ts - リゾルバ関数の実装
import { PubSub } from 'apollo-server-express';

const pubsub = new PubSub();

// インメモリデータ（実際のプロジェクトではデータベースを使用）
let users = [
  { id: '1', name: '田中太郎', email: 'tanaka@example.com', createdAt: new Date() },
  { id: '2', name: '佐藤花子', email: 'sato@example.com', createdAt: new Date() },
];

let posts = [
  {
    id: '1',
    title: 'GraphQL入門',
    content: 'GraphQLの基本的な使い方について説明します。',
    published: true,
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const resolvers = {
  // クエリリゾルバ
  Query: {
    // ユーザー関連
    user: (parent: any, args: { id: string }) => {
      return users.find(user => user.id === args.id);
    },
    
    users: () => {
      return users;
    },

    // 投稿関連
    post: (parent: any, args: { id: string }) => {
      return posts.find(post => post.id === args.id);
    },
    
    posts: (parent: any, args: { published?: boolean }) => {
      if (args.published !== undefined) {
        return posts.filter(post => post.published === args.published);
      }
      return posts;
    },
    
    postsByUser: (parent: any, args: { userId: string }) => {
      return posts.filter(post => post.authorId === args.userId);
    },
  },

  // ミューテーションリゾルバ
  Mutation: {
    createUser: (parent: any, args: { input: { name: string; email: string } }) => {
      const newUser = {
        id: String(users.length + 1),
        name: args.input.name,
        email: args.input.email,
        createdAt: new Date(),
      };
      users.push(newUser);
      return newUser;
    },

    createPost: (parent: any, args: { input: { title: string; content: string; authorId: string } }) => {
      const newPost = {
        id: String(posts.length + 1),
        title: args.input.title,
        content: args.input.content,
        published: false,
        authorId: args.input.authorId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      posts.push(newPost);
      
      // サブスクリプション通知
      pubsub.publish('POST_ADDED', { postAdded: newPost });
      
      return newPost;
    },

    publishPost: (parent: any, args: { id: string }) => {
      const post = posts.find(p => p.id === args.id);
      if (!post) throw new Error('投稿が見つかりません');
      
      post.published = true;
      post.updatedAt = new Date();
      
      pubsub.publish('POST_UPDATED', { postUpdated: post });
      
      return post;
    },
  },

  // 型リゾルバ（関連データの解決）
  User: {
    posts: (user: { id: string }) => {
      return posts.filter(post => post.authorId === user.id);
    },
  },

  Post: {
    author: (post: { authorId: string }) => {
      return users.find(user => user.id === post.authorId);
    },
  },

  // サブスクリプションリゾルバ
  Subscription: {
    postAdded: {
      subscribe: () => pubsub.asyncIterator(['POST_ADDED']),
    },
    postUpdated: {
      subscribe: () => pubsub.asyncIterator(['POST_UPDATED']),
    },
  },

  // カスタムスカラーリゾルバ
  Date: {
    serialize: (date: Date) => date.toISOString(),
    parseValue: (value: string) => new Date(value),
    parseLiteral: (ast: any) => new Date(ast.value),
  },
};`;

  const prismaIntegration = `// prisma/schema.prisma - Prismaスキーマ
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`;

  const prismaResolvers = `// resolvers-with-prisma.ts - Prismaを使用したリゾルバ
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    user: async (parent: any, args: { id: string }) => {
      return await prisma.user.findUnique({
        where: { id: args.id },
        include: { posts: true }, // 関連する投稿も取得
      });
    },
    
    users: async () => {
      return await prisma.user.findMany({
        include: { posts: true },
      });
    },

    posts: async (parent: any, args: { published?: boolean }) => {
      return await prisma.post.findMany({
        where: args.published !== undefined ? { published: args.published } : {},
        include: { author: true }, // 関連する作者も取得
        orderBy: { createdAt: 'desc' },
      });
    },
  },

  Mutation: {
    createUser: async (parent: any, args: { input: { name: string; email: string } }) => {
      return await prisma.user.create({
        data: {
          name: args.input.name,
          email: args.input.email,
        },
        include: { posts: true },
      });
    },

    createPost: async (parent: any, args: { input: { title: string; content: string; authorId: string } }) => {
      return await prisma.post.create({
        data: {
          title: args.input.title,
          content: args.input.content,
          authorId: args.input.authorId,
        },
        include: { author: true },
      });
    },
  },

  // Prismaを使う場合、多くの関連データは自動的に解決される
  // 必要に応じてカスタムリゾルバを追加
  User: {
    posts: async (user: { id: string }) => {
      return await prisma.post.findMany({
        where: { authorId: user.id },
        orderBy: { createdAt: 'desc' },
      });
    },
  },
};`;

  const errorHandling = `// error-handling.ts - エラーハンドリング
import { AuthenticationError, ForbiddenError, UserInputError } from 'apollo-server-express';

export const resolvers = {
  Query: {
    user: async (parent: any, args: { id: string }, context: any) => {
      // 認証チェック
      if (!context.user) {
        throw new AuthenticationError('認証が必要です');
      }

      // 入力バリデーション
      if (!args.id) {
        throw new UserInputError('ユーザーIDが必要です');
      }

      try {
        const user = await prisma.user.findUnique({
          where: { id: args.id },
        });

        if (!user) {
          throw new UserInputError('ユーザーが見つかりません');
        }

        // 認可チェック
        if (context.user.id !== user.id && !context.user.isAdmin) {
          throw new ForbiddenError('このユーザー情報にアクセスする権限がありません');
        }

        return user;
      } catch (error) {
        // データベースエラーの処理
        console.error('Database error:', error);
        throw new Error('ユーザー取得中にエラーが発生しました');
      }
    },
  },
};`;

  const testingExample = `// __tests__/resolvers.test.ts - リゾルバのテスト
import { resolvers } from '../resolvers';

describe('User Resolvers', () => {
  test('should return user by id', async () => {
    const mockContext = {
      user: { id: '1', isAdmin: false },
      prisma: {
        user: {
          findUnique: jest.fn().mockResolvedValue({
            id: '1',
            name: 'Test User',
            email: 'test@example.com',
          }),
        },
      },
    };

    const result = await resolvers.Query.user(
      null,
      { id: '1' },
      mockContext,
      {}
    );

    expect(result).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
    });
    expect(mockContext.prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: '1' },
    });
  });

  test('should throw error for unauthenticated user', async () => {
    const mockContext = { user: null };

    await expect(
      resolvers.Query.user(null, { id: '1' }, mockContext, {})
    ).rejects.toThrow('認証が必要です');
  });
});`;

  const developmentTips = [
    "GraphQL Playgroundを活用してクエリをテストしながら開発する",
    "スキーマファーストアプローチで設計を先に決める",
    "リゾルバ関数は小さく、単一責任にする",
    "エラーハンドリングを適切に行い、意味のあるエラーメッセージを返す",
    "N+1問題に注意し、DataLoaderパターンを検討する",
    "認証・認可をコンテキストで管理する",
    "型安全性を活かすためにTypeScriptを使用する",
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Phase 2-3: サーバー実装とデータベース連携
      </Typography>

      <Typography variant="body1" paragraph>
        Apollo Serverを使用したGraphQLサーバーの構築方法について説明する
        <br />
        基本的なセットアップから、Prismaを使用したデータベース連携まで段階的に扱う
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        1. Apollo Serverのセットアップ
      </Typography>

      <Typography variant="body1" paragraph>
        まず、必要なパッケージをインストールする
      </Typography>

      <CodeBlock code={apolloServerSetup} language="json" />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        基本的なサーバー構成
      </Typography>

      <CodeBlock code={basicServerSetup} language="typescript" />

      <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>Apollo Serverの特徴</AlertTitle>
        Apollo
        Serverは、GraphQLスキーマとリゾルバを組み合わせて、自動的にGraphQL
        APIを生成する
        <br />
        開発者はビジネスロジックに集中できる
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        2. スキーマ定義
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLスキーマ定義言語（SDL）を使用してAPIの構造を定義する
      </Typography>

      <CodeBlock code={schemaDefinition} language="typescript" />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "warning.50" }}>
        <Typography variant="h6" gutterBottom color="warning.main">
          💡 スキーマ設計のポイント
        </Typography>
        <BulletPoints
          items={[
            "入力型（Input types）を使用してミューテーションの引数を整理する",
            "必須フィールドには「!」を付けて明示する",
            "配列の要素と配列自体の必須性を区別する（[Post!]! vs [Post!] vs [Post]!）",
            "カスタムスカラー型を定義して型安全性を向上させる",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. リゾルバ関数の実装
      </Typography>

      <Typography variant="body1" paragraph>
        スキーマの各フィールドに対応するリゾルバ関数を実装する
      </Typography>

      <CodeBlock code={resolverImplementation} language="typescript" />

      <Alert severity="success" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>リゾルバの4つの引数</AlertTitle>
        <BulletPoints
          items={[
            "parent: 親リゾルバの戻り値",
            "args: クエリ/ミューテーションの引数",
            "context: リクエスト間で共有される情報（認証情報など）",
            "info: クエリのメタデータ（あまり使用しない）",
          ]}
        />
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. Prismaとの連携
      </Typography>

      <Typography variant="body1" paragraph>
        Prismaを使用してデータベースと連携し、型安全なデータアクセスを実現する
      </Typography>

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        Prismaスキーマの定義
      </Typography>

      <CodeBlock code={prismaIntegration} language="prisma" />

      <Typography variant="h6" component="h3" gutterBottom sx={{ mt: 3 }}>
        Prismaを使用したリゾルバ
      </Typography>

      <CodeBlock code={prismaResolvers} language="typescript" />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "success.50" }}>
        <Typography variant="h6" gutterBottom color="success.main">
          🎯 Prismaの利点
        </Typography>
        <BulletPoints
          items={[
            "型安全なデータベースアクセス",
            "自動的なマイグレーション生成",
            "リレーションの自動解決",
            "優れた開発者体験（自動補完、エラー検出）",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        5. エラーハンドリング
      </Typography>

      <Typography variant="body1" paragraph>
        適切なエラーハンドリングにより、クライアントに有用な情報を提供する
      </Typography>

      <CodeBlock code={errorHandling} language="typescript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        6. テストの実装
      </Typography>

      <Typography variant="body1" paragraph>
        リゾルバ関数のユニットテストを実装して品質を保証する
      </Typography>

      <CodeBlock code={testingExample} language="typescript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        開発のベストプラクティス
      </Typography>

      <BulletPoints items={developmentTips} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        次のステップ
      </Typography>

      <Typography variant="body1" paragraph>
        サーバーの基本実装ができたら、認証・認可、パフォーマンス最適化、そして最終目標である「カスタムリゾルバ」の実装に進む
      </Typography>
    </Box>
  );
};

export default GraphQLServerContent;
