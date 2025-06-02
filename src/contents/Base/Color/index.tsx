import { Typography, Alert, Box, Theme } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";
import CodeBlock from "@/components/parts/CodeBlock";

const Color = () => {
  const colorUseCases = [
    "Webページのブランディングや視覚的アイデンティティを確立したい",
    "ユーザーの注意を特定の要素に向けたい",
    "情報の分類や状態（成功、警告、エラーなど）を視覚的に伝えたい",
    "アクセシビリティを考慮した読みやすいコントラストを確保したい",
  ];

  const tailwindColorMethods = [
    "テキスト色: text-{color}-{shade}",
    "背景色: bg-{color}-{shade}",
    "境界線色: border-{color}-{shade}",
    "装飾色: decoration-{color}-{shade}",
  ];

  const muiColorMethods = [
    "Paletteテーマカラー: primary, secondary, error, warning, info, success",
    "テキストカラー: text.primary, text.secondary, text.disabled",
    "背景カラー: background.default, background.paper",
    "その他: divider, action.hover, action.focus など",
  ];

  const colorAccessibilityTips = [
    "コントラスト比: 通常テキストは4.5:1以上、大きいテキストは3:1以上を推奨",
    "色だけでなく形状やテキストでも情報を伝える",
    "色盲・色弱の方への配慮（カラーパレットの選択）",
    "ダークモード・ライトモードへの対応",
  ];
  // ダークモード対応の背景色スタイル（Tailwind色表示用）
  const colorBoxStyle = {
    bgcolor: (theme: Theme) =>
      theme.palette.mode === "dark" ? "grey.800" : "grey.200",
    px: 1,
    borderRadius: 1,
  };

  // ダークモード対応の背景色スタイル（MUIテキスト色表示用）
  const textColorBoxStyle = {
    p: 2,
    bgcolor: (theme: Theme) =>
      theme.palette.mode === "dark" ? "grey.900" : "grey.50",
    borderRadius: 1,
  };
  return (
    <div>
      <Typography>
        色はWebデザインにおいて最も重要な視覚要素の一つ。
        <br />
        Tailwind
        CSSとMUI（Material-UI）では、それぞれ異なるアプローチで色を管理・指定できる。
        <br />
        適切な色の選択により、ユーザビリティとアクセシビリティの向上を図ることが可能。
      </Typography>
      <Space />
      <Link
        text="Tailwind CSS Colors公式ドキュメント"
        url="https://tailwindcss.com/docs/customizing-colors"
      />
      <Link
        text="MUI Color公式ドキュメント"
        url="https://mui.com/material-ui/customization/color/"
      />{" "}
      <Space />
      <Typography variant="h2" id="use-cases">
        色を使う場面
      </Typography>
      <Typography>色指定は以下のような場面で重要な役割を果たす：</Typography>
      <BulletPoints items={colorUseCases} />
      <Space />
      <Typography variant="h2" id="tailwind-colors">
        Tailwind CSSでの色指定
      </Typography>
      <Typography>
        Tailwind
        CSSでは、事前定義された色パレットを使用してクラス名で色を指定する。
        <br />
        色名と数値（50〜950）の組み合わせで、明度を細かく調整できる。
      </Typography>
      <Typography variant="h3" id="tailwind-color-methods">
        主な色指定方法
      </Typography>
      <BulletPoints items={tailwindColorMethods} />
      <Space />{" "}
      <Typography variant="h4" id="tailwind-text-colors">
        テキスト色の指定
      </Typography>
      <Typography>
        <code>
          text-{"{color}"}-{"{shade}"}
        </code>
        クラスでテキストの色を指定する。
        <br />
        shadeが小さいほど明るく、大きいほど暗くなる。以下でcolorとshadeの関係を確認できる：
      </Typography>{" "}
      {/* Color and Shade Visualization */}
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "grey.900" : "grey.100",
          p: 3,
          borderRadius: 2,
          mb: 2,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          色とshadeの差分表示
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* Red variations */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: "80px", fontWeight: "bold" }}>
              Red:
            </Typography>{" "}
            <Box
              className="text-red-300"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                px: 1,
                borderRadius: 1,
              }}
            >
              text-red-300
            </Box>
            <Box
              className="text-red-500"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                px: 1,
                borderRadius: 1,
              }}
            >
              text-red-500
            </Box>{" "}
            <Box
              className="text-red-700"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                px: 1,
                borderRadius: 1,
              }}
            >
              text-red-700
            </Box>
            <Box
              className="text-red-900"
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "grey.800" : "grey.200",
                px: 1,
                borderRadius: 1,
              }}
            >
              text-red-900
            </Box>
          </Box>{" "}
          {/* Blue variations */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: "80px", fontWeight: "bold" }}>
              Blue:
            </Typography>
            <Box className="text-blue-300" sx={colorBoxStyle}>
              text-blue-300
            </Box>
            <Box className="text-blue-500" sx={colorBoxStyle}>
              text-blue-500
            </Box>
            <Box className="text-blue-700" sx={colorBoxStyle}>
              text-blue-700
            </Box>
            <Box className="text-blue-900" sx={colorBoxStyle}>
              text-blue-900
            </Box>
          </Box>{" "}
          {/* Green variations */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: "80px", fontWeight: "bold" }}>
              Green:
            </Typography>
            <Box className="text-green-300" sx={colorBoxStyle}>
              text-green-300
            </Box>
            <Box className="text-green-500" sx={colorBoxStyle}>
              text-green-500
            </Box>
            <Box className="text-green-700" sx={colorBoxStyle}>
              text-green-700
            </Box>
            <Box className="text-green-900" sx={colorBoxStyle}>
              text-green-900
            </Box>
          </Box>
        </Box>
      </Box>
      <CodePreview
        code={`
  {/* 基本的なテキスト色 */}
  <p className="text-red-500">赤色のテキスト</p>
  <p className="text-blue-600">青色のテキスト</p>
  <p className="text-green-700">緑色のテキスト</p>
  
  {/* 明度の違い */}
  <p className="text-gray-300">薄いグレー</p>
  <p className="text-gray-600">中間のグレー</p>
  <p className="text-gray-900">濃いグレー</p>
        `}
      />
      <Space />{" "}
      <Typography variant="h4" id="tailwind-background-colors">
        背景色の指定
      </Typography>
      <Typography>
        <code>
          bg-{"{color}"}-{"{shade}"}
        </code>
        クラスで背景色を指定する。
        <br />
        色の明度を使い分けることで、階層構造や重要度を表現できる。
      </Typography>
      <CodePreview
        code={`
  {/* 基本的な背景色 */}
  <div className="bg-red-100 p-4 mb-2">薄い赤の背景</div>
  <div className="bg-red-500 p-4 mb-2 text-white">中間の赤の背景</div>
  <div className="bg-red-900 p-4 mb-2 text-white">濃い赤の背景</div>
  
  {/* 実用的な組み合わせ */}
  <div className="bg-blue-50 border border-blue-200 p-4 rounded">
    <p className="text-blue-800">情報表示エリア</p>
  </div>
        `}
      />
      <Space />{" "}
      <Typography variant="h4" id="tailwind-border-colors">
        境界線色の指定
      </Typography>
      <Typography>
        <code>
          border-{"{color}"}-{"{shade}"}
        </code>
        クラスで境界線の色を指定する。
        <br />
        背景色と調和する色を選ぶことで、洗練されたデザインを作成できる。
      </Typography>
      <CodePreview
        code={`
  {/* 基本的な境界線 */}
  <div className="border border-gray-300 p-4 mb-2">デフォルトの境界線</div>
  <div className="border-2 border-blue-500 p-4 mb-2">太い青の境界線</div>
  
  {/* 色の組み合わせ */}
  <div className="bg-green-50 border border-green-300 p-4 rounded">
    <p className="text-green-800">成功メッセージ</p>
  </div>
        `}
      />
      <Space />{" "}
      <Typography variant="h4" id="tailwind-color-variants">
        色のバリエーション
      </Typography>
      <Typography>
        Tailwindでは以下の色が標準で用意されている。それぞれ50〜950の明度が利用可能：
      </Typography>
      <BulletPoints
        items={[
          "基本色: red, blue, green, yellow, purple, pink, indigo など",
          "グレースケール: gray, slate, zinc, neutral, stone",
          "特殊色: black, white, transparent, current",
        ]}
      />
      {/* 全色のプレビュー表示 */}
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          mb: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          全色パレットのプレビュー
        </Typography>

        {/* Red */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Red
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-red-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-red-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Blue */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Blue
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-blue-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-blue-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Green */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Green
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-green-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-green-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Yellow */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Yellow
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-yellow-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-yellow-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Purple */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Purple
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-purple-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-purple-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Pink */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Pink
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-pink-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-pink-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Gray */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Gray
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Box
              className="w-12 h-12 bg-gray-50 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                50
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-100 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                100
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-200 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                200
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-300 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="caption" sx={{ fontSize: "10px" }}>
                300
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-400 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                400
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-500 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                500
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-600 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                600
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-700 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                700
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-800 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                800
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-900 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                900
              </Typography>
            </Box>
            <Box
              className="w-12 h-12 bg-gray-950 border"
              sx={{
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ fontSize: "10px", color: "white" }}
              >
                950
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Space />
      {/* MUI Section */}{" "}
      <Typography variant="h2" id="mui-colors">
        MUIでの色指定
      </Typography>
      <Typography>
        MUI（Material-UI）では、テーマシステムを通じて色を管理する。
        <br />
        事前定義されたパレットカラーを使用することで、一貫性のある配色を保つ。
      </Typography>
      <Typography variant="h3" id="mui-color-methods">
        主な色指定方法
      </Typography>
      <BulletPoints items={muiColorMethods} />
      <Space />{" "}
      <Typography variant="h4" id="mui-palette-colors">
        パレットカラーの使用
      </Typography>
      <Typography>
        MUIのテーマには6つの主要なパレットカラーが定義されている。
        <br />
        これらの色は <code>sx</code> プロパティやコンポーネントの{" "}
        <code>color</code> プロパティで使用できる。
      </Typography>
      <Space />
      <Link
        text="MUI Color公式ドキュメント"
        url="https://mui.com/material-ui/customization/color/"
      />
      <Link
        text="MUI Color Palette公式ドキュメント"
        url="https://mui.com/material-ui/customization/palette/"
      />
      <CodePreview
        code={`
  {/* sxプロパティでの色指定 */}
  <Box sx={{ color: 'primary.main' }}>プライマリーカラーのテキスト</Box>
  <Box sx={{ bgcolor: 'secondary.main', color: 'white', p: 2 }}>
    セカンダリーカラーの背景
  </Box>
  
  {/* コンポーネントのcolorプロパティ */}
  <Button color="primary">プライマリーボタン</Button>
  <Button color="error">エラーボタン</Button>
  <Typography color="success.main">成功メッセージ</Typography>
        `}
      />
      <Space />{" "}
      <Typography variant="h4" id="mui-text-colors">
        テキストカラーの指定
      </Typography>
      <Typography>
        MUIでは、テキストの階層と読みやすさを考慮した3段階のテキストカラーが用意されている。
        <br />
        これらを適切に使い分けることで、情報の重要度を視覚的に表現できる。
      </Typography>
      {/* MUI Text Color Demonstration */}
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          mb: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          MUIテキストカラーの階層
        </Typography>{" "}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={textColorBoxStyle}>
            <Typography color="text.primary" sx={{ fontWeight: "bold" }}>
              text.primary - メインテキスト（最も重要な情報）
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              通常のコンテンツで最も読みやすく、目立つテキスト
            </Typography>
          </Box>

          <Box sx={textColorBoxStyle}>
            <Typography color="text.secondary">
              text.secondary - サブテキスト（補足情報）
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              補足説明や詳細情報に使用、少し控えめな表示
            </Typography>
          </Box>

          <Box sx={textColorBoxStyle}>
            <Typography color="text.disabled">
              text.disabled - 無効なテキスト（非アクティブ状態）
            </Typography>
            <Typography variant="caption" sx={{ color: "text.secondary" }}>
              無効化されたコンポーネントや使用できない機能の表示
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="h5" sx={{ mt: 2, mb: 1 }}>
        MUIのcolor[shade]記法
      </Typography>
      <Typography sx={{ mb: 2 }}>
        MUIでは、<code>color[shade]</code>の形式で色の明度を指定できる。
        <br />
        例：<code>primary[500]</code>、<code>red[900]</code>、
        <code>blue[200]</code> など
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          mb: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          color[shade]記法の例
        </Typography>{" "}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "bold" }}>
              Primary:
            </Typography>
            <Box sx={{ color: "primary.light", ...colorBoxStyle }}>
              primary.light
            </Box>
            <Box sx={{ color: "primary.main", ...colorBoxStyle }}>
              primary.main
            </Box>
            <Box sx={{ color: "primary.dark", ...colorBoxStyle }}>
              primary.dark
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "bold" }}>
              Error:
            </Typography>
            <Box sx={{ color: "error.light", ...colorBoxStyle }}>
              error.light
            </Box>
            <Box sx={{ color: "error.main", ...colorBoxStyle }}>error.main</Box>
            <Box sx={{ color: "error.dark", ...colorBoxStyle }}>error.dark</Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography sx={{ minWidth: "120px", fontWeight: "bold" }}>
              Success:
            </Typography>
            <Box sx={{ color: "success.light", ...colorBoxStyle }}>
              success.light
            </Box>
            <Box sx={{ color: "success.main", ...colorBoxStyle }}>
              success.main
            </Box>
            <Box sx={{ color: "success.dark", ...colorBoxStyle }}>
              success.dark
            </Box>
          </Box>
        </Box>
      </Box>
      <CodePreview
        code={`
  {/* テキストカラーの階層 */}
  <Typography color="text.primary">
    メインテキスト（最も重要な情報）
  </Typography>
  <Typography color="text.secondary">
    サブテキスト（補足情報）
  </Typography>
  <Typography color="text.disabled">
    無効なテキスト（非アクティブ状態）
  </Typography>
  
  {/* sxプロパティでの使用 */}
  <Box sx={{ color: 'text.primary' }}>重要な情報</Box>
  <Box sx={{ color: 'text.secondary' }}>追加の説明</Box>
  
  {/* color[shade]記法の使用例 */}
  <Typography sx={{ color: 'primary.light' }}>薄いプライマリー色</Typography>
  <Typography sx={{ color: 'primary.main' }}>標準プライマリー色</Typography>
  <Typography sx={{ color: 'primary.dark' }}>濃いプライマリー色</Typography>
  <Typography sx={{ color: 'error[700]' }}>エラー色の700番</Typography>
        `}
      />
      <Space />{" "}
      <Typography variant="h4" id="mui-background-colors">
        背景色の指定
      </Typography>
      <Typography>
        MUIの背景色は、アプリケーションの視覚的階層を作るために設計されている。
        <br />
        <code>background.default</code> は画面全体の背景、
        <code>background.paper</code> はカードやパネルの背景に使用する。
      </Typography>
      <CodePreview
        code={`
  {/* 背景色の使い分け */}
  <Box sx={{ bgcolor: 'background.default', p: 3 }}>
    <Paper sx={{ bgcolor: 'background.paper', p: 2, mb: 2 }}>
      <Typography>カードコンテンツ</Typography>
    </Paper>
    <Paper sx={{ bgcolor: 'background.paper', p: 2 }}>
      <Typography>もう一つのカード</Typography>
    </Paper>
  </Box>
  
  {/* カスタム背景色 */}
  <Box sx={{ bgcolor: 'primary.light', p: 2, borderRadius: 1 }}>
    <Typography color="primary.contrastText">
      プライマリーライトの背景
    </Typography>
  </Box>
        `}
      />
      <Space />{" "}
      <Typography variant="h4" id="mui-theme-customization">
        テーマのカスタマイズ
      </Typography>
      <Typography>
        プロジェクト固有の色を使用したい場合は、テーマをカスタマイズできる。
        <br />
        独自のカラーパレットを定義することで、ブランドアイデンティティを反映できる。
      </Typography>
      <CodeBlock
        language="typescript"
        code={`import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',      // メインカラー
      light: '#42a5f5',     // ライトバリアント
      dark: '#1565c0',      // ダークバリアント
      contrastText: '#fff'  // コントラストテキスト
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#bb002f',
      contrastText: '#fff'
    },
    // カスタムカラーの追加
    tertiary: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#388e3c',
      contrastText: '#fff'
    },
    // テキストカラーのカスタマイズ
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0, 0, 0, 0.38)',
    },
    // 背景色のカスタマイズ
    background: {
      default: '#fafafa',
      paper: '#fff',
    }
  }
});

// カスタムテーマの使用例
export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Typography color="primary.main">カスタムプライマリー色</Typography>
      <Typography color="tertiary.main">カスタム第三色</Typography>
    </ThemeProvider>
  );
}`}
      />{" "}
      <Alert severity="info" sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          💡 テーマカスタマイズのポイント
        </Typography>
        <BulletPoints
          items={[
            "main, light, dark, contrastTextの4つの値をセットで定義する",
            "contrastTextは背景色に対して読みやすいテキスト色を指定",
            "カスタムカラーを追加する場合は型定義の拡張も必要",
            "アクセシビリティを考慮したコントラスト比を保つ",
          ]}
          style="disc"
          color="info"
        />
      </Alert>
      <Space />
      <Typography variant="h5" sx={{ mt: 3, mb: 1 }}>
        Material Colorパレットの使用
      </Typography>
      <Typography sx={{ mb: 2 }}>
        MUIでは、Material Designの標準カラーパレットも利用できる。
        <br />
        <code>@mui/material/colors</code> から色をインポートして使用する。
      </Typography>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          mb: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Material Color の使用例
        </Typography>

        {/* Red material colors */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Red Material Colors
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ minWidth: "80px" }}>
              red[500]:
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#f44336",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontSize: "10px" }}
              >
                500
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ minWidth: "80px" }}>
              red[900]:
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#b71c1c",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontSize: "10px" }}
              >
                900
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Green material colors */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Green Material Colors
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ minWidth: "80px" }}>
              green[500]:
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#4caf50",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontSize: "10px" }}
              >
                500
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ minWidth: "80px" }}>
              green[900]:
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#1b5e20",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontSize: "10px" }}
              >
                900
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Blue material colors */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: "bold" }}>
            Blue Material Colors
          </Typography>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" sx={{ minWidth: "80px" }}>
              blue[500]:
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#2196f3",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontSize: "10px" }}
              >
                500
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ minWidth: "80px" }}>
              blue[900]:
            </Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                bgcolor: "#0d47a1",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: "white", fontSize: "10px" }}
              >
                900
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <CodeBlock
        code={`
  // Material Colorのインポートと使用
  import { red, green, blue } from '@mui/material/colors';
  
  // sx プロパティでの使用
  <Box sx={{ bgcolor: red[500], color: 'white', p: 2 }}>
    Material Design Red 500
  </Box>
  <Box sx={{ bgcolor: green[900], color: 'white', p: 2 }}>
    Material Design Green 900
  </Box>
  <Box sx={{ bgcolor: blue[200], color: 'black', p: 2 }}>
    Material Design Blue 200
  </Box>
  
  // テーマでの使用
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[500],
      },
      secondary: {
        main: red[500],
      },
    },
  });
        `}
      />
      <Space />
      {/* Comparison Section */}{" "}
      <Typography variant="h2" id="comparison">
        TailwindとMUIの色指定の比較
      </Typography>
      <Typography>
        TailwindとMUIの色指定には、それぞれ異なる特徴と適用場面がある：
      </Typography>
      <Typography variant="h3" id="tailwind-advantages">
        Tailwindの特徴
      </Typography>
      <BulletPoints
        items={[
          "シンプルで直感的なクラス名",
          "豊富な色のバリエーション（50〜950の明度）",
          "HTMLに直接記述できる手軽さ",
          "細かい調整が容易",
        ]}
        color="info"
      />
      <Typography variant="h3" id="mui-advantages">
        MUIの特徴
      </Typography>
      <BulletPoints
        items={[
          "テーマシステムによる一元管理",
          "アクセシビリティを考慮した配色",
          "ダークモード対応が標準",
          "Material Designに基づいた統一感",
        ]}
        color="success"
      />
      <Space />{" "}
      <Typography variant="h3" id="practical-combination">
        実際の組み合わせ例
      </Typography>
      <Typography>
        プロジェクトでは、TailwindとMUIを併用することも可能。
        <br />
        以下は実用的な組み合わせ例：
      </Typography>
      <CodePreview
        code={`
  {/* MUIコンポーネント + Tailwindクラス */}
  <Button 
    variant="contained" 
    color="primary"
    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
  >
    グラデーションボタン
  </Button>
  
  {/* MUIテーマ色 + Tailwind装飾 */}
  <Box 
    sx={{ bgcolor: 'primary.main' }}
    className="rounded-lg shadow-lg"
  >
    <Typography color="primary.contrastText" className="p-4">
      MUIテーマ色とTailwindの装飾
    </Typography>
  </Box>
        `}
      />
      <Space />
      {/* Accessibility Section */}
      <Typography variant="h2" id="accessibility">
        色のアクセシビリティ
      </Typography>{" "}
      <Alert severity="info" sx={{ mb: 2 }}>
        アクセシブルな色の使用は、すべてのユーザーにとって重要。 WCAG（Web
        Content Accessibility Guidelines）に準拠した色選択を心がけよう。
      </Alert>
      <Typography variant="h3" id="accessibility-guidelines">
        アクセシビリティガイドライン
      </Typography>
      <BulletPoints items={colorAccessibilityTips} />
      <Space />{" "}
      <Typography variant="h4" id="contrast-ratio">
        コントラスト比の確保
      </Typography>
      <Typography>
        テキストと背景の間に十分なコントラスト比を保つことで、視覚的な読みやすさを確保できる。
        <br />
        以下は良い例と悪い例の比較：
      </Typography>
      {/* Contrast Demonstration */}
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 3,
          borderRadius: 2,
          mb: 2,
          border: 1,
          borderColor: "divider",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "success.dark" }}>
          ✅ 良い例: 十分なコントラスト
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{
              bgcolor: "#ffffff",
              color: "#1a1a1a",
              p: 2,
              borderRadius: 1,
              border: 1,
              borderColor: "divider",
            }}
          >
            黒に近いテキスト + 白背景（コントラスト比: 16.74:1）
          </Box>
          <Box
            sx={{ bgcolor: "#1565c0", color: "#ffffff", p: 2, borderRadius: 1 }}
          >
            白テキスト + 濃い青背景（コントラスト比: 8.59:1）
          </Box>
          <Box
            sx={{ bgcolor: "#2e7d32", color: "#ffffff", p: 2, borderRadius: 1 }}
          >
            白テキスト + 濃い緑背景（コントラスト比: 7.31:1）
          </Box>
        </Box>

        <Typography variant="h6" sx={{ mt: 3, mb: 2, color: "error.dark" }}>
          ❌ 悪い例: コントラストが不十分
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box
            sx={{ bgcolor: "#bdbdbd", color: "#9e9e9e", p: 2, borderRadius: 1 }}
          >
            薄いグレーテキスト + 中間グレー背景（コントラスト比: 1.54:1 -
            読みにくい）
          </Box>
          <Box
            sx={{ bgcolor: "#fff59d", color: "#ffeb3b", p: 2, borderRadius: 1 }}
          >
            薄い黄色テキスト + 黄色背景（コントラスト比: 1.02:1 -
            非常に読みにくい）
          </Box>
          <Box
            sx={{ bgcolor: "#e3f2fd", color: "#bbdefb", p: 2, borderRadius: 1 }}
          >
            薄い青テキスト + 薄い青背景（コントラスト比: 1.25:1 - 読みにくい）
          </Box>
        </Box>
      </Box>{" "}
      <CodePreview
        code={`
  {/* ✅ 良い例: 十分なコントラスト */}
  <div className="bg-white text-gray-900 p-4 mb-2">
    黒に近いテキスト + 白背景（高コントラスト）
  </div>
  <div className="bg-blue-600 text-white p-4 mb-2">
    白テキスト + 濃い青背景（高コントラスト）
  </div>
  
  {/* ❌ 悪い例: コントラストが不十分 */}
  <div className="bg-gray-400 text-gray-500 p-4 mb-2">
    薄いグレーテキスト + 中間グレー背景（低コントラスト）
  </div>
  <div className="bg-yellow-300 text-yellow-400 p-4">
    薄い黄色テキスト + 黄色背景（低コントラスト）
  </div>
        `}
      />
      <Space />
      <Typography variant="h4" id="color-blind-considerations">
        色覚多様性への配慮
      </Typography>
      <Typography>
        色だけでなく、形状やアイコン、テキストラベルを併用することで、
        色の識別が困難な方にも情報を伝えることができる。
      </Typography>
      <CodePreview
        code={`
  {/* ✅ 良い例: 色 + アイコン + テキスト */}
  <div className="flex gap-4">
    <div className="bg-green-100 border border-green-500 p-3 rounded flex items-center gap-2">
      <CheckCircleIcon color="success" />
      <span className="text-green-800">成功</span>
    </div>
    <div className="bg-red-100 border border-red-500 p-3 rounded flex items-center gap-2">
      <ErrorIcon color="error" />
      <span className="text-red-800">エラー</span>
    </div>
  </div>
  
  {/* ❌ 悪い例: 色のみで情報を伝達 */}
  <div className="flex gap-4">
    <div className="bg-green-500 p-3 rounded"></div>
    <div className="bg-red-500 p-3 rounded"></div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h2" id="best-practices">
        色使いのベストプラクティス
      </Typography>{" "}
      <Typography variant="h3" id="color-hierarchy">
        色による情報階層の作成
      </Typography>
      <Typography>
        色の明度や彩度を調整することで、情報の重要度を視覚的に表現できる。
      </Typography>
      <BulletPoints
        items={[
          "最重要情報: 高彩度・高コントラストの色",
          "重要情報: 中程度の彩度・コントラストの色",
          "補足情報: 低彩度・低コントラストの色",
          "無効・非アクティブ: グレースケールまたは極低彩度",
        ]}
      />
      <Space />{" "}
      <Typography variant="h3" id="consistent-color-usage">
        一貫した色の使用
      </Typography>
      <Typography>
        アプリケーション全体で色の意味を統一することで、ユーザーの学習負荷を軽減できる。
      </Typography>
      <BulletPoints
        items={[
          "成功: 緑系統の色で統一",
          "警告: 黄色・オレンジ系統で統一",
          "エラー: 赤系統の色で統一",
          "情報: 青系統の色で統一",
        ]}
      />
      <Space />{" "}
      <Typography variant="h2" id="summary">
        まとめ
      </Typography>
      <Typography>
        色は、Webデザインにおいてユーザーエクスペリエンスを大きく左右する要素。
        <br />
        TailwindとMUIそれぞれの特徴を理解し、プロジェクトの要件に応じて適切に選択することが重要。
      </Typography>
      <BulletPoints
        items={[
          "Tailwind: 直感的で自由度の高い色指定",
          "MUI: テーマベースの一貫した色管理",
          "アクセシビリティを常に考慮した色選択",
          "色だけでなく、形状やテキストでも情報を補完",
        ]}
        style="check"
        color="success"
      />
      <Space />
    </div>
  );
};

export default Color;
