import { Fab, Tooltip } from "@mui/material";
import FeedbackIcon from "@mui/icons-material/Feedback";

type FeedbackButtonProps = {
  url?: string;
  tooltipText?: string;
};

// TODO: claudeをつなぐボタンにする
const FeedbackButton = ({
  url = "https://waiting-school-0b9.notion.site/1ffc77a989988099bfe7fe400ccd2997?pvs=105",
  tooltipText = "要望を送信",
}: FeedbackButtonProps) => {
  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Tooltip title={tooltipText} placement="left">
      <Fab
        color="primary"
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          boxShadow: 3,
          "&:hover": {
            boxShadow: 6,
            transform: "scale(1.05)",
          },
          transition: "all 0.2s ease-in-out",
        }}
      >
        <FeedbackIcon />
      </Fab>
    </Tooltip>
  );
};

export default FeedbackButton;
