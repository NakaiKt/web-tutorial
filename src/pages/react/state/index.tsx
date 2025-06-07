import { NextPage } from "next";
import { StateContent } from "../../../contents/React/State";
import { BaseTemplate } from "@/features/Template";

const StatePage: NextPage = () => {
  return (
    <BaseTemplate title="state (useState, useRef)">
      <StateContent />
    </BaseTemplate>
  );
};

export default StatePage;
