import {
  Typography,
  Skeleton,
  Box,
  Avatar,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";
import { useState, useEffect } from "react";

const Pages = () => {
  const [loading, setLoading] = useState(true);
  const [apiLoading, setApiLoading] = useState(false);

  const SkeletonVariantList = ["text", "circular", "rectangular", "rounded"];

  const SkeletonFeatureList = [
    "データ読み込み中の視覚的フィードバックを提供する",
    "variantプロパティで表示するコンテンツの形状を指定できる",
    "animationプロパティで動きのパターンを制御できる",
    "width, height, sx プロパティで詳細なスタイリングが可能",
  ];

  const SkeletonAnimationList = [
    "pulse: 脈動するような透明度変化（デフォルト）",
    "wave: 左から右へ流れる波のような動き",
    "false: アニメーションなし（パフォーマンス重視）",
  ];

  const SkeletonUseCaseList = [
    "API からのデータフェッチ中の表示",
    "画像読み込み中のプレースホルダー",
    "ページ遷移時の初期表示状態",
    "無限スクロールでの新しいコンテンツ読み込み中",
    "フォーム送信後の処理待ち時間",
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <Typography>
        Skeletonはデータ読み込み中にコンテンツの形状を模擬表示するコンポーネント。
        <br />
        最新情報は
      </Typography>
      <Link
        text="MUI公式のSkeletonページ"
        url="https://mui.com/material-ui/react-skeleton/"
      />
      <Link
        text="Skeleton APIページ"
        url="https://mui.com/material-ui/api/skeleton/"
      />
      <Typography>を参照</Typography>
      <Typography variant="h2" id="basic">
        基本
      </Typography>
      <Typography>
        Skeletonはローディング状態を表現するコンポーネントで、代表的なものだと以下のようなバリアントを指定できる
      </Typography>
      <BulletPoints items={SkeletonVariantList} />{" "}
      <Typography>これらのバリアントはvariantプロパティで指定する</Typography>{" "}
      <CodeBlock
        fileName="index.tsx"
        code={`
  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
        `}
      />
      <Typography variant="h2" id="difference">
        従来のローディング表示との違い
      </Typography>
      <Typography>従来のスピナーやローディング表示との違いは</Typography>
      <BulletPoints items={SkeletonFeatureList} style="number" />
      <Space />
      <Typography variant="h3" id="visual-feedback">
        {SkeletonFeatureList[0]}
      </Typography>{" "}
      <Typography>
        従来のスピナーは「何かが読み込まれている」ことしか伝えないが、Skeletonは「どのようなコンテンツが表示されるか」をユーザーに予期させることができる。
        <br />
        これにより、ユーザーの不安感を軽減し、より良いUX（ユーザーエクスペリエンス）を提供できる。
      </Typography>
      <Typography>
        例えば、以下は従来のスピナーとSkeletonの比較例：
      </Typography>{" "}
      <CodePreview
        code={`
  {/* 従来のスピナー - 何が読み込まれるかわからない */}
  <CircularProgress />
  
  {/* Skeleton - カードコンテンツが読み込まれることがわかる */}
  <Card sx={{ maxWidth: 345 }}>
    <Skeleton variant="rectangular" width="100%" height={140} />
    <CardContent>
      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
    </CardContent>
  </Card>
        `}
      />
      <Typography variant="h3" id="variant-shapes">
        {SkeletonFeatureList[1]}
      </Typography>{" "}
      <Typography>
        variantプロパティを使用することで、表示するコンテンツの形状に最適化されたSkeletonを表示できる。
        <br />
        各バリアントは特定のUIパターンに対応：
      </Typography>
      <Typography variant="h4" id="text-variant">
        text バリアント
      </Typography>{" "}
      <Typography>
        テキストコンテンツの読み込み状態を表現する。デフォルトでは1行分のテキストサイズで表示される。
      </Typography>{" "}
      <CodePreview
        code={`
  <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
  <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
  <Skeleton variant="text" width="60%" />
        `}
      />
      <Typography variant="h4" id="circular-variant">
        circular バリアント
      </Typography>{" "}
      <Typography>
        アバターやプロフィール画像など、円形要素の読み込み状態を表現する。
      </Typography>{" "}
      <CodePreview
        code={`
  <Skeleton variant="circular" width={40} height={40} />
  <Skeleton variant="circular" width={60} height={60} />
        `}
      />
      <Typography variant="h4" id="rectangular-variant">
        rectangular バリアント
      </Typography>{" "}
      <Typography>
        画像やメディアコンテンツなど、矩形要素の読み込み状態を表現する。
      </Typography>{" "}
      <CodePreview
        code={`
  <Skeleton variant="rectangular" width={210} height={118} />
  <Skeleton variant="rectangular" width="100%" height={200} />
        `}
      />{" "}
      <Typography variant="h4" id="rounded-variant">
        rounded バリアント
      </Typography>{" "}
      <Typography>
        カードや角丸のコンテナなど、角丸矩形要素の読み込み状態を表現する。
        <br />
        sxプロパティのborderRadiusを使用することで、角丸の角度を細かく調整できる。
        <br />
        MUIのテーマで定義された値（0〜4）や、直接のピクセル値を指定可能。
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 1, fontWeight: "bold" }}>
        MUIテーマのborderRadius値：
      </Typography>
      <BulletPoints
        items={[
          "0: 0px（角丸なし）",
          "1: 4px（わずかな角丸）",
          "2: 8px（通常の角丸）",
          "3: 12px（やや大きな角丸）",
          "4: 16px（大きな角丸）",
        ]}
      />{" "}
      <CodePreview
        code={`
  {/* デフォルトの角丸 */}
  <Skeleton variant="rounded" width={210} height={60} />
  
  {/* テーマの値を使用 */}
  <Skeleton 
    variant="rectangular" 
    width={210} 
    height={60}
    sx={{ borderRadius: 1 }}  // 4px
  />
  <Skeleton 
    variant="rectangular" 
    width={210} 
    height={60}
    sx={{ borderRadius: 3 }}  // 12px
  />
  
  {/* 直接ピクセル値を指定 */}
  <Skeleton 
    variant="rectangular" 
    width={210} 
    height={60}
    sx={{ borderRadius: '20px' }}
  />
  
  {/* 非対称な角丸も可能 */}
  <Skeleton 
    variant="rectangular" 
    width={210} 
    height={60}
    sx={{ 
      borderTopLeftRadius: '20px',
      borderBottomRightRadius: '20px',
      borderTopRightRadius: '4px',
      borderBottomLeftRadius: '4px'
    }}
  />
        `}
      />
      <Typography variant="h3" id="animation-control">
        {SkeletonFeatureList[2]}
      </Typography>{" "}
      <Typography>
        animationプロパティを使用することで、Skeletonの動きを制御できる。
        <br />
        適切なアニメーションの選択により、ユーザーの待機体験を向上させることができる。
      </Typography>
      <BulletPoints items={SkeletonAnimationList} />
      <Typography variant="h4" id="pulse-animation">
        pulse アニメーション（デフォルト）
      </Typography>{" "}
      <Typography>
        透明度が周期的に変化する脈動のような効果。最も一般的で、CPU負荷も軽い。
      </Typography>{" "}
      <CodePreview
        code={`
  <Skeleton animation="pulse" width={210} height={60} />
        `}
      />
      <Typography variant="h4" id="wave-animation">
        wave アニメーション
      </Typography>{" "}
      <Typography>
        左から右へ光の波が流れるような効果。より動的で視覚的に魅力的だが、パフォーマンスコストがやや高い。
      </Typography>{" "}
      <CodePreview
        code={`
  <Skeleton animation="wave" width={210} height={60} />
        `}
      />
      <Typography variant="h4" id="no-animation">
        アニメーションなし
      </Typography>{" "}
      <Typography>
        静的表示でパフォーマンスを最優先したい場合や、アクセシビリティの観点で動きを避けたい場合に使用。
      </Typography>{" "}
      <CodePreview
        code={`
  <Skeleton animation={false} width={210} height={60} />
        `}
      />
      <Typography variant="h3" id="detailed-styling">
        {SkeletonFeatureList[3]}
      </Typography>{" "}
      <Typography>
        width、height、sxプロパティを組み合わせることで、詳細なスタイリングが可能。
        <br />
        これにより実際のコンテンツにより近い形状のSkeletonを作成できる。
      </Typography>{" "}
      <CodePreview
        code={`
  {/* カスタムサイズとスタイル */}
  <Skeleton 
    variant="rectangular" 
    width="100%" 
    height={200}
    sx={{ borderRadius: 2, marginBottom: 2 }}
  />
  
  {/* フォントサイズに合わせたテキストSkeleton */}
  <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
        `}
      />
      <Typography variant="h2" id="use-cases">
        使用場面
      </Typography>
      <Typography>Skeletonは以下のような場面で効果的に使用できる</Typography>
      <BulletPoints items={SkeletonUseCaseList} />{" "}
      <Typography variant="h3" id="api-data-loading">
        {SkeletonUseCaseList[0]}
      </Typography>{" "}
      <Typography>
        APIからデータを取得している間のUI表示。実際のコンテンツ構造に合わせてSkeletonを配置する。
        <br />
        以下の例では、ボタンでAPIの読み込み状態をシミュレートできる。
      </Typography>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          padding: 2,
          marginBottom: 1,
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            onClick={() => {
              setApiLoading(true);
              setTimeout(() => setApiLoading(false), 2000);
            }}
            disabled={apiLoading}
          >
            {apiLoading ? "データ読み込み中..." : "APIデータを読み込む"}
          </Button>
        </Box>
        {apiLoading ? (
          <Box>
            <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
          </Box>
        ) : (
          <Box>
            <Typography variant="h5">記事タイトル</Typography>
            <Typography>
              記事の説明文です。APIから取得されたデータが表示されています。
            </Typography>
            <Typography color="textSecondary">著者: 田中太郎</Typography>
          </Box>
        )}
      </Box>
      <Typography>実装コード：</Typography>{" "}
      <CodeBlock
        fileName="APIデータフェッチの実装"
        code={`
  const [apiLoading, setApiLoading] = useState(false);

  const handleFetchData = () => {
    setApiLoading(true);
    // 実際の実装では、ここでAPIを呼び出し
    fetch('/api/data')
      .then(response => response.json())
      .then(data => {
        // データの処理
        setApiLoading(false);
      })
      .catch(error => {
        console.error('エラー:', error);
        setApiLoading(false);
      });
  };

  return (
    <Box>
      <Button onClick={handleFetchData} disabled={apiLoading}>
        {apiLoading ? 'データ読み込み中...' : 'APIデータを読み込む'}
      </Button>
      
      {apiLoading ? (
        <Box>
          <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
          <Skeleton variant="text" />
          <Skeleton variant="text" width="60%" />
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">{data.title}</Typography>
          <Typography>{data.description}</Typography>
          <Typography>{data.author}</Typography>
        </Box>
      )}
    </Box>
  );
        `}
      />{" "}
      <Typography variant="h2" id="practical-example">
        実践的な例
      </Typography>{" "}
      <Typography>
        以下は実際のカードコンポーネントでのSkeleton使用例。
        <br />
        ボタンを押すことで、ローディング状態と完成状態を切り替えて体験できる。
      </Typography>
      <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
        <Box sx={{ padding: 2, borderBottom: "1px solid #e0e0e0" }}>
          <Button variant="contained" onClick={handleReload}>
            読み込み状態を再現
          </Button>
        </Box>
        {loading ? (
          <>
            <Skeleton variant="rectangular" width="100%" height={140} />
            <CardContent>
              <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="60%" />
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ marginLeft: 2 }}>
                  <Skeleton variant="text" width={100} />
                  <Skeleton variant="text" width={80} />
                </Box>
              </Box>
            </CardContent>
          </>
        ) : (
          <>
            <Box
              sx={{
                width: "100%",
                height: 140,
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              画像エリア
            </Box>
            <CardContent>
              <Typography variant="h5">記事タイトル</Typography>
              <Typography>
                記事の説明文です。ここに記事の概要が表示されます。
              </Typography>
              <Typography color="textSecondary">著者名</Typography>
              <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
                <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
                <Box sx={{ marginLeft: 2 }}>
                  <Typography variant="body2">ユーザー名</Typography>
                  <Typography variant="caption">投稿日時</Typography>
                </Box>
              </Box>
            </CardContent>
          </>
        )}
      </Card>
      <Typography>実装コード：</Typography>{" "}
      <CodeBlock
        fileName="カードコンポーネントのSkeleton実装"
        code={`
  const [loading, setLoading] = useState(true);

  // 3秒後にローディング完了
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleReload = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      {loading ? (
        <>
          {/* 画像部分のSkeleton */}
          <Skeleton variant="rectangular" width="100%" height={140} />
          <CardContent>
            {/* タイトル（大きめのテキスト） */}
            <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
            {/* 説明文（通常サイズのテキスト2行） */}
            <Skeleton variant="text" />
            <Skeleton variant="text" width="60%" />
            
            {/* ユーザー情報エリア */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              {/* アバター */}
              <Skeleton variant="circular" width={40} height={40} />
              <Box sx={{ marginLeft: 2 }}>
                {/* ユーザー名・日時 */}
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={80} />
              </Box>
            </Box>
          </CardContent>
        </>
      ) : (
        <>
          {/* 実際のコンテンツ */}
          <Box sx={{ 
            width: '100%', 
            height: 140, 
            backgroundColor: '#f0f0f0',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            画像エリア
          </Box>
          <CardContent>
            <Typography variant="h5">記事タイトル</Typography>
            <Typography>
              記事の説明文です。ここに記事の概要が表示されます。
            </Typography>
            <Typography color="textSecondary">著者名</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
              <Avatar sx={{ width: 40, height: 40 }}>A</Avatar>
              <Box sx={{ marginLeft: 2 }}>
                <Typography variant="body2">ユーザー名</Typography>
                <Typography variant="caption">投稿日時</Typography>
              </Box>
            </Box>
          </CardContent>
        </>
      )}
    </Card>
  );
        `}
      />
      <Typography variant="h2" id="performance-considerations">
        パフォーマンスの考慮事項
      </Typography>{" "}
      <Typography>
        Skeletonを効果的に使用するためのパフォーマンス関連のポイント：
      </Typography>
      <Typography variant="h3" id="animation-performance">
        アニメーションのパフォーマンス
      </Typography>{" "}
      <Typography>
        アニメーションの種類によってパフォーマンスへの影響が異なる：
      </Typography>
      <BulletPoints
        items={[
          "pulse: 最も軽量、透明度変化のみ",
          "wave: やや重い、transform を使用",
          "false: 最軽量、アニメーションなし",
        ]}
      />
      <Typography variant="h3" id="dom-optimization">
        DOM要素の最適化
      </Typography>{" "}
      <Typography>
        大量のSkeletonを表示する場合は、必要最小限の要素数に抑えることが重要：
      </Typography>{" "}
      <CodeBlock
        fileName="最適化の例"
        code={`
  // ❌ 過度に詳細なSkeleton
  {Array.from({length: 100}).map((_, i) => (
    <Box key={i}>
      <Skeleton variant="circular" width={20} height={20} />
      <Skeleton variant="text" width="20%" />
      <Skeleton variant="text" width="30%" />
      <Skeleton variant="text" width="25%" />
    </Box>
  ))}
  
  // ✅ 適度に簡略化されたSkeleton
  {Array.from({length: 100}).map((_, i) => (
    <Box key={i}>
      <Skeleton variant="text" height={60} />
    </Box>
  ))}
        `}
      />
      <Typography variant="h2" id="accessibility">
        アクセシビリティ
      </Typography>{" "}
      <Typography>
        Skeletonを使用する際のアクセシビリティに関する配慮：
      </Typography>
      <Typography variant="h3" id="screen-reader">
        スクリーンリーダー対応
      </Typography>{" "}
      <Typography>
        Skeletonは視覚的な要素のため、スクリーンリーダーには「loading」などの情報を提供する：
      </Typography>{" "}
      <CodePreview
        code={`
  <Box aria-label="コンテンツを読み込み中">
    <Skeleton variant="text" />
    <Skeleton variant="text" />
    <Skeleton variant="text" width="60%" />
  </Box>
        `}
      />
      <Typography variant="h3" id="motion-sensitivity">
        動きに敏感なユーザーへの配慮
      </Typography>{" "}
      <Typography>
        prefers-reduced-motion
        メディアクエリを使用して、動きを避けたいユーザーに配慮：
      </Typography>{" "}
      <CodeBlock
        fileName="アクセシビリティを考慮したSkeleton"
        code={`
  // CSSで動きを制御
  @media (prefers-reduced-motion: reduce) {
    .MuiSkeleton-pulse,
    .MuiSkeleton-wave {
      animation: none;
    }
  }
  
  // またはJavaScriptで動的に制御
  const animation = window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    ? false 
    : 'pulse';
  
  <Skeleton animation={animation} />
        `}
      />{" "}
      <Typography variant="h2" id="auto-size-adjustment">
        自動サイズ調整機能
      </Typography>{" "}
      <Typography>
        Skeletonの最も便利な機能の一つは、
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          サイズが設定されている親要素内に配置すると、自動的にそのサイズに調整される
        </Typography>
        こと。
        <br />
        これにより、既存のコンポーネントに簡単にローディング状態を追加できる。
      </Typography>{" "}
      <Typography variant="h3" id="typography-inference">
        Typographyでの自動サイズ調整
      </Typography>{" "}
      <Typography>
        Typography内でSkeletonを使用すると、親のTypographyの`variant`に応じて自動でサイズが調整される。
        <br />
        これは**Typography の CSS
        スタイル（font-size、line-height）を継承する**ため。
      </Typography>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Button variant="contained" onClick={handleReload} disabled={loading}>
            {loading ? "読み込み中..." : "Typographyサイズ調整を体験"}
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h1" component="span">
            {loading ? <Skeleton /> : "h1タイトル"}
          </Typography>
          <Typography variant="h3" component="span">
            {loading ? <Skeleton /> : "h3タイトル"}
          </Typography>
          <Typography variant="body1">
            {loading ? <Skeleton /> : "body1テキスト"}
          </Typography>
        </Box>
      </Box>
      <CodeBlock
        code={`
  <Typography variant="h1" component="span">
    {loading ? <Skeleton /> : "h1タイトル"}
  </Typography>
  
  <Typography variant="h3" component="span">
    {loading ? <Skeleton /> : "h3タイトル"}
  </Typography>
  
  <Typography variant="body1">
    {loading ? <Skeleton /> : "body1テキスト"}
  </Typography>
        `}
      />
      <Typography variant="h4" id="size-inheritance-mechanism">
        サイズ継承の基本原理
      </Typography>{" "}
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          重要：
        </Typography>{" "}
        Skeletonは親要素から自動的にサイズを継承する機能がある。
      </Typography>
      <BulletPoints
        items={[
          "Skeleton は親要素の CSS `font-size` を高さの基準として使用",
          "幅が指定されていない場合、親要素のレイアウトに従って自動調整",
          "明示的に width や height を指定すると、継承より優先される",
        ]}
      />
      <Typography variant="h3" id="avatar-inference">
        Avatarでの自動サイズ推測
      </Typography>
      <Typography>
        Avatarコンポーネントと組み合わせることで、自動的に円形でサイズも調整される：
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2 }}
      >
        {loading ? (
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>
        ) : (
          <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
        )}
        <Typography>
          {loading ? <Skeleton width="40%" /> : "ユーザー名"}
        </Typography>
      </Box>{" "}
      <CodePreview
        code={`
  {loading ? (
    <Skeleton variant="circular">
      <Avatar />
    </Skeleton>  ) : (
    <Avatar src={user.avatar} />
  )}
        `}
      />{" "}
      <Typography variant="h2" id="customization">
        カスタマイズとテーマ対応
      </Typography>
      <Typography>
        Skeletonはsxプロパティを使用して詳細なカスタマイズが可能。
        <br />
        特にダークテーマ対応において、背景色の調整が重要になる。
      </Typography>
      <Typography variant="h3" id="theme-adaptation">
        テーマに応じた色調整
      </Typography>
      <Typography>
        ダークテーマなど、背景色に応じてSkeletonの色を調整することで視認性を保つ：
      </Typography>{" "}
      <CodePreview
        code={`
  {/* ダークテーマ対応 */}
  <Skeleton 
    sx={{ bgcolor: 'grey.700' }}
    variant="rectangular" 
    width={210} 
    height={60} 
  />
        `}
      />
      <Typography variant="h2" id="best-practices">
        ベストプラクティス
      </Typography>
      <Typography>効果的なSkeleton実装のためのガイドライン：</Typography>{" "}
      <Typography variant="h3" id="content-structure-matching">
        実際のコンテンツ構造との一致
      </Typography>{" "}
      <Typography>
        Skeletonの最も重要なベストプラクティスは、{" "}
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          実際のコンポーネント内で、同じレイアウト構造を保ちながらコンテンツ部分のみをSkeletonに置き換える
        </Typography>
        こと。
        <br />
        構造を完全に分離するのではなく、Typography や Box
        などの同じコンテナ内で条件分岐を行うことで、保守性と一貫性を保つことができる。
      </Typography>
      <CodeBlock
        fileName="構造を意識した実装"
        code={`
  // ✅ 良い例：同じコンテナ内でコンテンツのみを置き換え
  <Box>
    <Typography variant="h5">
      {loading ? <Skeleton /> : title}
    </Typography>
    <Typography>
      {loading ? <Skeleton /> : description}
    </Typography>
    <Typography color="textSecondary">
      {loading ? <Skeleton width="60%" /> : author}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
      {loading ? (
        <Skeleton variant="circular" width={40} height={40} />
      ) : (
        <Avatar src={avatar} />
      )}
      <Box sx={{ marginLeft: 2 }}>
        <Typography variant="body2">
          {loading ? <Skeleton width="40%" /> : userName}
        </Typography>
        <Typography variant="caption">
          {loading ? <Skeleton width="30%" /> : date}
        </Typography>
      </Box>
    </Box>
  </Box>

  // ❌ 避けるべき例：構造を完全に分離
  {loading ? (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="60%" />
      <Box sx={{ display: 'flex', marginTop: 2 }}>
        <Skeleton variant="circular" width={40} height={40} />
        <Box sx={{ marginLeft: 2 }}>
          <Skeleton variant="text" width="40%" />
          <Skeleton variant="text" width="30%" />
        </Box>
      </Box>
    </Box>
  ) : (
    <Box>
      <Typography variant="h5">{title}</Typography>
      <Typography>{description}</Typography>
      <Typography color="textSecondary">{author}</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
        <Avatar src={avatar} />
        <Box sx={{ marginLeft: 2 }}>
          <Typography variant="body2">{userName}</Typography>
          <Typography variant="caption">{date}</Typography>
        </Box>
      </Box>
    </Box>
  )}
        `}
      />
      <Typography sx={{ fontWeight: "bold" }}>この手法の利点：</Typography>
      <BulletPoints
        items={[
          "レイアウト構造の重複を避けられる（DRY原則）",
          "スタイリングの一貫性が保たれる（同じTypographyのvariantやスタイルを使用）",
          "保守性が向上する（レイアウト変更時に一箇所のみ修正）",
          "Skeletonが自動的に親要素のサイズを継承するため、サイズ指定が不要",
          "実際のコンテンツとの視覚的な差異が最小化される",
        ]}
      />
      <Typography variant="h3" id="loading-duration">
        適切な読み込み時間の設定
      </Typography>
      <Typography>
        Skeletonの表示時間は、ユーザーの期待と実際のデータ読み込み時間のバランスが重要：
      </Typography>
      <BulletPoints
        items={[
          "短すぎる（500ms未満）：Skeletonがちらつく",
          "適切（500ms〜3秒）：スムーズな読み込み体験",
          "長すぎる（5秒以上）：エラー表示やタイムアウト処理を検討",
        ]}
      />
    </div>
  );
};

export default Pages;
