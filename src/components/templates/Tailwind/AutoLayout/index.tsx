import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";

const AutoLayout = () => {
  return (
    <div>
      {/* --- 概要 --- */}
      <Typography>
        オートレイアウトは、Webページの構造や要素の並びを自動的に整える仕組み
        <br />
        Tailwindでは主に<b>Flexbox</b>と<b>Grid</b>の2つの方法がある
        <br />
        それぞれ得意分野が異なり、1次元の並びにはFlex、2次元のグリッド状にはGridが適している
      </Typography>
      <Space />
      <Link
        text="Tailwind CSS Flexbox公式ドキュメント"
        url="https://tailwindcss.com/docs/flex"
      />
      <Link
        text="Tailwind CSS Grid公式ドキュメント"
        url="https://tailwindcss.com/docs/grid"
      />
      <Space />

      {/* --- Flexbox --- */}
      <Typography variant="h2">Flexbox</Typography>
      <Typography>
        Flexboxは、Webレイアウトで最もよく使われる仕組みの一つ。
        <br />
        親要素に<code>flex</code>
        を指定するだけで、子要素が自動的に横並びや縦並びになり、空きスペースや間隔も柔軟に調整できる。
        <br />
        これにより、個別に位置やサイズを指定する手間が省け、保守やレスポンシブ対応が容易になる。
        <br />
        例えば、ボタンやカードを横一列に並べたい場合や、中央揃え・均等配置なども簡単に実現できる。
      </Typography>
      <Space />
      <Typography variant="h3">
        <b>最大の利点</b>
      </Typography>
      <Typography>
        <b>
          Flexの最大の利点は、要素同士の関係性をもとに自動的に整列・分配できる点。
          <br />
          これがない場合、すべての要素の位置やサイズを個別に指定する必要があり、レイアウトの保守や変更が難しくなる。
        </b>
      </Typography>
      <Space />
      <BulletPoints
        items={[
          "横並び・縦並びのレイアウト",
          "中央揃えや間隔調整",
          "可変幅・比率指定",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h3">flex-row / flex-col：並び方向</Typography>
      <Typography>
        デフォルトは横並び（<code>flex-row</code>）。縦並びにしたい場合は
        <code>flex-col</code>を使う。
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row gap-4 bg-gray-300 p-4">
    <div className="w-24 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-24 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-24 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
      `}
      />
      <CodePreview
        code={`
  <div className="flex flex-col gap-4 bg-gray-300 p-4">
    <div className="w-24 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-24 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-24 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
      `}
      />
      <Space />
      <Typography variant="h3">flex-wrap：折り返し</Typography>
      <Typography>
        <code>flex-wrap</code>
        を使うと、子要素が親要素の幅を超えたときに自動で折り返すことができる。
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-wrap gap-2 bg-gray-300 p-4" style={{ maxWidth: 300 }}>
    <div className="w-32 h-12 bg-blue-500 text-white flex items-center justify-center">1</div>
    <div className="w-32 h-12 bg-green-500 text-white flex items-center justify-center">2</div>
    <div className="w-32 h-12 bg-red-500 text-white flex items-center justify-center">3</div>
  </div>
      `}
      />
      <Space />
      <Typography variant="h3">grow / shrink / flex-1：伸縮の制御</Typography>
      <Typography>
        <code>grow</code>や<code>shrink</code>、<code>flex-1</code>
        を使うと、空きスペースの比率配分や縮小の可否を柔軟に制御できる。
        <br />
        例えば、中央の要素だけ空きスペースを埋めるようにしたい場合などに便利。
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row gap-4 bg-gray-300 p-4">
    <div className="w-24 h-12 bg-blue-500 text-white flex items-center justify-center">固定</div>
    <div className="flex-1 h-12 bg-green-500 text-white flex items-center justify-center">flex-1</div>
    <div className="w-24 h-12 bg-red-500 text-white flex items-center justify-center">固定</div>
  </div>
      `}
      />
      <Space />
      <Typography>
        配置（<code>justify-*</code>, <code>items-*</code>{" "}
        など）は詳細を「配置」ページ参照
      </Typography>
      <Space />

      {/* --- Grid --- */}
      <Typography variant="h2">Grid</Typography>
      <Typography>
        Gridは2次元（行・列）のレイアウトを柔軟に作れる手法。
        <br />
        カード一覧やダッシュボードなど、複雑なレイアウトに強い。
        <br />
        Flexと同様にgapや配置プロパティを活用できる。
      </Typography>
      <BulletPoints
        items={[
          "2次元のグリッド状レイアウト",
          "行・列のspanやgap調整",
          "複雑なカード配置",
        ]}
        style="number"
      />
      <Space />
      <Typography>基本例（3列グリッド）</Typography>
      <CodePreview
        code={`
  <div className="grid grid-cols-3 gap-4 bg-gray-300 p-4">
    <div className="h-12 bg-blue-500 text-white flex items-center justify-center">1</div>
    <div className="h-12 bg-green-500 text-white flex items-center justify-center">2</div>
    <div className="h-12 bg-red-500 text-white flex items-center justify-center">3</div>
  </div>
      `}
      />
      <Typography>行・列spanの例</Typography>
      <CodePreview
        code={`
  <div className="grid grid-cols-3 gap-4 bg-gray-300 p-4">
    <div className="col-span-2 h-12 bg-blue-500 text-white flex items-center justify-center">col-span-2</div>
    <div className="h-12 bg-green-500 text-white flex items-center justify-center">2</div>
    <div className="h-12 bg-red-500 text-white flex items-center justify-center">3</div>
  </div>
      `}
      />
      <Space />
      <Typography>
        配置（<code>justify-*</code>, <code>items-*</code>, <code>place-*</code>{" "}
        など）は詳細を「配置」ページ参照
      </Typography>
      <Space />

      {/* --- 使い分け --- */}
      <Typography variant="h2">FlexとGridの使い分け</Typography>
      <BulletPoints
        items={[
          "1次元の並びやシンプルなレイアウトはFlex",
          "2次元の複雑なグリッド状はGrid",
          "どちらもgapや配置プロパティが使える",
        ]}
        style="disc"
      />
      <Space />
      <Typography>
        どちらもレスポンシブ対応や間隔調整が得意だが、用途に応じて使い分ける。
        <br />
        配置や細かな整列は「配置」ページで詳しく解説
      </Typography>
      <Space />
      <Typography variant="h2">まとめ</Typography>
      <BulletPoints
        items={[
          "Flexは1次元、Gridは2次元のレイアウトに強い",
          "gapや配置プロパティで柔軟な調整が可能",
          "詳細な配置や整列は『配置』ページ参照",
        ]}
        style="disc"
      />
    </div>
  );
};

export default AutoLayout;
