import { Button } from "@mui/material";

type NormalButtonProps = {
  text?: string;
  onClick?: () => void;
};

export const NormalButton = ({
  text = "デフォルトのボタン",
  onClick = () => {
    alert("デフォルトのボタンがクリックされました");
  },
}: NormalButtonProps) => {
  return <Button onClick={onClick}>{text}</Button>;
};

const Pages = () => {
  return (
    <div className="flex">
      <NormalButton />
    </div>
  );
};

export default Pages;
