import React from "react";
import { Typography, Box, Paper, Alert, AlertTitle } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";

const GraphQLAdvancedContent: React.FC = () => {
  const customScalarExample = `// custom-scalars.ts - カスタムスカラータイプの定義
import { GraphQLScalarType, GraphQLError } from 'graphql';
import { Kind } from 'graphql/language';

// 日付型のカスタムスカラー
export const DateTimeScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO 8601形式の日時文字列',
  
  // サーバーからクライアントへの変換
  serialize(value: unknown): string {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (typeof value === 'string') {
      return new Date(value).toISOString();
    }
    throw new GraphQLError('Value must be a Date or string');
  },
  
  // クライアントからサーバーへの変換（変数として）
  parseValue(value: unknown): Date {
    if (typeof value === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        throw new GraphQLError('Invalid date string');
      }
      return date;
    }
    throw new GraphQLError('Value must be a string');
  },
  
  // クライアントからサーバーへの変換（リテラルとして）
  parseLiteral(ast): Date {
    if (ast.kind === Kind.STRING) {
      const date = new Date(ast.value);
      if (isNaN(date.getTime())) {
        throw new GraphQLError('Invalid date string');
      }
      return date;
    }
    throw new GraphQLError('Value must be a string literal');
  },
});

// JSON型のカスタムスカラー
export const JSONScalar = new GraphQLScalarType({
  name: 'JSON',
  description: 'JSON形式のデータ',
  
  serialize(value: unknown): any {
    return value; // JSONはそのまま返す
  },
  
  parseValue(value: unknown): any {
    return value; // JSONはそのまま受け取る
  },
  
  parseLiteral(ast): any {
    switch (ast.kind) {
      case Kind.STRING:
        return JSON.parse(ast.value);
      case Kind.OBJECT:
        return ast.value;
      default:
        return null;
    }
  },
});

// メールアドレス型のカスタムスカラー
export const EmailScalar = new GraphQLScalarType({
  name: 'Email',
  description: 'メールアドレス形式の文字列',
  
  serialize(value: unknown): string {
    if (typeof value === 'string' && isValidEmail(value)) {
      return value;
    }
    throw new GraphQLError('Value must be a valid email address');
  },
  
  parseValue(value: unknown): string {
    if (typeof value === 'string' && isValidEmail(value)) {
      return value;
    }
    throw new GraphQLError('Value must be a valid email address');
  },
  
  parseLiteral(ast): string {
    if (ast.kind === Kind.STRING && isValidEmail(ast.value)) {
      return ast.value;
    }
    throw new GraphQLError('Value must be a valid email address');
  },
});

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}`;

  const customResolverExample = `// custom-resolvers.ts - カスタムリゾルバの実装例
import { GraphQLFieldResolver } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

const prisma = new PrismaClient();

// 複雑なビジネスロジックを含むカスタムリゾルバ
export const customResolvers = {
  Query: {
    // ユーザーの統計情報を計算するカスタムリゾルバ
    userStats: async (
      parent: any,
      args: { userId: string },
      context: { user: any }
    ) => {
      // 認証チェック
      if (!context.user) {
        throw new AuthenticationError('認証が必要です');
      }

      // 認可チェック
      if (context.user.id !== args.userId && !context.user.isAdmin) {
        throw new ForbiddenError('他のユーザーの統計は閲覧できません');
      }

      // 複雑な集計処理
      const [user, postCount, publishedPostCount, totalViews] = await Promise.all([
        prisma.user.findUnique({ where: { id: args.userId } }),
        prisma.post.count({ where: { authorId: args.userId } }),
        prisma.post.count({ 
          where: { authorId: args.userId, published: true } 
        }),
        prisma.post.aggregate({
          where: { authorId: args.userId },
          _sum: { views: true }
        })
      ]);

      if (!user) {
        throw new Error('ユーザーが見つかりません');
      }

      return {
        user,
        totalPosts: postCount,
        publishedPosts: publishedPostCount,
        draftPosts: postCount - publishedPostCount,
        totalViews: totalViews._sum.views || 0,
        averageViews: postCount > 0 ? (totalViews._sum.views || 0) / postCount : 0,
      };
    },

    // 検索機能を実装するカスタムリゾルバ
    searchContent: async (
      parent: any,
      args: { 
        query: string; 
        filters?: {
          contentType?: 'POST' | 'USER';
          dateRange?: { from: Date; to: Date };
          tags?: string[];
        };
        pagination?: { limit: number; offset: number };
      }
    ) => {
      const { query, filters, pagination } = args;
      
      // 検索クエリの構築
      let searchResults = [];

      if (!filters?.contentType || filters.contentType === 'POST') {
        const posts = await prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { content: { contains: query, mode: 'insensitive' } },
            ],
            published: true,
            ...(filters?.dateRange && {
              createdAt: {
                gte: filters.dateRange.from,
                lte: filters.dateRange.to,
              }
            }),
            ...(filters?.tags && {
              tags: {
                some: {
                  name: { in: filters.tags }
                }
              }
            }),
          },
          include: { author: true, tags: true },
          skip: pagination?.offset || 0,
          take: pagination?.limit || 10,
        });

        searchResults.push(...posts.map(post => ({
          ...post,
          __typename: 'Post',
          relevanceScore: calculateRelevanceScore(query, post.title, post.content),
        })));
      }

      if (!filters?.contentType || filters.contentType === 'USER') {
        const users = await prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { bio: { contains: query, mode: 'insensitive' } },
            ],
          },
          include: { posts: true },
          skip: pagination?.offset || 0,
          take: pagination?.limit || 10,
        });

        searchResults.push(...users.map(user => ({
          ...user,
          __typename: 'User',
          relevanceScore: calculateRelevanceScore(query, user.name, user.bio || ''),
        })));
      }

      // 関連度でソート
      searchResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

      return {
        results: searchResults,
        totalCount: searchResults.length,
        hasMore: searchResults.length === (pagination?.limit || 10),
      };
    },
  },

  Mutation: {
    // 複雑なビジネスロジックを含むミューテーション
    publishPostWithNotification: async (
      parent: any,
      args: { postId: string },
      context: { user: any }
    ) => {
      if (!context.user) {
        throw new AuthenticationError('認証が必要です');
      }

      // トランザクションを使用した複雑な処理
      return await prisma.$transaction(async (tx) => {
        // 投稿の取得と権限チェック
        const post = await tx.post.findUnique({
          where: { id: args.postId },
          include: { author: true },
        });

        if (!post) {
          throw new Error('投稿が見つかりません');
        }

        if (post.authorId !== context.user.id) {
          throw new ForbiddenError('他のユーザーの投稿は公開できません');
        }

        if (post.published) {
          throw new Error('既に公開済みの投稿です');
        }

        // 投稿を公開
        const updatedPost = await tx.post.update({
          where: { id: args.postId },
          data: { 
            published: true, 
            publishedAt: new Date(),
          },
          include: { author: true, tags: true },
        });

        // フォロワーに通知を送信
        const followers = await tx.follow.findMany({
          where: { followingId: post.authorId },
          include: { follower: true },
        });

        await tx.notification.createMany({
          data: followers.map(follow => ({
            userId: follow.followerId,
            type: 'POST_PUBLISHED',
            message: \`\${post.author.name}さんが新しい投稿を公開しました: \${post.title}\`,
            relatedPostId: post.id,
          })),
        });

        // 外部サービスへの通知（例：メール送信、Slack通知など）
        await sendExternalNotifications(updatedPost, followers);

        return updatedPost;
      });
    },
  },

  // 計算フィールドのカスタムリゾルバ
  User: {
    // ユーザーの総閲覧数を計算
    totalViews: async (user: { id: string }) => {
      const result = await prisma.post.aggregate({
        where: { authorId: user.id },
        _sum: { views: true },
      });
      return result._sum.views || 0;
    },

    // ユーザーのフォロワー数を計算
    followerCount: async (user: { id: string }) => {
      return await prisma.follow.count({
        where: { followingId: user.id },
      });
    },

    // ユーザーの最新投稿を取得
    latestPost: async (user: { id: string }) => {
      return await prisma.post.findFirst({
        where: { authorId: user.id, published: true },
        orderBy: { publishedAt: 'desc' },
        include: { tags: true },
      });
    },
  },

  Post: {
    // 投稿の関連記事を計算
    relatedPosts: async (post: { id: string; tags: any[] }) => {
      if (!post.tags || post.tags.length === 0) {
        return [];
      }

      const tagIds = post.tags.map(tag => tag.id);

      return await prisma.post.findMany({
        where: {
          id: { not: post.id },
          published: true,
          tags: {
            some: {
              id: { in: tagIds }
            }
          }
        },
        include: { author: true, tags: true },
        take: 5,
        orderBy: { views: 'desc' },
      });
    },

    // 投稿の読了時間を計算
    readingTime: (post: { content: string }) => {
      const wordsPerMinute = 200; // 平均読書速度
      const wordCount = post.content.split(/\s+/).length;
      return Math.ceil(wordCount / wordsPerMinute);
    },
  },

  // カスタムスカラーリゾルバ
  DateTime: DateTimeScalar,
  JSON: JSONScalar,
  Email: EmailScalar,
};

// ヘルパー関数
function calculateRelevanceScore(query: string, title: string, content: string): number {
  const queryWords = query.toLowerCase().split(/\s+/);
  let score = 0;

  queryWords.forEach(word => {
    // タイトルでのマッチは高得点
    if (title.toLowerCase().includes(word)) {
      score += 10;
    }
    // コンテンツでのマッチは中得点
    if (content.toLowerCase().includes(word)) {
      score += 5;
    }
  });

  return score;
}

async function sendExternalNotifications(post: any, followers: any[]): Promise<void> {
  // 外部サービスへの通知ロジック
  // 例：メール送信、Slack通知、プッシュ通知など
  console.log(\`Sending notifications for post: \${post.title} to \${followers.length} followers\`);
}`;

  const dataLoaderExample = `// data-loader.ts - N+1問題の解決
import DataLoader from 'dataloader';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ユーザーをバッチで取得するDataLoader
export const userLoader = new DataLoader<string, any>(
  async (userIds: readonly string[]) => {
    const users = await prisma.user.findMany({
      where: { id: { in: [...userIds] } },
    });

    // IDの順序を保持して返す
    return userIds.map(id => users.find(user => user.id === id) || null);
  }
);

// 投稿をバッチで取得するDataLoader
export const postsByUserLoader = new DataLoader<string, any[]>(
  async (userIds: readonly string[]) => {
    const posts = await prisma.post.findMany({
      where: { authorId: { in: [...userIds] } },
      include: { tags: true },
    });

    // ユーザーIDごとに投稿をグループ化
    return userIds.map(userId => 
      posts.filter(post => post.authorId === userId)
    );
  }
);

// DataLoaderを使用したリゾルバ
export const optimizedResolvers = {
  Post: {
    author: async (post: { authorId: string }, args: any, context: any) => {
      // DataLoaderを使用してバッチで取得
      return await context.loaders.user.load(post.authorId);
    },
  },

  User: {
    posts: async (user: { id: string }, args: any, context: any) => {
      // DataLoaderを使用してバッチで取得
      return await context.loaders.postsByUser.load(user.id);
    },
  },
};

// サーバーのコンテキストでDataLoaderを提供
export function createLoaders() {
  return {
    user: userLoader,
    postsByUser: postsByUserLoader,
  };
}`;

  const authenticationExample = `// authentication.ts - 認証・認可の実装
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AuthenticationError, ForbiddenError } from 'apollo-server-express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authResolvers = {
  Mutation: {
    // ユーザー登録
    register: async (
      parent: any,
      args: { input: { email: string; password: string; name: string } }
    ) => {
      const { email, password, name } = args.input;

      // 既存ユーザーチェック
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        throw new Error('このメールアドレスは既に使用されています');
      }

      // パスワードハッシュ化
      const hashedPassword = await bcrypt.hash(password, 12);

      // ユーザー作成
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      // JWTトークン生成
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        user,
      };
    },

    // ログイン
    login: async (
      parent: any,
      args: { email: string; password: string }
    ) => {
      const { email, password } = args;

      // ユーザー検索
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new AuthenticationError('メールアドレスまたはパスワードが間違っています');
      }

      // パスワード検証
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        throw new AuthenticationError('メールアドレスまたはパスワードが間違っています');
      }

      // JWTトークン生成
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        user,
      };
    },
  },
};

// 認証ミドルウェア
export function getUser(token: string) {
  try {
    if (token) {
      const decoded = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET) as any;
      return decoded;
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 認可ヘルパー関数
export function requireAuth(user: any) {
  if (!user) {
    throw new AuthenticationError('認証が必要です');
  }
}

export function requireOwnership(user: any, resourceOwnerId: string) {
  requireAuth(user);
  if (user.userId !== resourceOwnerId && !user.isAdmin) {
    throw new ForbiddenError('この操作を実行する権限がありません');
  }
}`;

  const performanceTips = [
    "DataLoaderパターンでN+1問題を解決する",
    "適切なデータベースインデックスを設定する",
    "クエリの複雑度制限を設定する（depth limiting）",
    "レスポンスキャッシュを活用する",
    "フィールドレベルでの認可チェックを最適化する",
    "バッチ処理とパラレル処理を活用する",
    "GraphQL Playground以外でもクエリ分析ツールを使用する",
  ];

  const customResolverUseCases = [
    "複雑な計算フィールド（統計、集計、スコア計算など）",
    "外部APIとの連携（サードパーティサービスからのデータ取得）",
    "ビジネスロジックの実装（承認フロー、通知システムなど）",
    "データ変換・フォーマット（日付フォーマット、通貨変換など）",
    "検索・フィルタリング機能（全文検索、複合条件検索など）",
    "リアルタイム機能（チャット、ライブ更新など）",
    "ファイルアップロード・処理（画像リサイズ、メタデータ抽出など）",
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Phase 4-5: 高度な機能とカスタムリゾルバ
      </Typography>

      <Typography variant="body1" paragraph>
        GraphQLの高度な機能を学習し、業務で重要な「カスタムリゾルバ」の実装方法を詳しく解説します。
        実際のプロジェクトで使用される複雑なビジネスロジックの実装パターンを学びましょう。
      </Typography>

      <Paper sx={{ p: 3, mb: 3, bgcolor: "primary.50" }}>
        <Typography variant="h6" gutterBottom color="primary.main">
          🎯 カスタムリゾルバとは？
        </Typography>
        <Typography variant="body2">
          カスタムリゾルバは、標準的なCRUD操作を超えた複雑なビジネスロジックを実装するリゾルバ関数です。
          データの計算、外部API連携、複雑な検索機能など、アプリケーション固有の要件を満たすために作成されます。
        </Typography>
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        1. カスタムスカラータイプ
      </Typography>

      <Typography variant="body1" paragraph>
        独自のデータ型を定義して、型安全性とバリデーションを強化します：
      </Typography>

      <CodeBlock code={customScalarExample} language="typescript" />

      <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>カスタムスカラーの重要性</AlertTitle>
        カスタムスカラーを使用することで、型レベルでのバリデーションが可能になり、
        実行時エラーを大幅に削減できます。また、クライアント側でも型安全性が保たれます。
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        2. 複雑なビジネスロジックを含むカスタムリゾルバ
      </Typography>

      <Typography variant="body1" paragraph>
        実際の業務で使用される複雑なカスタムリゾルバの実装例を見てみましょう：
      </Typography>

      <CodeBlock code={customResolverExample} language="typescript" />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "success.50" }}>
        <Typography variant="h6" gutterBottom color="success.main">
          💡 カスタムリゾルバの設計原則
        </Typography>
        <BulletPoints
          items={[
            "単一責任の原則：一つのリゾルバは一つの責務のみを持つ",
            "エラーハンドリング：適切なエラー型を使用して意味のあるエラーを返す",
            "パフォーマンス：必要に応じてバッチ処理やキャッシュを活用する",
            "セキュリティ：認証・認可を適切に実装する",
            "テスタビリティ：ユニットテストが書きやすい構造にする",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        3. パフォーマンス最適化（DataLoader）
      </Typography>

      <Typography variant="body1" paragraph>
        N+1問題を解決し、効率的なデータ取得を実現するDataLoaderパターンを実装します：
      </Typography>

      <CodeBlock code={dataLoaderExample} language="typescript" />

      <Alert severity="warning" sx={{ mt: 2, mb: 3 }}>
        <AlertTitle>N+1問題とは？</AlertTitle>
        GraphQLでは関連データを取得する際に、各アイテムに対して個別にクエリが実行され、
        パフォーマンスが悪化する問題です。DataLoaderを使用することで、
        複数のクエリを1つのバッチクエリにまとめて実行できます。
      </Alert>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        4. 認証・認可の実装
      </Typography>

      <Typography variant="body1" paragraph>
        セキュアなGraphQL APIを構築するための認証・認可機能を実装します：
      </Typography>

      <CodeBlock code={authenticationExample} language="typescript" />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        5. カスタムリゾルバの活用場面
      </Typography>

      <Typography variant="body1" paragraph>
        実際の業務でカスタムリゾルバが使用される典型的な場面：
      </Typography>

      <BulletPoints items={customResolverUseCases} />

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        パフォーマンス最適化のベストプラクティス
      </Typography>

      <BulletPoints items={performanceTips} />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "error.50" }}>
        <Typography variant="h6" gutterBottom color="error.main">
          ⚠️ 注意すべきアンチパターン
        </Typography>
        <BulletPoints
          items={[
            "リゾルバ内での同期的な重い処理（ファイル読み込み、CPU集約的な計算など）",
            "適切なエラーハンドリングなしでのデータベースアクセス",
            "認証・認可チェックの漏れ",
            "無制限のクエリ深度や複雑度",
            "キャッシュされるべきデータの毎回計算",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        学習の成果と次のステップ
      </Typography>

      <Typography variant="body1" paragraph>
        おめでとうございます！これで業務で必要な「カスタムリゾルバ」の実装方法を習得しました。
        以下の知識を身につけることができました：
      </Typography>

      <BulletPoints
        items={[
          "GraphQLの基本概念から高度な実装まで",
          "Apollo Serverを使用したサーバー構築",
          "Prismaとの連携によるデータベース操作",
          "カスタムスカラータイプの定義と活用",
          "複雑なビジネスロジックを含むカスタムリゾルバの実装",
          "パフォーマンス最適化手法（DataLoader等）",
          "認証・認可の実装",
          "エラーハンドリングとテスト手法",
        ]}
      />

      <Paper sx={{ p: 3, mt: 3, bgcolor: "info.50" }}>
        <Typography variant="h6" gutterBottom color="info.main">
          🚀 実践への応用
        </Typography>
        <Typography variant="body2" paragraph>
          学習した内容を実際の業務に活かすために：
        </Typography>
        <BulletPoints
          items={[
            "既存のREST APIをGraphQLに段階的に移行する",
            "小さなプロジェクトから始めて、徐々に複雑な機能を追加する",
            "チームメンバーと知識を共有し、ベストプラクティスを確立する",
            "継続的にパフォーマンスを監視し、最適化を行う",
          ]}
        />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom sx={{ mt: 4 }}>
        さらなる学習リソース
      </Typography>

      <BulletPoints
        items={[
          "GraphQL公式ドキュメント - 最新の仕様と機能",
          "Apollo Server公式ガイド - 詳細な実装例",
          "Prisma公式ドキュメント - データベース操作のベストプラクティス",
          "GraphQL Summit - 年次カンファレンスの動画",
          "Community discussions - GitHub、Discord、Stack Overflow",
        ]}
      />

      <Box sx={{ mt: 3 }}>
        <Link url="/graphql" text="📖 GraphQL学習ガイドのトップに戻る" />
      </Box>
    </Box>
  );
};

export default GraphQLAdvancedContent;
