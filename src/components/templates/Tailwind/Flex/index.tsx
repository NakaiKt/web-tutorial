import { Typography } from "@mui/material";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import Link from "@/components/parts/Link";
import CodePreview from "@/components/parts/CodePreview";

const Flex = () => {
  const useCaseList = [
    "要素を横並び・縦並びにきれいに並べたい",
    "要素の並び順や配置を柔軟にコントロールしたい",
    "レスポンシブに対応したい",
  ];
  return (
    <div>
      <Typography>
        このページでは「横並び・縦並びのレイアウトを作る」場面でよく使う
        Tailwindのflexを扱う
        <br />
        Flexは単に横並び・縦並びを実現するだけでなく、
        <br />
        <b>要素同士の関係性をもとに自動的に整列・分配するための仕組み</b>
      </Typography>
      <Space />
      <Typography>
        これがない場合、すべての要素の位置やサイズを個別に指定する必要があり、保守やレスポンシブ対応が難しくなる
        <br />
        Flexを使うことで、親要素にflexを指定するだけで、子要素が自動的にきれいに並び、空きスペースや間隔も柔軟に調整できる
        <br />
        これがFlexの最大の利点
      </Typography>
      <Space />
      <Typography>最新情報は</Typography>
      <Link
        text="Tailwind CSS Flexbox公式ドキュメント"
        url="https://tailwindcss.com/docs/flex"
      />

      <Typography variant="h2">よくあるユースケース</Typography>
      <BulletPoints items={useCaseList} style="number" />
      <Space />

      <Typography variant="h2">flex：横並び・縦並びの基本</Typography>
      <Typography>
        Tailwindで要素を横並び・縦並びにするには、親要素に<code>flex</code>
        クラスを指定する
        <br />
        デフォルトは横並び（row）
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row gap-4">
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
        `}
      />
      <Typography>
        <b>flex-col</b>を指定すると縦並びになる
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-col gap-4">
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
        `}
      />

      <Space />

      <Typography variant="h2">flex-wrap：折り返し</Typography>
      <Typography>
        <code>flex-wrap</code>
        を使うと、子要素が親要素の幅を超えたときに自動で折り返すことができる
      </Typography>
      <CodePreview
        code={`
  <div
    className="flex flex-wrap gap-2"
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
        `}
      />

      <Space />

      <Typography variant="h2">flex-grow / flex-shrink：伸縮の制御</Typography>

      <Typography variant="h3">flex-grow：拡大の制御</Typography>
      <Typography>
        <code>flex-grow</code>
        は、空きスペースがあるときに子要素をどれだけ拡大するかを制御するプロパティ
        <br />
        Tailwindでは<code>flex-1</code>や<code>grow</code>、<code>grow-0</code>
        などのユーティリティクラスで指定できる
        <br />
        <b>
          flex-1やgrow-2などの数字は「比率」を表し、複数の要素で比率に応じて空きスペースを分配できる
        </b>
        <br />
        例：<code>flex-1</code>は
        <code>flex-grow:1; flex-shrink:1; flex-basis:0%</code>と同じ意味
      </Typography>
      <BulletPoints
        items={[
          "growを使うと、空きスペースを自動で埋める要素を作れる（flex-1, grow, grow-2 など）",
          "複数のflex-1やflex-2を組み合わせると、比率でスペース配分できる",
          "レイアウトの比率や優先度を柔軟に調整したい場合に便利",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="flex flex-row gap-4 bg-gray-300 p-4 mb-2">
    <div className="w-24 h-12 bg-blue-500 text-white flex items-center justify-center">
      固定
    </div>
    <div className="flex-1 h-12 bg-green-500 text-white flex items-center justify-center">
      flex-1（空きスペースを埋める）
    </div>
    <div className="w-24 h-12 bg-red-500 text-white flex items-center justify-center">
      固定
    </div>
  </div>
        `}
      />
      <Space />

      <Typography variant="h3">flex-shrink：縮小の制御</Typography>
      <Typography>
        <code>flex-shrink</code>
        は、親要素が小さくなったときに子要素をどれだけ縮小するかを制御するプロパティ
        <br />
        Tailwindでは<code>shrink</code>や<code>shrink-0</code>
        などのユーティリティクラスで指定できる
        <br />
        <b>
          shrink-0は縮小しない、shrinkは縮小を許可する。数字を増やすと縮小の比率が大きくなる
        </b>
      </Typography>
      <BulletPoints
        items={[
          "shrinkを使うと、親要素が狭くなったときに要素の縮小を許可・禁止できる（shrink, shrink-0 など）",
          "shrink-0を使うと、要素の幅を絶対に縮めたくない場合に便利",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div
    className="flex flex-row gap-4 bg-gray-300 p-4 mb-2"
    style={{ width: 300 }}
  >
    <div className="w-48 shrink-0 h-12 bg-blue-500 text-white flex items-center justify-center">
      shrink-0（縮まない）
    </div>
    <div className="w-48 h-12 bg-green-500 text-white flex items-center justify-center">
      shrink（縮む）
    </div>
  </div>
        `}
      />

      <Space />
    </div>
  );
};

export default Flex;
