import { useEffect } from "react";
import { useRouter } from "next/router";

export const useHighlight = () => {
  const router = useRouter();

  useEffect(() => {
    const { highlight, line } = router.query;

    if (highlight && typeof highlight === "string") {
      // DOM構築を待つ
      const timer = setTimeout(() => {
        findAndHighlightText(highlight, line as string);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [router.query]);

  const findAndHighlightText = (searchText: string, targetLine?: string) => {
    // TODO: Phase 2でtargetLine（行番号）を使った正確な特定を実装予定
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _targetLine = targetLine;

    // 既存のハイライトをクリア
    clearExistingHighlights();

    // コンテンツ部分に検索範囲を限定
    const contentArea =
      document.querySelector(".flex.flex-col.mx-auto") || document.body;

    // 全てのテキストノードを検索
    const walker = document.createTreeWalker(
      contentArea,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // サイドバーやナビゲーション部分を除外
          const parent = node.parentElement;
          if (
            parent?.closest("nav") ||
            parent?.closest('[role="navigation"]')
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      }
    );

    const textNodes: Text[] = [];
    let node;
    while ((node = walker.nextNode())) {
      if (node.textContent?.includes(searchText)) {
        textNodes.push(node as Text);
      }
    }

    if (textNodes.length > 0) {
      // 最初に見つかったテキストをハイライト
      const targetNode = textNodes[0];
      const highlightElement = highlightTextNode(targetNode, searchText);

      // ハイライト要素が作成された後にスクロール
      if (highlightElement) {
        setTimeout(() => {
          scrollToElement(highlightElement);
        }, 100);
      }
    }
  };

  const scrollToElement = (element: HTMLElement) => {
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const offset = 150; // 上部に余白を作る
    const targetY = rect.top + scrollTop - offset;

    // スムーズスクロール
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  };

  const highlightTextNode = (
    textNode: Text,
    searchText: string
  ): HTMLElement | null => {
    const parent = textNode.parentNode;
    if (!parent) return null;

    const text = textNode.textContent || "";
    const index = text.indexOf(searchText);
    if (index === -1) return null;

    // テキストを3つの部分に分割
    const beforeText = text.substring(0, index);
    const highlightText = text.substring(index, index + searchText.length);
    const afterText = text.substring(index + searchText.length);

    // 新しい要素を作成
    const fragment = document.createDocumentFragment();

    if (beforeText) {
      fragment.appendChild(document.createTextNode(beforeText));
    }

    // ハイライト要素を作成
    const highlightSpan = document.createElement("span");
    highlightSpan.className = "search-highlight";
    highlightSpan.style.cssText = `
      background-color: rgb(0, 200, 155) !important;
      padding: 2px 4px !important;
      border-radius: 3px !important;
      animation: highlight-show 2s ease-in-out 1 forwards !important;
      display: inline !important;
    `;
    highlightSpan.textContent = highlightText;
    fragment.appendChild(highlightSpan);

    // アニメーション終了後にハイライトを削除
    highlightSpan.addEventListener("animationend", () => {
      const parent = highlightSpan.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(highlightSpan.textContent || ""),
          highlightSpan
        );
        parent.normalize();
      }
    });

    if (afterText) {
      fragment.appendChild(document.createTextNode(afterText));
    }

    // 元のテキストノードを置換
    parent.replaceChild(fragment, textNode);

    // アニメーション用のCSSを追加
    addHighlightStyles();

    return highlightSpan;
  };

  const clearExistingHighlights = () => {
    const highlights = document.querySelectorAll(".search-highlight");
    highlights.forEach((highlight) => {
      const parent = highlight.parentNode;
      if (parent) {
        parent.replaceChild(
          document.createTextNode(highlight.textContent || ""),
          highlight
        );
        parent.normalize();
      }
    });
  };

  const addHighlightStyles = () => {
    // 既存のスタイルがあれば何もしない
    if (document.getElementById("highlight-styles")) return;

    const style = document.createElement("style");
    style.id = "highlight-styles";
    style.textContent = `
      @keyframes highlight-show {
        0%, 100% { background-color: rgb(0, 200, 155) !important; }
      }
      .search-highlight {
        background-color: rgb(0, 200, 155) !important;
        padding: 2px 4px !important;
        border-radius: 3px !important;
        animation: highlight-show 2s ease-in-out 1 forwards !important;
        display: inline !important;
      }
    `;
    document.head.appendChild(style);
  };

  return {
    findAndHighlightText,
    clearExistingHighlights,
  };
};
