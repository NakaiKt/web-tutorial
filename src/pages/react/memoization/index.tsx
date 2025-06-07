import MemoizationExplanation from "@/contents/React/Memoization";
import { BaseTemplate } from "@/features/Template";

const MemoizationPage = () => {
  return (
    <BaseTemplate title="メモ化 (useCallback, useMemo)">
      <MemoizationExplanation />
    </BaseTemplate>
  );
};

export default MemoizationPage;
