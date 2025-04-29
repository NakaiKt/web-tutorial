import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";

const Flex = () => {
  const usecaseList = [
    "要素を横並び・縦並びにきれいに並べたい",
    "要素の並び順や配置を柔軟にコントロールしたい",
    "レスポンシブに対応したい",
  ];
  return (
    <div>
      <Typography>
        このページでは「横並び・縦並びのレイアウトを作る」場面でよく使うTailwindのflexについて徹底的に解説します。
        <br />
        最新情報は
      </Typography>
      <Link
        text="Tailwind CSS Flexbox公式ドキュメント"
        url="https://tailwindcss.com/docs/flex"
      />
      <Typography>を参照してください。</Typography>

      <Typography variant="h2">よくあるユースケース</Typography>
      <BulletPoints items={usecaseList} style="number" />
      <Space />

      <Typography variant="h2">flex：横並び・縦並びの基本</Typography>
      <Typography>
        Tailwindで要素を横並び・縦並びにするには、親要素に<code>flex</code>
        クラスを指定します。
        <br />
        デフォルトは横並び（row）です。
      </Typography>
      <div className="flex flex-row gap-4 bg-gray-100 p-4">
        <div className="w-24 h-12 bg-blue-500 text-white flex items-center justify-center">
          A
        </div>
        <div className="w-24 h-12 bg-green-500 text-white flex items-center justify-center">
          B
        </div>
        <div className="w-24 h-12 bg-red-500 text-white flex items-center justify-center">
          C
        </div>
      </div>
      <CodeBlock
        fileName="Flex.tsx"
        code={`
<div className="flex">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
        `}
      />
      <Typography>
        <b>flex-col</b>を指定すると縦並びになります。
      </Typography>
      <div className="flex flex-col gap-4 bg-gray-100 p-4">
        <div className="w-24 h-12 bg-blue-500 text-white flex items-center justify-center">
          A
        </div>
        <div className="w-24 h-12 bg-green-500 text-white flex items-center justify-center">
          B
        </div>
        <div className="w-24 h-12 bg-red-500 text-white flex items-center justify-center">
          C
        </div>
      </div>
      <CodeBlock
        fileName="Flex.tsx"
        code={`
<div className="flex flex-col">
  <div>...</div>
  <div>...</div>
  <div>...</div>
</div>
        `}
      />
      <Space />

      <Typography variant="h2">flex-wrap：折り返し</Typography>
      <Typography>
        <code>flex-wrap</code>
        を使うと、子要素が親要素の幅を超えたときに自動で折り返すことができます。
      </Typography>
      <div
        className="flex flex-wrap gap-2 bg-gray-100 p-4"
        style={{ maxWidth: 300 }}
      >
        <div className="w-32 h-12 bg-blue-500 text-white flex items-center justify-center">
          1
        </div>
        <div className="w-32 h-12 bg-green-500 text-white flex items-center justify-center">
          2
        </div>
        <div className="w-32 h-12 bg-red-500 text-white flex items-center justify-center">
          3
        </div>
      </div>
      <CodeBlock
        fileName="Flex.tsx"
        code={`
<div className="flex flex-wrap">...</div>
        `}
      />
      <Space />

      <Typography variant="h2">まとめ</Typography>
      <Typography>
        flexを使いこなすことで、横並び・縦並び・折り返しなどのレイアウトを直感的に作成できます。
        <br />
        まずはflexとflex-direction、flex-wrapの基本を押さえましょう。
      </Typography>
    </div>
  );
};

export default Flex;
