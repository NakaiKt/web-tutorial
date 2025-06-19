import { NextPage } from "next";
import { ContextContent } from "../../../contents/React/Context";
import { BaseTemplate } from "@/features/Template";

const ContextPage: NextPage = () => {
  return (
    <BaseTemplate title="Context API">
      <ContextContent />
    </BaseTemplate>
  );
};

export default ContextPage;
