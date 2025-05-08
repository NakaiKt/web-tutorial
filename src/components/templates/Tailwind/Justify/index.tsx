import { Typography, Alert } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";

const Justify = () => {
  const useCaseList = [
    "要素を左寄せ・中央寄せ・右寄せ・両端揃えなどにしたい",
    "横並びの要素の配置を柔軟にコントロールしたい",
    "レスポンシブに配置を変えたい",
  ];
  return (
    <div>
      <Typography>
        このページでは「要素の主軸方向の配置を調整する」場面でよく使うTailwindのjustify-contentについて
        <br />
        最新情報は
      </Typography>
      <Link
        text="Tailwind CSS Justify Content公式ドキュメント"
        url="https://tailwindcss.com/docs/justify-content"
      />
      <Link
        text="mdn web docs"
        url="https://developer.mozilla.org/ja/docs/Web/CSS/justify-content"
      />
      <Typography>を参照</Typography>

      <Typography variant="h2">よくあるユースケース</Typography>
      <BulletPoints items={useCaseList} style="number" />
      <Space />

      <Typography variant="h2">justify-content：主軸方向の配置</Typography>
      <Typography>
        <b>justify-contentはFlexコンテナまたはGridコンテナでのみ有効</b>
        <br />
        親要素に<code>flex</code>や<code>grid</code>
        クラスがない場合、justify-contentは効かない
      </Typography>
      <Typography>
        <b>Flexで使う場合：</b>{" "}
        主軸（横並びなら水平方向、縦並びなら垂直方向）の子要素の配置を制御
      </Typography>
      <Typography variant="h3">水平方向</Typography>
      <Alert severity="warning">
        親要素の幅が子要素の幅の合計より小さい場合，justify-contentは効かない
      </Alert>
      <Typography variant="h4">justify-start</Typography>
      <Typography>子要素を主軸の始めに配置</Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-start">
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
      <Typography variant="h4">justify-center</Typography>
      <Typography>子要素を主軸の中央に配置</Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-center">
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
      <Typography variant="h4">justify-end</Typography>
      <Typography>子要素を主軸の終わりに配置</Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-end">
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
      <Typography variant="h4">justify-between</Typography>
      <Typography>
        子要素を主軸の右端と左端に配置し，その間で均等に配置
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-between">
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
      <Typography variant="h4">justify-around</Typography>
      <Typography>
        子要素の数だけ均等なコンテナを用意し，それの中でそれぞれ中央配置
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-around">
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
      <Typography variant="h4">justify-evenly</Typography>
      <Typography>両端と子要素同士の間隔を均等に配置</Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-evenly">
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

      <Typography variant="h3">垂直方向</Typography>

      <Alert severity="warning">
        親要素の高さが子要素の合計の高さより低い場合，justify-contentは効かない
      </Alert>
      <Typography variant="h4">justify-start</Typography>
      <Typography>子要素を主軸の始めに配置</Typography>
      <CodePreview
        code={`
  <div className="flex flex-col h-72 justify-start">
    <div className="h-12 w-16 bg-blue-500 text-white flex items-center justify-center">
      A
    </div>
    <div className="h-12 w-16 bg-green-500 text-white flex items-center justify-center">
      B
    </div>
    <div className="h-12 w-16 bg-red-500 text-white flex items-center justify-center">
      C
    </div>
  </div>
      `}
      />

      <Typography variant="h4">justify-between</Typography>

      <Typography variant="h4">justify-between</Typography>
      <Typography>
        子要素を主軸の始めと終わりに配置し，その間で均等に配置
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-col h-72 justify-between">
    <div className="h-12 w-16 bg-blue-500 text-white flex items-center justify-center">
      A
    </div>
    <div className="h-12 w-16 bg-green-500 text-white flex items-center justify-center">
      B
    </div>
    <div className="h-12 w-16 bg-red-500 text-white flex items-center justify-center">
      C
    </div>
  </div>
      `}
      />

      <Typography variant="h2">Gridで使う場合</Typography>
      <Typography>
        <b>Gridで使う場合：</b> Grid全体の子要素の配置を制御する
      </Typography>
      <CodePreview
        code={`
  <div className="grid grid-cols-3 justify-center">
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
    </div>
  );
};

export default Justify;
