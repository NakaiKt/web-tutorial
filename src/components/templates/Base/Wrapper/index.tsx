import { Box, Typography } from "@mui/material";
import CodePreview from "@/components/parts/CodePreview";
import Space from "@/components/parts/Space";

const Page = () => {
  return (
    <Box>
      <Typography variant="h2" id="mui-wrapper-layout-components">
        MUI系ラッパー・レイアウトコンポーネントの全体像と使い分け
      </Typography>
      <Typography>
        ReactやMUIでレイアウトやラップ要素を作る際、用途やプロジェクトのスタイル方針によって使い分けが重要になる。
        <br />
        <b>スタイルや属性が不要な場合はFragment（&lt;&gt;）で十分</b>。
        <br />
        <b>HTMLやTailwind中心ならdiv、MUI中心ならBox推奨</b>。
        <br />
        <b>
          Container/Paper/StackはBoxの特化版で、よく使うレイアウトや装飾を簡単に書けるショートカット
        </b>
        。
        <br />
        それぞれの違いや使いどころを理解し、適切なコンポーネントを選択することで、保守性や可読性の高いUIを実現できる。
      </Typography>
      <Space />
      <Typography variant="h2" id="css-wrapper">
        CSS系
      </Typography>
      <Typography variant="h3" id="fragment">
        &lt;&gt;（空タグ, Fragment）
      </Typography>
      <Typography variant="h4" id="overview">
        概要
      </Typography>
      <Typography>
        ReactのFragment。DOMに余計な要素を追加せず、複数要素をグループ化できる。
        <br />
        <b>スタイルや属性を付与する必要がない場合はFragmentで十分</b>。
      </Typography>
      <Typography variant="h4" id="difference">
        他との違い（使いどころ）
      </Typography>
      <Typography>
        追加のDOMノードを生成しないため、レイアウトやスタイリングに影響を与えずに複数要素を返したい場合に便利。classNameやstyleは直接指定できない。
        <br />
        例えば、リストやテーブルの中で余計なdivを増やしたくない場合などに有効。
      </Typography>
      <Typography variant="h4" id="minimum-sample-code">
        最小限のサンプルコード
      </Typography>
      <CodePreview
        code={`<>
  <div>要素1</div>
  <div>要素2</div>
</>`}
      />
      <Typography variant="h4" id="application-example">
        応用例
      </Typography>
      <CodePreview
        code={`<div className="flex flex-row gap-4 bg-gray-300 p-4">
  <>
    <div className="bg-blue-300 p-2">A</div>
    <div className="bg-green-300 p-2">B</div>
  </>
</div>`}
      />
      <Space />
      <Typography variant="h3" id="div">
        &lt;div&gt;
      </Typography>
      <Typography variant="h4" id="overview">
        概要
      </Typography>
      <Typography>
        HTMLの基本的なブロック要素。レイアウトやグループ化のために最もよく使われる。
        <br />
        <b>Tailwindや独自CSS中心のプロジェクトではdivが基本</b>。
      </Typography>
      <Typography variant="h4" id="difference">
        他との違い（使いどころ）
      </Typography>
      <Typography>
        classNameやstyleで自由にスタイル指定できる。React/HTML/CSS/Tailwindなどどんな環境でも使える汎用性の高さが特徴。
        <br />
        ただし、MUIのテーマやsxプロパティを活用したい場合はBoxを使うと便利。
      </Typography>
      <Typography variant="h4" id="minimum-sample-code">
        最小限のサンプルコード
      </Typography>
      <CodePreview
        code={`<div>
  <div>要素1</div>
  <div>要素2</div>
</div>`}
      />
      <Typography variant="h4" id="application-example">
        応用例
      </Typography>
      <CodePreview
        code={`<div className="flex flex-row gap-4 bg-gray-300 p-4">
  <div className="bg-blue-300 p-2">A</div>
  <div className="bg-green-300 p-2">B</div>
</div>`}
      />
      <Space />
      <Typography variant="h2" id="mui-wrapper">
        MUI系
      </Typography>
      <Typography variant="h3" id="box">
        &lt;Box&gt;
      </Typography>
      <Typography variant="h4" id="overview">
        概要
      </Typography>
      <Typography>
        MUIの汎用コンテナ。divの機能＋sxプロパティで柔軟にスタイル指定できる。
        <br />
        <b>MUI中心のプロジェクトではBoxが基本</b>。
      </Typography>
      <Typography variant="h4" id="difference">
        他との違い（使いどころ）
      </Typography>
      <Typography>
        divと異なり、MUIのテーマやレスポンシブ、ショートハンドプロパティ（p, m,
        bgcolorなど）が使える。MUIの他コンポーネントと一貫したデザインがしやすい。
        <br />
        <b>
          BoxはContainer/Paper/Stackのベースとなる最も汎用的なコンポーネント
        </b>
        。
      </Typography>
      <Typography variant="h4" id="minimum-sample-code">
        最小限のサンプルコード
      </Typography>
      <CodePreview
        code={`<Box sx={{ p: 2, bgcolor: 'primary.light' }}>A</Box>`}
      />
      <Typography variant="h4" id="application-example">
        応用例
      </Typography>
      <CodePreview
        code={`<div className="flex flex-row gap-4 bg-gray-300 p-4">
  <Box sx={{ p: 2, bgcolor: 'primary.light' }}>A</Box>
  <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>B</Box>
</div>`}
      />
      <Space />
      <Typography variant="h3" id="container">
        &lt;Container&gt;
      </Typography>
      <Typography variant="h4" id="overview">
        概要
      </Typography>
      <Typography>
        Boxに「中央寄せ」「最大幅」「パディング」などのレイアウト用スタイルがデフォルトで付与されたもの。
        <br />
        <b>ページ全体の幅や中央寄せを管理したい場合に便利</b>。
      </Typography>
      <Typography variant="h4" id="difference">
        他との違い（使いどころ）
      </Typography>
      <Typography>
        Boxやdivよりも、ページ全体の幅や中央寄せを簡単に実現できる。主にページの外枠やセクションのラップに使う。
        <br />
        <b>ContainerはBoxのレイアウト特化版</b>。
      </Typography>
      <Typography variant="h4" id="minimum-sample-code">
        最小限のサンプルコード
      </Typography>
      <CodePreview
        code={`<Container maxWidth="sm">
  コンテンツ
</Container>`}
      />
      <Typography variant="h4" id="application-example">
        応用例
      </Typography>
      <CodePreview
        code={`<Container maxWidth="sm" sx={{ bgcolor: 'grey.200', p: 2 }}>
  <Box sx={{ bgcolor: 'primary.light', p: 2 }}>A</Box>
  <Box sx={{ bgcolor: 'secondary.light', p: 2 }}>B</Box>
</Container>`}
      />
      <Space />
      <Typography variant="h3" id="paper">
        &lt;Paper&gt;
      </Typography>
      <Typography variant="h4" id="overview">
        概要
      </Typography>
      <Typography>
        ContainerやBoxに「影（elevation）」「角丸」「背景色」などの視覚的装飾がデフォルトで付与されたもの。
        <br />
        <b>カードやパネル、区切りたい領域に最適</b>。
      </Typography>
      <Typography variant="h4" id="difference">
        他との違い（使いどころ）
      </Typography>
      <Typography>
        BoxやContainerよりも、視覚的に区切りたい・カード風にしたい場面で使う。elevationで影の強さも調整可能。
        <br />
        <b>PaperはContainer/Boxの装飾特化版</b>。
      </Typography>
      <Typography variant="h4" id="minimum-sample-code">
        最小限のサンプルコード
      </Typography>
      <CodePreview
        code={`<Paper elevation={3} sx={{ p: 2 }}>
  コンテンツ
</Paper>`}
      />
      <Typography variant="h4" id="application-example">
        応用例
      </Typography>
      <CodePreview
        code={`<div className="flex flex-row gap-4 bg-gray-300 p-4">
  <Paper elevation={3} sx={{ p: 2 }}>A</Paper>
  <Paper elevation={1} sx={{ p: 2 }}>B</Paper>
</div>`}
      />
      <Space />
      <Typography variant="h3" id="stack">
        &lt;Stack&gt;
      </Typography>
      <Typography variant="h4" id="overview">
        概要
      </Typography>
      <Typography>
        Boxに「flexレイアウト（縦横並び）」「spacing（間隔）」がデフォルトで付与されたもの。
        <br />
        <b>子要素を縦・横に並べたい、間隔を簡単に調整したい場合に便利</b>。
      </Typography>
      <Typography variant="h4" id="difference">
        他との違い（使いどころ）
      </Typography>
      <Typography>
        Boxやdivでflexを書くよりも、Stackを使うと縦横の並びや間隔調整が簡単。複雑なflexレイアウトをシンプルに書きたいときに便利。
        <br />
        <b>StackはBoxのflexレイアウト特化版</b>。
      </Typography>
      <Typography variant="h4" id="minimum-sample-code">
        最小限のサンプルコード
      </Typography>
      <CodePreview
        code={`<Stack direction="row" spacing={2}>
  <Box sx={{ p: 2, bgcolor: 'primary.light' }}>A</Box>
  <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>B</Box>
</Stack>`}
      />
      <Typography variant="h4" id="application-example">
        応用例
      </Typography>
      <CodePreview
        code={`<Stack direction="row" spacing={2} sx={{ bgcolor: 'grey.200', p: 2 }}>
  <Box sx={{ p: 2, bgcolor: 'primary.light' }}>A</Box>
  <Box sx={{ p: 2, bgcolor: 'secondary.light' }}>B</Box>
</Stack>`}
      />
      <Space />
      <Typography variant="h2" id="summary">
        まとめ：関係性と使い分け
      </Typography>
      <Typography>
        これらのコンポーネントは、<b>Box &gt; Container &gt; Paper</b>、
        <b>Box &gt; Stack</b>の関係で、左側が右側の機能をすべて代用できる。
        <br />
        ただし、右側のコンポーネントは「よく使うパターン」を簡単に書けるようにしたショートカット。
        <br />
        <b>スタイル不要ならFragment、Tailwind中心ならdiv、MUI中心ならBox</b>。
        <br />
        <b>
          Container/Paper/StackはBoxの特化版で、用途に応じて使い分けると保守性・可読性が高まる
        </b>
        。
      </Typography>
    </Box>
  );
};

export default Page;
