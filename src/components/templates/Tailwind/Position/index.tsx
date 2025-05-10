import { Typography, Alert } from "@mui/material";
import Link from "@/components/parts/Link";
import BulletPoints from "@/components/parts/BulletPoints";
import Space from "@/components/parts/Space";
import CodePreview from "@/components/parts/CodePreview";

const justifyUseCases = [
  "FlexやGridで要素を主軸方向（横並びなら横、縦並びなら縦）に中央・端・均等配置したい",
  "複数行・複数列のグループ全体の主軸方向の余白を調整したい",
  "レスポンシブに主軸方向の配置を切り替えたい",
];

const Position = () => {
  return (
    <div>
      <Typography>
        配置（Box
        Alignment）は、FlexboxやGridなどのレイアウトで要素の整列・配置を制御するためのプロパティ群
        <br />
        主に「justify（主軸方向）」「align（交差軸方向）」「place（shorthand）」があり、それぞれ
        <code>-content</code>・<code>-items</code>・<code>-self</code>
        のバリアントを持つ
      </Typography>
      <Space />
      <Alert severity="warning">
        これらのプロパティは、親要素に<code>flex</code>や<code>grid</code>
        クラスがないと効かない
      </Alert>
      <Space />
      <Alert severity="warning">
        子要素の合計幅や高さが親要素と同じ場合など、余白がない場合は配置プロパティの効果が見えない
      </Alert>
      <Space />
      <Link
        text="Tailwind CSS Align Content公式ドキュメント"
        url="https://tailwindcss.com/docs/align-content"
      />
      <Link
        text="Tailwind CSS Justify Content公式ドキュメント"
        url="https://tailwindcss.com/docs/justify-content"
      />
      <Link
        text="MDN Box Alignment"
        url="https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Box_Alignment"
      />
      <Space />

      {/* --- 配置の軸 --- */}
      <Typography variant="h2">配置の軸</Typography>
      <Typography variant="h3">justify（主軸方向の配置）</Typography>
      <Typography>
        justifyは、FlexboxやGridの「主軸方向」（flex-rowなら横、flex-colなら縦）における子要素の配置を制御するプロパティ
        <br />
        Tailwindでは<code>justify-*</code>クラスで指定
      </Typography>
      <BulletPoints items={justifyUseCases} style="number" />
      <Space />
      <Typography variant="h4">主な値と効果</Typography>
      <BulletPoints
        items={[
          "start：主軸の先頭に揃える（justify-start）",
          "end：主軸の末尾に揃える（justify-end）",
          "center：中央に揃える（justify-center）",
          "between：両端に揃え、間を均等に空ける（justify-between）",
          "around：各要素の両側に均等な余白（justify-around）",
          "evenly：全ての間隔を均等に（justify-evenly）",
        ]}
      />
      <Space />
      <Typography variant="h4">サンプル（justify-start）</Typography>
      <Typography>
        <code>justify-start</code>
        を指定すると、子要素が主軸方向（flex-rowなら横方向）の先頭に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-start bg-gray-300 p-4">
    <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">サンプル（justify-end）</Typography>
      <Typography>
        <code>justify-end</code>
        を指定すると、子要素が主軸方向（flex-rowなら横方向）の末尾に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-end bg-gray-300 p-4">
    <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">サンプル（justify-center）</Typography>
      <Typography>
        <code>justify-center</code>
        を指定すると、子要素が主軸方向（flex-rowなら横方向）の中央に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-center bg-gray-300 p-4">
    <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">サンプル（justify-between）</Typography>
      <Typography>
        <code>justify-between</code>
        を指定すると、子要素が主軸方向（flex-rowなら横方向）の両端に揃い、その間隔が均等になる
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-between bg-gray-300 p-4">
    <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">サンプル（justify-around）</Typography>
      <Typography>
        <code>justify-around</code>
        を指定すると、子要素が主軸方向（flex-rowなら横方向）の両端に揃い、その間隔が均等になる
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-around bg-gray-300 p-4">
    <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">サンプル（justify-evenly）</Typography>
      <Typography>
        <code>justify-evenly</code>
        を指定すると、子要素が主軸方向（flex-rowなら横方向）の両端に揃い、その間隔が均等になる
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row justify-evenly bg-gray-300 p-4">
    <div className="w-16 h-12 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-12 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-12 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Typography variant="h3">align（交差軸方向の配置）</Typography>
      <Typography>
        alignは、FlexboxやGridの「交差軸方向」（flex-rowなら縦、flex-colなら横）における子要素の配置を制御するプロパティ
        <br />
        Tailwindでは<code>items-*</code>（=align-items）、<code>content-*</code>
        （=align-content）、<code>self-*</code>
        （=align-self）クラスが「align」の役割を担う
        <br />
        例えば<code>items-center</code>はCSSの<code>align-items: center</code>
        に相当し、「交差軸方向の中央揃え」を意味する
      </Typography>
      <BulletPoints
        items={[
          "FlexやGridで要素を交差軸方向（横並びなら縦、縦並びなら横）に中央・端・均等配置したい",
          "高さや幅が異なる要素を揃えて整列したい",
          "複数行・複数列のグループ全体の交差軸方向の余白を調整したい",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h4">主な値と効果</Typography>
      <BulletPoints
        items={[
          "start：交差軸の先頭に揃える（items-start）",
          "end：交差軸の末尾に揃える（items-end）",
          "center：中央に揃える（items-center）",
          "baseline：ベースラインに揃える（items-baseline）",
        ]}
      />
      <Space />
      <Typography variant="h4">
        サンプル（items-start = align-items: flex-start）
      </Typography>
      <Typography>
        <code>items-start</code>
        を指定すると、全ての子要素が交差軸方向（flex-rowなら縦方向）の上端（親要素の上）に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row items-start bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-24 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">
        サンプル（items-end = align-items: flex-end）
      </Typography>
      <Typography>
        <code>items-end</code>
        を指定すると、全ての子要素が交差軸方向（flex-rowなら縦方向）の下端（親要素の下）に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row items-end bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-24 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">
        サンプル（items-center = align-items: center）
      </Typography>
      <Typography>
        <code>items-center</code>
        を指定すると、全ての子要素が交差軸方向（flex-rowなら縦方向）の中央に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row items-center bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-24 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h4">
        サンプル（items-baseline = align-items: baseline）
      </Typography>
      <Typography>
        <code>items-baseline</code>
        を指定すると、全ての子要素が交差軸方向（flex-rowなら縦方向）のベースラインに揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row items-baseline bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-24 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
      <Typography variant="h3">place（一括指定）</Typography>
      <Typography>
        placeは、主軸方向（justify）と交差軸方向（align）の配置を1つのプロパティでまとめて指定できるshorthand（ショートハンド）
        <br />
        Tailwindでは<code>place-items-*</code>（=place-items）、
        <code>place-content-*</code>（=place-content）、
        <code>place-self-*</code>（=place-self）クラスで指定
        <br />
        例えば<code>place-items-center</code>は
        <code>align-items: center; justify-items: center;</code>と同じ効果になる
      </Typography>
      <BulletPoints
        items={[
          "主軸・交差軸の両方の配置を一括で指定したい",
          "コードを簡潔に保ちたい",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h4">主な値と効果</Typography>
      <BulletPoints
        items={[
          "center：主軸・交差軸とも中央揃え（place-items-center, place-content-center, place-self-center）",
          "start：主軸・交差軸とも先頭揃え（place-items-start, place-content-start, place-self-start）",
          "end：主軸・交差軸とも末尾揃え（place-items-end, place-content-end, place-self-end）",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h4">
        サンプル（place-items-center＝align-items: center + justify-items:
        center）
      </Typography>
      <Alert severity="warning">
        <code>place-items-*</code>や<code>place-content-*</code>、
        <code>place-self-*</code>はGrid専用
      </Alert>
      <Typography>
        <code>place-items-center</code>
        を指定すると、Gridの各アイテムが縦横とも中央に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="grid grid-cols-3 place-items-center bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-8 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-8 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />

      {/* --- 対象 --- */}
      <Typography variant="h2">対象</Typography>

      <Typography variant="h3">content（アイテム群全体の配置）</Typography>
      <Typography>
        <b>content-*</b>
        は、複数行・複数列に折り返したアイテム群全体（グループ全体）の配置を制御するプロパティ
        <br />
        Tailwindの<code>content-*</code>は<code>align-content</code>
        （交差軸方向）に対応し、<code>justify-content-*</code>は主軸方向の
        <code>justify-content</code>に対応する
      </Typography>
      <Alert severity="warning">
        <code>content-*</code>
        （=align-content）は、複数行/列がある場合のみ有効です。Gridでは常に有効ですが、Flexboxでは
        <code>flex-wrap: wrap</code>で複数行になった場合のみ効果があります。
      </Alert>
      <BulletPoints
        items={[
          "複数行・複数列に折り返した要素群全体の配置を調整したい",
          "GridやFlexで余白を全体的に均等にしたい",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h4">サンプル（content-center, Grid）</Typography>
      <Typography>
        <code>content-center</code>
        を指定すると、複数行になったグリッド全体が交差軸方向の中央に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="grid grid-rows-2 grid-flow-col gap-4 content-center bg-gray-300 p-4 h-48">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-8 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-8 bg-red-500 text-white flex items-center justify-center">C</div>
    <div className="w-16 h-8 bg-yellow-500 text-white flex items-center justify-center">D</div>
  </div>
        `}
      />
      <Space />

      <Typography variant="h3">items（各アイテムのデフォルト配置）</Typography>
      <Typography>
        <b>items-*</b>
        は、コンテナ内の全てのアイテムの交差軸方向のデフォルト整列方法を指定するプロパティ
        <br />
        Tailwindの<code>items-*</code>は<code>align-items</code>
        （交差軸方向）に対応し、<code>justify-items-*</code>は主軸方向の
        <code>justify-items</code>に対応する（ただしjustify-items-*はGrid専用）
        <br />
        ※両方を同時に設定するものではありません
      </Typography>
      <BulletPoints
        items={[
          "全アイテムを中央揃えや端揃えにしたい",
          "高さや幅が異なる要素を揃えて整列したい",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h4">サンプル（items-center, Flex）</Typography>
      <Typography>
        <code>items-center</code>
        を指定すると、全ての子要素が交差軸方向（flex-rowなら縦方向）の中央に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row items-center bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center">A</div>
    <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-24 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />

      <Typography variant="h3">self（個別アイテムの配置）</Typography>
      <Typography>
        <b>self-*</b>
        は、個々のアイテムだけ他と異なる交差軸方向の位置に配置したい場合に使うプロパティ
        <br />
        Tailwindの<code>self-*</code>は<code>align-self</code>
        （交差軸方向）に対応し、<code>justify-self-*</code>は主軸方向の
        <code>justify-self</code>に対応する（ただしjustify-self-*はGrid専用）
        <br />
        ※両方を同時に設定するものではありません
      </Typography>
      <BulletPoints
        items={[
          "特定のアイテムだけ他と異なる位置に配置したい",
          "一部の要素だけ中央揃えや端揃えにしたい",
        ]}
        style="number"
      />
      <Space />
      <Typography variant="h4">サンプル（self-end, Flex）</Typography>
      <Typography>
        <code>self-end</code>
        を指定すると、そのアイテムだけ交差軸方向（flex-rowなら縦方向）の下端に揃う
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row items-center bg-gray-300 p-4 h-32">
    <div className="w-16 h-8 bg-blue-500 text-white flex items-center justify-center self-end">A</div>
    <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center">B</div>
    <div className="w-16 h-24 bg-red-500 text-white flex items-center justify-center">C</div>
  </div>
        `}
      />
      <Space />
    </div>
  );
};

export default Position;
