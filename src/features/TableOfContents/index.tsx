import { FormatListBulleted } from "@mui/icons-material";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Box,
  IconButton,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";

export type Heading = {
  id: string;
  label: string;
  level: 2 | 3 | 4;
};

type TableOfContentsProps = {
  headings: Heading[];
};

// 定数定義
const HOVER_DELAY = 100; // ホバー終了の遅延時間（ms）
const VIEWPORT_OFFSET = 0.05; // 画面上部のオフセット（5%）
const DISTANCE_THRESHOLD = 500; // 高速/通常速度の境界距離（px）
const HIGH_SPEED_RATIO = 50; // 高速移動時の速度比率
const NORMAL_SPEED_BASE = 100; // 通常移動時の基本時間（ms）
const NORMAL_SPEED_RATIO = 3; // 通常移動時の速度比率
const MIN_DURATION = 1; // 最小移動時間（ms）
const MAX_DURATION = 1000; // 最大移動時間（ms）

const TableOfContents = ({ headings }: TableOfContentsProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 現在表示中の見出しを監視
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id)
          .filter((id) => headings.some((h) => h.id === id));

        if (visibleHeadings.length > 0) {
          setActiveHeadingId(visibleHeadings[0]);
        }
      },
      {
        rootMargin: `-${VIEWPORT_OFFSET * 100}% 0px -70% 0px`,
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  // ホバー処理
  const handleMouseEnter = () => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setIsHovering(false);
    }, HOVER_DELAY);
  };

  // スクロール時間の計算
  const calculateScrollDuration = (distance: number): number => {
    let calculatedDuration;

    if (distance <= DISTANCE_THRESHOLD) {
      // 近距離：瞬間移動レベル
      calculatedDuration = distance / HIGH_SPEED_RATIO;
    } else {
      // 遠距離：適度な速度
      calculatedDuration =
        NORMAL_SPEED_BASE +
        (distance - DISTANCE_THRESHOLD) / NORMAL_SPEED_RATIO;
    }

    return Math.max(MIN_DURATION, Math.min(MAX_DURATION, calculatedDuration));
  };

  // スムーススクロール
  const handleHeadingClick = (id: string) => {
    const targetElement = document.getElementById(id);
    if (!targetElement) return;

    const startPosition = window.pageYOffset;
    const targetPosition =
      targetElement.offsetTop - window.innerHeight * VIEWPORT_OFFSET;
    const distance = Math.abs(targetPosition - startPosition);
    const duration = calculateScrollDuration(distance);
    const direction = targetPosition > startPosition ? 1 : -1;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;

      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      window.scrollTo(0, startPosition + distance * progress * direction);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  // インデントレベルの計算
  const getIndentLevel = (level: number): number => {
    switch (level) {
      case 2:
        return 0;
      case 3:
        return 2;
      case 4:
        return 4;
      default:
        return 0;
    }
  };

  // フォントサイズの計算
  const getFontSize = (level: number): string => {
    switch (level) {
      case 2:
        return "0.875rem";
      case 3:
        return "0.75rem";
      case 4:
        return "0.7rem";
      default:
        return "0.7rem";
    }
  };

  // フォントウェイトの計算
  const getFontWeight = (level: number, isActive: boolean): number => {
    if (isActive) return 600;
    return level === 2 ? 500 : 400;
  };

  // 目次項目のレンダリング
  const renderHeadingItem = (heading: Heading) => {
    const isActive = heading.id === activeHeadingId;

    return (
      <ListItem
        key={heading.id}
        disablePadding
        sx={{ pl: getIndentLevel(heading.level) }}
      >
        <ListItemButton
          onClick={() => handleHeadingClick(heading.id)}
          sx={{
            py: 0.5,
            px: 1,
            minHeight: "auto",
            backgroundColor: isActive ? "primary.main" : "transparent",
            color: isActive ? "primary.contrastText" : "inherit",
            "&:hover": {
              bgcolor: "primary.light",
              color: "inherit",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          <ListItemText
            primary={heading.label}
            primaryTypographyProps={{
              variant: heading.level === 2 ? "body2" : "caption",
              sx: {
                fontSize: getFontSize(heading.level),
                fontWeight: getFontWeight(heading.level, isActive),
                color: "inherit",
              },
            }}
          />
        </ListItemButton>
      </ListItem>
    );
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: "fixed",
        top: "50%",
        right: 16,
        transform: "translateY(-50%)",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* 目次本体 */}
      {isHovering && headings.length > 0 && (
        <Paper
          elevation={4}
          sx={{
            mr: 1,
            maxHeight: "60vh",
            overflowY: "auto",
            minWidth: 200,
            maxWidth: 300,
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "grey.100",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "grey.400",
              borderRadius: "3px",
            },
          }}
        >
          <List dense sx={{ py: 1 }}>
            {headings.map(renderHeadingItem)}
          </List>
        </Paper>
      )}

      {/* アイコン */}
      <Paper
        elevation={2}
        sx={{
          p: 1,
          backgroundColor: isHovering ? "primary.main" : "background.paper",
          color: isHovering ? "primary.contrastText" : "text.primary",
          transition: "all 0.2s ease-in-out",
        }}
      >
        <IconButton
          size="small"
          sx={{
            color: "inherit",
            p: 0.5,
          }}
        >
          <FormatListBulleted fontSize="small" />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default TableOfContents;
