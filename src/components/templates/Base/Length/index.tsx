import { Typography, Alert } from "@mui/material";
import Space from "@/components/parts/Space";
import BulletPoints from "@/components/parts/BulletPoints";
import CodePreview from "@/components/parts/CodePreview";

const Length = () => {
  return (
    <div>
      <Typography>
        CSSの長さの単位は大きく「絶対単位」と「相対単位」に分かれる
        <br />
        絶対単位は画面や印刷などで常に同じ物理的サイズを持ち、相対単位は親要素やルート要素、ビューポートなどのサイズに応じて変化する
        <br />
        Tailwindではこれらの単位を直感的にクラスで指定でき、さらに
        <code>w-full</code>や<code>max-w-*</code>、<code>min-w-*</code>
        などの便利なユーティリティも用意されている
        <br />
        詳細は
      </Typography>
      <a
        href="https://tailwindcss.com/docs/width"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#1976d2" }}
      >
        Tailwind CSS Width公式ドキュメント
      </a>
      <Space />

      <Typography variant="h2">絶対単位</Typography>
      <Typography>
        画面上で常に同じサイズを持つ単位主にデザインの基準や、細かなピクセル調整が必要な場面で使う
      </Typography>
      <Space />

      {/* px */}
      <Typography variant="h3">px（ピクセル）</Typography>
      <Typography>
        絶対的な長さの単位画面上の物理的なピクセル数を指定
        <br />
        精密なサイズ指定や、ボーダー・アイコン・ボタンなどの固定サイズ要素に使う
      </Typography>
      <BulletPoints
        items={[
          "アイコンのサイズを16pxに固定したい場合（w-4 h-4）",
          "ボーダーや区切り線の太さをピクセル単位で指定したい場合",
          "小さなボタンやラベルなど、デザイン上厳密なサイズが必要な場合",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="flex flex-row gap-4">
    <div className="w-16 h-12 bg-blue-400 text-white flex items-center justify-center">
      w-16（64px）
    </div>
    <div className="w-32 h-12 bg-green-400 text-white flex items-center justify-center">
      w-32（128px）
    </div>
  </div>
      `}
      />

      <Typography variant="h2">相対単位</Typography>
      <Typography>
        親要素やルート要素、ビューポートなどのサイズに応じて変化する単位レスポンシブデザインや柔軟なレイアウトに最適
      </Typography>
      <Space />

      {/* rem */}
      <Typography variant="h3">rem（ルート相対）</Typography>
      <Typography>
        ルート要素（html）のfont-sizeを基準とした相対単位
        <br />
        サイト全体のスケーラビリティを意識した設計や、ユーザーのアクセシビリティ設定に追従したい場合に使う
        <br />
        <b>
          親要素にfont-sizeの指定がなければ、remの基準はhtml要素のfont-size（多くのブラウザで16px。ユーザーが設定で変更している場合もある）
        </b>
        <br />
        例えばMUIのTypographyやdiv直下でfont-size指定がなければ、remは常にhtmlのfont-size基準
      </Typography>
      <Alert severity="warning" sx={{ my: 1 }}>
        親要素や周囲の要素にfont-sizeを指定しても、remは常にhtml要素のfont-size（多くのブラウザで16px。ユーザーが設定で変更している場合もある）が基準になる
      </Alert>
      <BulletPoints
        items={[
          "全体の余白やパディングをremで統一し、ユーザーの設定に応じて拡大縮小させる",
          "見出しや本文のフォントサイズをremで指定し、デバイスやブラウザの設定に柔軟に対応する",
        ]}
        style="disc"
      />

      <CodePreview
        code={`
  <div className="flex flex-row gap-4">
    <div className="w-[10rem] h-12 bg-red-400 text-white flex items-center justify-center">
      w-[10rem]（10rem）
    </div>
    <div className="w-[15rem] h-12 bg-red-400 text-white flex items-center justify-center">
      w-[15rem]（15rem）
    </div>
  </div>
  `}
      />

      {/* em */}
      <Typography variant="h3">em（親要素相対）</Typography>
      <Typography>
        親要素のfont-sizeを基準とした相対単位
        <br />
        ネストしたコンポーネントや、ボタン内のアイコンサイズなど、親要素に合わせてサイズを変えたい場合に使う
        <br />
        <b>
          親要素にfont-sizeの指定がなければ、emもhtml要素のfont-size（多くのブラウザで16px。ユーザーが設定で変更している場合もある）が基準
        </b>
      </Typography>
      <Alert severity="warning" sx={{ my: 1 }}>
        emは親要素のfont-sizeに依存するため、入れ子構造が深い場合や、親要素でfont-sizeを変更した場合は意図しないサイズになることがある
      </Alert>
      <BulletPoints
        items={[
          "ボタンのテキストサイズに合わせてアイコンの大きさを自動調整したい場合",
          "入れ子構造の中で、親要素のサイズに応じて子要素の幅や高さを変えたい場合",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="flex flex-row gap-4">
    <div className="w-[10em] h-12 bg-green-200 flex items-center justify-center">
      10em
    </div>
    <div className="w-[15em] h-12 bg-green-400 flex items-center justify-center">
      15em
    </div>
  </div>
  `}
      />
      <Typography>
        ただし、親要素（例：Typographyやdiv）にfont-sizeを指定すると、その値がemの基準になる
        <br />
        例：Typography fontSize=&quot;24px&quot;
        の中で1emは24px、1remはhtmlのfont-size
      </Typography>
      <CodePreview
        code={`
  <div className="flex flex-row gap-4 ">
    <div className="flex flex-col items-center" style={{ fontSize: 24 }}>
      <div className="text-[1em] bg-green-200 text-green-900 px-4 py-2 mb-1">
        フォントサイズ24の1em
      </div>
    </div>
    <div className="flex flex-col items-center" style={{ fontSize: 12 }}>
      <div className="text-[1em] bg-green-200 text-green-900 px-4 py-2 mb-1">
        フォントサイズ12の1em
      </div>
    </div>
  </div>
      `}
      />

      {/* % */}
      <Typography variant="h3">%（パーセンテージ）</Typography>
      <Typography>
        直近の親要素のサイズに対する割合で指定
        <br />
        レスポンシブなグリッドレイアウトや、親要素に合わせて幅を可変にしたい場合に使う
      </Typography>
      <BulletPoints
        items={[
          "2カラムレイアウトで各カラムを50%ずつにしたい場合（w-1/2）",
          "画像や動画を親要素の幅に合わせて自動リサイズしたい場合",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div>
    <div className="h-64 flex flex-col gap-4">
      <div className="h-[50%] bg-yellow-200 flex items-center justify-center">
        h-[50%]（1/2）
      </div>
      <div className="h-1/3 bg-yellow-400 flex items-center justify-center">
        h-1/3（33.33%）
      </div>
    </div>
    <div className="h-32 flex flex-col gap-4">
      <div className="h-[50%] bg-green-200 flex items-center justify-center">
        h-[50%]（1/2）
      </div>
    </div>
  </div>
      `}
      />
      <Typography variant="h4">割合が100%を超える場合</Typography>
      <Typography>
        割合が100%を超える場合，親の設定によって動作が変わる．基本的には，親の設定に従う．
      </Typography>
      <BulletPoints
        items={[
          "親の領域を超えて表示される",
          "親のサイズに圧縮される",
          "親のサイズを広げて表示される",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="h-64 flex flex-col gap-4">
    <div className="h-[150%] bg-red-200 flex items-center justify-center">
      h-[150%]
    </div>
  </div>
          `}
      />

      {/* vw/vh */}
      <Typography variant="h3">vw / vh（ビューポート単位）</Typography>
      <Typography>
        ビューポート（画面全体）の幅・高さに対する割合で指定
        <br />
        親要素のサイズに関係なく，画面いっぱいに広げたいバナーや全画面モーダルなどに使う
      </Typography>
      <BulletPoints
        items={[
          "ファーストビューのヒーローセクションを画面全体に広げたい場合（w-screen h-screen）",
          "レスポンシブな高さ指定で、画面の半分だけを占めるセクションを作りたい場合（h-1/2やh-[50vh]）",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="flex flex-col gap-4 bg-gray-300 p-4 mb-2">
    <div className="w-[50vw] h-12 bg-purple-400 text-white flex items-center justify-center">
      w-[50vw]
    </div>
    <div className="w-[25vw] h-12 bg-purple-400 text-white flex items-center justify-center">
      w-[25vw]
    </div>
  </div>
      `}
      />

      <Typography variant="h4">%とvw/vhの違い</Typography>
      <Typography>
        %は親要素のサイズに対する割合で指定
        <br />
        例えば以下の例だと，直近の親要素の高さが32pxで，その50%である16pxが高さになる
        <br />
        vw/vhはウィンドウ（ビューボード・画面全体）の表示領域の幅・高さに対する割合で指定
        <br />
        ウィンドウを縮小したら，vw/vhの割合に対する値が変わる
      </Typography>
      <CodePreview
        code={`
  <div className="h-128">
    <div className="h-32 bg-gray-200">
      <div className="h-1/2 bg-green-200 mb-2 flex items-center justify-center">
        高さ: 親の50%（16px）
      </div>
      <div className="h-[50vh] bg-blue-200 flex items-center justify-center">
        高さ: 画面の50%
      </div>
    </div>
  </div>
      `}
      />

      {/* auto */}
      <Typography variant="h3">auto（自動）</Typography>
      <Typography>
        コンテンツのサイズや親要素の制約に応じて自動的にサイズが決まる
        <br />
        テキストや画像など、内容に応じて幅を自動調整したい場合に使う
        <br />
        <b>
          親要素がflexやgridの場合、autoは空きスペースに応じて伸縮する（例：flex-grow,
          flex-shrinkの影響を受ける）
        </b>
      </Typography>
      <BulletPoints
        items={[
          "インライン要素や、可変長のラベルなどにw-autoを使う",
          "画像やボタンの幅を内容に合わせて自動調整したい場合",
          "flexやgridの子要素で、空きスペースに応じて自動で伸縮させたい場合",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="flex flex-row gap-4 bg-gray-300 p-4 mb-2">
    <div
      className="w-auto h-12 bg-gray-400 text-white flex items-center justify-center"
    >
      w-auto
    </div>
    <div
      className="w-auto h-12 bg-gray-500 text-white flex items-center justify-center"
    >
      w-auto!!!!!!!!!!!!!!!!
    </div>
    <div className="flex-1 h-12 bg-blue-400 text-white flex items-center justify-center">
      flex-1（空きスペースを自動で埋める）
    </div>
  </div>
      `}
      />

      {/* w-full, max-w, min-w */}
      <Typography variant="h2">Tailwind独自の便利な幅指定</Typography>
      <Typography>
        <code>w-full</code>は親要素の幅いっぱいに広げる．w-[100%]と同じ．
        <br />
        <code>max-w-*</code>や<code>min-w-*</code>
        は最大幅・最小幅を制限し、レスポンシブなデザインや可読性の確保に役立つ
      </Typography>
      <BulletPoints
        items={[
          "フォームの入力欄を親要素いっぱいに広げたい場合（w-full）",
          "記事本文の最大幅を制限して読みやすくしたい場合（max-w-2xl）",
          "ボタンの最小幅を確保したい場合（min-w-[120px]）",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
  <div className="flex flex-row gap-4 bg-gray-300 p-4">
    <div className="w-full max-w-xs h-12 bg-blue-500 text-white flex items-center justify-center">
      w-full max-w-xs
    </div>
    <div className="min-w-[120px] h-12 bg-green-500 text-white flex items-center justify-center">
      min-w-[120px]
    </div>
  </div>
      `}
      />

      {/* カスタム値 */}
      <Typography variant="h2">カスタム値（任意の長さ指定）</Typography>
      <Typography>
        Tailwindでは、<code>w-[72px]</code>や<code>w-[5vw]</code>
        のように[]記法で任意の長さを指定できる
        <br />
        px, rem, em, %, vw, vhなど、CSSで使える単位を自由に組み合わせて指定可能
      </Typography>
      <BulletPoints
        items={[
          "デザインガイドラインに合わせて細かいサイズを指定したい場合",
          "ユーティリティクラスにないサイズを使いたい場合",
        ]}
        style="disc"
      />
      <CodePreview
        code={`
      <div className="flex flex-row gap-4 bg-gray-300 p-4 mb-2">
        <div className="w-[72px] h-12 bg-pink-400 text-white flex items-center justify-center">
          w-[72px]
        </div>
        <div className="w-[5vw] h-12 bg-yellow-400 text-white flex items-center justify-center">
          w-[5vw]
        </div>
      </div>
      `}
      />
    </div>
  );
};

export default Length;
