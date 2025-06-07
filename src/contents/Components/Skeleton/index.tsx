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

const SkeletonComponent = () => {
  const [apiLoading, setApiLoading] = useState(false);

  // 汎用的な概念の説明
  const SkeletonConceptList = [
    "読み込み中のコンテンツの形状を事前に示すことで、ユーザーの期待値を設定",
    "従来のスピナーよりも具体的で情報量の多いローディング表示",
    "視覚的な継続性を保ち、コンテンツの突然の出現による画面のジャンプを防止",
    "ユーザーの認知負荷を軽減し、待ち時間の体感を短縮",
  ];

  const SkeletonUseCaseList = [
    "API からのデータフェッチ中の表示",
    "画像読み込み中のプレースホルダー",
    "ページ遷移時の初期表示状態",
    "無限スクロールでの新しいコンテンツ読み込み中",
    "フォーム送信後の処理待ち時間",
  ];

  const SkeletonBenefitsList = [
    "体感パフォーマンスの向上: 実際の読み込み時間以上に速く感じられる",
    "ユーザビリティの向上: 何が読み込まれるかが事前にわかる",
    "レイアウトシフトの防止: コンテンツ表示時の画面の揺れを防ぐ",
    "一貫したUX: ローディング状態にも統一感のあるデザインを適用可能",
  ];

  const SkeletonDesignPrinciplesList = [
    "実際のコンテンツと同じサイズと形状を保つ",
    "アニメーションは控えめに（必要に応じて無効化も検討）",
    "コンテンツの階層構造を反映した配置",
    "アクセシビリティを考慮した実装（スクリーンリーダー対応など）",
  ];

  // MUI固有の内容
  const SkeletonVariantList = ["text", "circular", "rectangular", "rounded"];

  const SkeletonAnimationList = [
    "pulse: 脈動するような透明度変化（デフォルト）",
    "wave: 左から右へ流れる波のような動き",
    "false: アニメーションなし（パフォーマンス重視）",
  ];
  useEffect(() => {
    // 初期化の必要があればここに記述
  }, []);

  const handleApiReload = () => {
    setApiLoading(true);
    setTimeout(() => {
      setApiLoading(false);
    }, 2000);
  };

  return (
    <div>
      <Typography>
        Skeletonは、データ読み込み中にコンテンツの形状を模擬表示することで、
        優れたユーザーエクスペリエンスを提供するUIパターンです。
        <br />
        従来のローディング表示と比較して、より情報量の多い待機状態を実現できます。
      </Typography>
      <Typography variant="h2" id="concept">
        Skeletonの基本概念
      </Typography>
      <Typography>Skeletonは以下の原理に基づいて設計されています：</Typography>
      <BulletPoints items={SkeletonConceptList} />
      <Typography variant="h3" id="vs-traditional">
        従来のローディング表示との違い
      </Typography>
      <Typography>
        従来のスピナーは「何かが読み込まれている」ことしか伝えませんが、
        Skeletonは「どのようなコンテンツが表示されるか」をユーザーに予期させることができます。
        <br />
        これにより、ユーザーの不安感を軽減し、より良いUXを提供できます。
      </Typography>
      <Typography variant="h3" id="benefits">
        Skeletonを使用する利点
      </Typography>
      <BulletPoints items={SkeletonBenefitsList} />
      <Typography variant="h3" id="use-cases">
        使用場面
      </Typography>
      <Typography>
        Skeletonは以下のような場面で効果的に使用できます：
      </Typography>
      <BulletPoints items={SkeletonUseCaseList} />
      <Typography variant="h3" id="design-principles">
        設計原則
      </Typography>
      <Typography>効果的なSkeletonを実装するための重要な原則：</Typography>
      <BulletPoints items={SkeletonDesignPrinciplesList} />
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          重要なポイント
        </Typography>
        ：Skeletonは単なるローディング表示ではなく、ユーザーに「次に何が起こるか」を
        適切に伝えるコミュニケーションツールとして捉えることが重要です。
      </Typography>
      <Typography variant="h2" id="mui-implementation">
        MUI実装
      </Typography>
      <Typography>
        以下では、Material-UIライブラリを使用したSkeletonコンポーネントの具体的な実装方法を説明します。
      </Typography>
      <Typography variant="h3" id="mui-basic">
        基本的な使用方法
      </Typography>
      <Typography>
        MUIのSkeletonコンポーネントは、variantプロパティで表示形状を指定できます：
      </Typography>
      <BulletPoints items={SkeletonVariantList} />
      <CodeBlock
        fileName="基本的な使用例"
        code={`{/* テキスト用 */}
<Skeleton variant="text" sx={{ fontSize: '1rem' }} />

{/* 円形（アバター用） */}
<Skeleton variant="circular" width={40} height={40} />

{/* 矩形（画像用） */}
<Skeleton variant="rectangular" width={210} height={118} />

{/* 角丸矩形（カード用） */}
<Skeleton variant="rounded" width={210} height={60} />`}
      />
      <Typography variant="h3" id="mui-variants">
        variantプロパティの詳細
      </Typography>
      <Typography variant="h4" id="text-variant">
        text バリアント
      </Typography>
      <Typography>
        テキストコンテンツの読み込み状態を表現。デフォルトでは1行分のテキストサイズで表示されます。
      </Typography>
      <CodePreview
        code={`<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
<Skeleton variant="text" sx={{ fontSize: '1.5rem' }} />
<Skeleton variant="text" width="60%" />`}
      />
      <Typography variant="h4" id="circular-variant">
        circular バリアント
      </Typography>
      <Typography>
        アバターやプロフィール画像など、円形要素の読み込み状態を表現します。
      </Typography>
      <CodePreview
        code={`<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="circular" width={60} height={60} />`}
      />
      <Typography variant="h4" id="rectangular-variant">
        rectangular バリアント
      </Typography>
      <Typography>
        画像やメディアコンテンツなど、矩形要素の読み込み状態を表現します。
      </Typography>
      <CodePreview
        code={`<Skeleton variant="rectangular" width={210} height={118} />
<Skeleton variant="rectangular" width="100%" height={200} />`}
      />
      <Typography variant="h4" id="rounded-variant">
        rounded バリアント
      </Typography>
      <Typography>
        カードや角丸のコンテナなど、角丸矩形要素の読み込み状態を表現します。
        sxプロパティのborderRadiusで角丸の角度を調整できます。
      </Typography>{" "}
      <CodePreview
        code={`{/* デフォルトの角丸 */}
<Skeleton variant="rounded" width={210} height={60} />

{/* カスタム角丸 */}
<Skeleton 
  variant="rectangular" 
  width={210} 
  height={60}
  sx={{ borderRadius: 2 }}  {/* 8px */}
/>`}
      />
      <Typography variant="h3" id="mui-animations">
        アニメーションの制御
      </Typography>
      <Typography>
        MUIのSkeletonでは、animationプロパティでアニメーションパターンを制御できます：
      </Typography>
      <BulletPoints items={SkeletonAnimationList} />
      <CodePreview
        code={`{/* デフォルト（pulse） */}
<Skeleton variant="text" />

{/* 波のようなアニメーション */}
<Skeleton variant="text" animation="wave" />

{/* アニメーションなし（パフォーマンス重視） */}
<Skeleton variant="text" animation={false} />`}
      />
      <Typography variant="h3" id="mui-realistic-example">
        実践的な実装例
      </Typography>
      <Typography>実際のカードコンポーネントでの使用例：</Typography>
      <Box
        sx={{
          border: "1px solid #e0e0e0",
          borderRadius: 1,
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Box sx={{ marginBottom: 2 }}>
          <Button
            variant="contained"
            onClick={handleApiReload}
            disabled={apiLoading}
          >
            {apiLoading ? "読み込み中..." : "カード読み込みデモ"}
          </Button>
        </Box>

        <Card sx={{ maxWidth: 345 }}>
          {apiLoading ? (
            <>
              <Skeleton variant="rectangular" width="100%" height={140} />
              <CardContent>
                <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
                <Skeleton variant="text" />
                <Skeleton variant="text" width="60%" />
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
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
                <Box
                  sx={{ display: "flex", alignItems: "center", marginTop: 2 }}
                >
                  <Avatar>A</Avatar>
                  <Box sx={{ marginLeft: 2 }}>
                    <Typography variant="body2">ユーザー名</Typography>
                    <Typography variant="caption">2024年6月4日</Typography>
                  </Box>
                </Box>
              </CardContent>
            </>
          )}
        </Card>
      </Box>
      <Typography variant="h3" id="mui-best-practices">
        MUIでのベストプラクティス
      </Typography>
      <Typography variant="h4" id="structure-consistency">
        実際のコンテンツ構造との一致
      </Typography>
      <Typography>
        Skeletonの最も重要なベストプラクティスは、{" "}
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          実際のコンポーネント内で、同じレイアウト構造を保ちながらコンテンツ部分のみをSkeletonに置き換える
        </Typography>
        ことです。
      </Typography>
      <CodeBlock
        fileName="構造を意識した実装"
        code={`{/* ✅ 良い例：同じコンテナ内でコンテンツのみを置き換え */}
<Typography variant="h5">
  {loading ? <Skeleton /> : title}
</Typography>
<Typography>
  {loading ? <Skeleton /> : description}
</Typography>
<Box sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
  {loading ? (
    <Skeleton variant="circular" width={40} height={40} />
  ) : (
    <Avatar src={avatar} />
  )}
  <Typography sx={{ marginLeft: 2 }}>
    {loading ? <Skeleton width="60%" /> : userName}
  </Typography>
</Box>

{/* ❌ 悪い例：構造を完全に分離 */}
{loading ? (
  <SkeletonComponent />
) : (
  <ActualComponent />
)}`}
      />
      <Typography variant="h3" id="mui-accessibility">
        アクセシビリティの考慮
      </Typography>
      <Typography>
        Skeletonは視覚的な要素のため、スクリーンリーダーには適切な情報を提供する必要があります：
      </Typography>
      <CodePreview
        code={`<Box aria-label="コンテンツを読み込み中">
  <Skeleton variant="text" />
  <Skeleton variant="text" />
  <Skeleton variant="text" width="60%" />
</Box>

// 読み込み状態の明示
<Box role="status" aria-live="polite">
  {loading ? (
    <>
      <span className="sr-only">読み込み中...</span>
      <Skeleton variant="text" />
    </>
  ) : (
    <Typography>{data.content}</Typography>
  )}
</Box>`}
      />
      <Typography variant="h3" id="performance-optimization">
        パフォーマンス最適化
      </Typography>
      <Typography>
        大量のSkeletonを表示する場合のパフォーマンス考慮事項：
      </Typography>
      <CodePreview
        code={`{/* 大量表示時はアニメーションを無効化 */}
{items.map((_, index) => (
  <Skeleton 
    key={index}
    animation={false}  {/* アニメーションを無効化 */}
    variant="text" 
  />
))}

{/* React.memoでの最適化 */}
const SkeletonItem = memo(() => (
  <Skeleton variant="rectangular" width={210} height={118} />
));`}
      />
      <Space />
      <Typography variant="h3">参考リンク</Typography>
      <div>
        <Link
          text="MUI公式のSkeletonページ"
          url="https://mui.com/material-ui/react-skeleton/"
        />
        <br />
        <Link
          text="Skeleton APIページ"
          url="https://mui.com/material-ui/api/skeleton/"
        />
        <br />
        <Link
          text="UXデザインにおけるSkeleton Screen"
          url="https://uxdesign.cc/what-you-should-know-about-skeleton-screens-a820c45a571a"
        />
      </div>
    </div>
  );
};

export default SkeletonComponent;
