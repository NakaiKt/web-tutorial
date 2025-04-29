import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";

const Justify = () => {
  const usecaseList = [
    "要素を左寄せ・中央寄せ・右寄せ・両端揃えなどにしたい",
    "横並びの要素の配置を柔軟にコントロールしたい",
    "レスポンシブに配置を変えたい",
  ];
  const justifyList = [
    "justify-start: 左寄せ（デフォルト）",
    "justify-center: 中央寄せ",
    "justify-end: 右寄せ",
    "justify-between: 両端揃え（要素間の間隔を均等に）",
    "justify-around: 均等配置（要素の周りの間隔を均等に）",
    "justify-evenly: 均等配置（全ての間隔が等しい）",
  ];
  return (
    <div>
      <Typography>
        このページでは「要素の主軸方向の配置を調整する」場面でよく使うTailwindのjustify-contentについて徹底的に解説します。
        <br />
        最新情報は
      </Typography>
      <Link
        text="Tailwind CSS Justify Content公式ドキュメント"
        url="https://tailwindcss.com/docs/justify-content"
      />
      <Typography>を参照してください。</Typography>

      <Typography variant="h2">よくあるユースケース</Typography>
      <BulletPoints items={usecaseList} style="number" />
      <Space />

      <Typography variant="h2">justify-content：主軸方向の配置</Typography>
      <BulletPoints items={justifyList} />
      <Space />

      <Typography variant="h3">実際の表示例</Typography>
      <div className="flex flex-row justify-start gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          start
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          start
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          start
        </div>
      </div>
      <Typography>justify-start（左寄せ・デフォルト）</Typography>
      <div className="flex flex-row justify-center gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          center
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          center
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          center
        </div>
      </div>
      <Typography>justify-center（中央寄せ）</Typography>
      <div className="flex flex-row justify-end gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          end
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          end
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          end
        </div>
      </div>
      <Typography>justify-end（右寄せ）</Typography>
      <div className="flex flex-row justify-between gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          between
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          between
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          between
        </div>
      </div>
      <Typography>justify-between（両端揃え）</Typography>
      <div className="flex flex-row justify-around gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          around
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          around
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          around
        </div>
      </div>
      <Typography>justify-around（均等配置）</Typography>
      <div className="flex flex-row justify-evenly gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          evenly
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          evenly
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          evenly
        </div>
      </div>
      <Typography>justify-evenly（全ての間隔が等しい）</Typography>
      <CodeBlock
        fileName="Justify.tsx"
        code={`
<div className="flex justify-center">...</div>
<div className="flex justify-between">...</div>
<div className="flex justify-around">...</div>
<div className="flex justify-evenly">...</div>
        `}
      />
      <Space />

      <Typography variant="h2">まとめ</Typography>
      <Typography>
        justify-contentを使うことで、要素の主軸方向の配置を柔軟にコントロールできます。
        <br />
        レイアウトの見た目を大きく変える重要なプロパティなので、使い分けをしっかり覚えましょう。
      </Typography>
    </div>
  );
};

export default Justify;
