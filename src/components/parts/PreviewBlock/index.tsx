import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const PreviewBlock = ({ children, className }: Props) => {
  return (
    <div className="bg-gray-300 p-4">
      <div className={className}>{children}</div>
    </div>
  );
};

export default PreviewBlock;
