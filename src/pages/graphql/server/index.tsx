import GraphQLServerContent from "@/contents/GraphQL/Server";
import { BaseTemplate } from "@/features/Template";

export default function GraphQLServerPage() {
  return (
    <BaseTemplate title="GraphQL サーバー実装">
      <GraphQLServerContent />
    </BaseTemplate>
  );
}
