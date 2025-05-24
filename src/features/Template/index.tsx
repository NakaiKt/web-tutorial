import { Typography, Container, Box } from "@mui/material";
import { ReactNode, useEffect, useState } from "react";
import Space from "@/components/parts/Space";
import TableOfContents from "@/features/TableOfContents";

import type { Heading } from "@/features/TableOfContents";

// DOM走査で見出し要素を取得
const extractHeadingsFromDOM = (): Heading[] => {
  console.log("=== DOM走査で見出し抽出開始 ===");

  const headings: Heading[] = [];

  // h2, h3, h4要素をすべて取得
  const headingElements = document.querySelectorAll("h2, h3, h4");
  console.log("見つかった見出し要素:", headingElements);

  headingElements.forEach((element, index) => {
    const tagName = element.tagName.toLowerCase();
    const level = parseInt(tagName.substring(1), 10) as Heading["level"];
    const label = element.textContent?.trim() || "";

    console.log(`見出し ${index}:`, { tagName, level, label, element });

    // idがない場合は自動生成
    let id = element.id;
    if (!id && label) {
      id = label
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // 特殊文字を除去
        .replace(/\s+/g, "-") // スペースをハイフンに
        .trim();

      // 自動生成したidを要素に設定
      element.id = id;
      console.log(`自動生成したid "${id}" を要素に設定`);
    }

    if (id && label) {
      const heading = {
        id,
        label,
        level,
      };
      console.log("見出しを追加:", heading);
      headings.push(heading);
    }
  });

  console.log("最終的な見出し配列:", headings);
  return headings;
};

type TemplateProps = {
  title: string;
  children: ReactNode;
};

const BaseTemplate = ({ title, children }: TemplateProps) => {
  const [extractedHeadings, setExtractedHeadings] = useState<Heading[]>([]);

  console.log("=== BaseTemplate開始 ===");

  useEffect(() => {
    console.log("=== useEffect実行 - DOM走査開始 ===");

    // 初回実行
    const updateHeadings = () => {
      const headings = extractHeadingsFromDOM();
      setExtractedHeadings(headings);
    };

    // DOM要素が描画された後に実行
    const timer = setTimeout(updateHeadings, 100);

    // DOM変更を監視（オプション）
    const observer = new MutationObserver(() => {
      console.log("DOM変更を検出");
      updateHeadings();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  console.log("BaseTemplate - extractedHeadings:", extractedHeadings);

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <div className="flex flex-col mx-auto mt-10 mb-10 max-w-[720px]">
          <Typography variant="h1">{title}</Typography>
          <Space />
          <div>{children}</div>
        </div>
        <TableOfContents headings={extractedHeadings} />
      </Box>
    </Container>
  );
};
export { BaseTemplate };
