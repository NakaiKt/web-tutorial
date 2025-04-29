import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodeBlock from "@/components/parts/CodeBlock";
import Link from "@/components/parts/Link";

const Gap = () => {
  const usecaseList = [
    "要素間のスペースを簡単に調整したい",
    "横方向・縦方向で異なる間隔を指定したい",
    "GridやFlex両方で使いたい",
  ];
  return (
    <div>
      <Typography>
        このページでは「要素間の間隔を調整する」場面でよく使うTailwindのgapについて徹底的に解説します。
        <br />
        最新情報は
      </Typography>
      <Link
        text="Tailwind CSS Gap公式ドキュメント"
        url="https://tailwindcss.com/docs/gap"
      />
      <Typography>を参照してください。</Typography>

      <Typography variant="h2">よくあるユースケース</Typography>
      <BulletPoints items={usecaseList} style="number" />
      <Space />

      <Typography variant="h2">gap：要素間の間隔を調整</Typography>
      <Typography>
        <code>gap</code>クラスを使うと、要素間のスペースを簡単に調整できます。
        <br />
        例えば<code>gap-4</code>は16px（1rem）です。
      </Typography>
      <div className="flex flex-row gap-2 bg-gray-100 p-4">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          gap-2
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          gap-2
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          gap-2
        </div>
      </div>
      <div className="flex flex-row gap-8 bg-gray-100 p-4 mt-2">
        <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
          gap-8
        </div>
        <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
          gap-8
        </div>
        <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
          gap-8
        </div>
      </div>
      <CodeBlock
        fileName="Gap.tsx"
        code={`
<div className="flex gap-2">...</div>
<div className="flex gap-8">...</div>
        `}
      />
      <Space />

      <Typography variant="h2">gap-x, gap-y：横・縦方向の個別指定</Typography>
      <Typography>
        <code>gap-x-*</code>で横方向、<code>gap-y-*</code>
        で縦方向の間隔を個別に指定できます。
      </Typography>
      <div className="flex flex-col gap-y-4 bg-gray-100 p-4">
        <div className="flex flex-row gap-x-8">
          <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
            A
          </div>
          <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
            B
          </div>
          <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
            C
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">
            A
          </div>
          <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">
            B
          </div>
          <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">
            C
          </div>
        </div>
      </div>
      <CodeBlock
        fileName="Gap.tsx"
        code={`
<div className="flex gap-x-8 gap-y-4">...</div>
        `}
      />
      <Space />

      <Typography variant="h2">Gridでも使える</Typography>
      <Typography>
        <code>gap</code>
        はFlexboxだけでなく、Gridレイアウトでも同じように使えます。
      </Typography>
      <div className="grid grid-cols-3 gap-4 bg-gray-100 p-4">
        <div className="h-12 bg-blue-500 text-white flex items-center justify-center">
          1
        </div>
        <div className="h-12 bg-green-500 text-white flex items-center justify-center">
          2
        </div>
        <div className="h-12 bg-red-500 text-white flex items-center justify-center">
          3
        </div>
      </div>
      <CodeBlock
        fileName="Gap.tsx"
        code={`
<div className="grid grid-cols-3 gap-4">...</div>
        `}
      />
      <Space />

      <Typography variant="h2">まとめ</Typography>
      <Typography>
        gapを使うことで、要素間のスペース調整が非常に簡単になります。
        <br />
        横・縦・Gridなど、さまざまな場面で活用しましょう。
      </Typography>
    </div>
  );
};

export default Gap;
