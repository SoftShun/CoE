import { AdjustmentsHorizontalIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { fontSize } from "../../util";
import { ListboxButton } from "../ui";

interface SelectedAssistantButtonProps {
  mode: "Agent" | "Custom";
}

// Infinity icon component for Agent mode
function InfinityIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
    </svg>
  );
}

export function SelectedAssistantButton({
  mode,
}: SelectedAssistantButtonProps) {
  const ModeIcon = mode === "Agent" ? InfinityIcon : AdjustmentsHorizontalIcon;

  return (
    <ListboxButton
      data-testid="assistant-select-button"
      className="text-description border-none bg-transparent hover:brightness-125"
      style={{ fontSize: fontSize(-3) }}
    >
      <div className="flex flex-row items-center gap-1.5">
        <ModeIcon className="h-3.5 w-3.5 flex-shrink-0" />
        <span className="line-clamp-1 select-none break-all">{mode}</span>
      </div>
      <ChevronDownIcon
        className="h-2 w-2 flex-shrink-0 select-none"
        aria-hidden="true"
      />
    </ListboxButton>
  );
}
