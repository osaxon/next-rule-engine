import { RuleResult } from "@/rules/types";
import { Spinner } from "../ui/spinner";

export function RuleResultComponent({
  isPending,
  result,
}: {
  isPending: boolean;
  result?: RuleResult;
}) {
  return (
    <div>
      {isPending ? (
        <Spinner size="lg" className="bg-black dark:bg-white" />
      ) : (
        <pre>
          <code>{JSON.stringify(result, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}
