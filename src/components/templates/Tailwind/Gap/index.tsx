import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";

const Gap = () => {
  const useCaseList = [
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
      <BulletPoints items={useCaseList} style="number" />
      <Space />

      <Typography variant="h2">gap：要素間の間隔を調整</Typography>
      <Typography>
        <b>gapはFlexコンテナまたはGridコンテナでのみ有効</b>です。
        <br />
        親要素に<code>flex</code>や<code>grid</code>
        クラスがない場合、gapは効きません。
        <br />
        例えば<code>gap-4</code>は16px（1rem）です。
      </Typography>
      <Typography>
        <b>Flexで使う場合：</b>{" "}
        子要素同士の間隔が水平方向・垂直方向に均等に空きます。
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row gap-4">
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
        `}
      />
      <Typography>
        <b>Gridで使う場合：</b> 行・列の両方の間隔が均等に空きます。
      </Typography>
      <CodePreview
        code={`
  <div className="grid grid-cols-3 gap-4 ">
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
      `}
      />
      <Space />

      <Typography variant="h2">gap-x, gap-y：横・縦方向の個別指定</Typography>
      <Typography>
        <code>gap-x-*</code>で横方向、<code>gap-y-*</code>
        で縦方向の間隔を個別に指定できます。
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-col gap-y-4">
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
        `}
      />
      <Space />
    </div>
  );
};

export default Gap;
