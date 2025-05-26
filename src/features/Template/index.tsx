import { Typography, Container, Box } from "@mui/material";
import { ReactNode, useEffect, useState, useRef } from "react";
import Space from "@/components/parts/Space";
import TableOfContents from "@/features/TableOfContents";
import FeedbackButton from "@/features/FeedbackButton";
import { useHighlight } from "@/features/SearchTypography";

import type { Heading } from "@/features/TableOfContents";

// DOM走査で見出し要素を取得
const extractHeadingsFromDOM = (): Heading[] => {
  const headings: Heading[] = [];

  // h2, h3, h4要素をすべて取得
  const headingElements = document.querySelectorAll("h2, h3, h4");
  headingElements.forEach((element) => {
    const tagName = element.tagName.toLowerCase();
    const level = parseInt(tagName.substring(1), 10) as Heading["level"];
    const label = element.textContent?.trim() || "";

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
    }

    if (id && label) {
      const heading = {
        id,
        label,
        level,
      };
      headings.push(heading);
    }
  });

  return headings;
};

type TemplateProps = {
  title: string;
  children: ReactNode;
};

const BaseTemplate = ({ title, children }: TemplateProps) => {
  const [extractedHeadings, setExtractedHeadings] = useState<Heading[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // ハイライト機能を有効化
  useHighlight();

  useEffect(() => {
    // 初回実行
    const updateHeadings = () => {
      const headings = extractHeadingsFromDOM();
      setExtractedHeadings(headings);
    };

    // DOM要素が描画された後に実行
    const timer = setTimeout(updateHeadings, 100);

    // DOM変更を監視（オプション）
    const observer = new MutationObserver(() => {
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

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <div
          className="flex flex-col mx-auto mt-10 mb-10 w-[720px]"
          ref={contentRef}
        >
          <Typography variant="h1">{title}</Typography>
          <Space />
          <div>{children}</div>
        </div>
        <TableOfContents headings={extractedHeadings} />
      </Box>

      {/* フィードバックボタン */}
      <FeedbackButton />
    </Container>
  );
};
export { BaseTemplate };
