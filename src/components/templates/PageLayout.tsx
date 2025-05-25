import React from "react";
import { useHighlight } from "../../features/SearchTypography/hooks/useHighlight";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  // ハイライト機能を自動で有効化
  useHighlight();

  return <>{children}</>;
};
