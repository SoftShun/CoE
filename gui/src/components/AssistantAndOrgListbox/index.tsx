import { useEffect, useState } from "react";
import { AdjustmentsHorizontalIcon, CheckIcon } from "@heroicons/react/24/outline";
import { fontSize, getMetaKeyLabel, isMetaEquivalentKeyPressed } from "../../util";
import { Listbox, ListboxOption, ListboxOptions, Transition, useFontSize } from "../ui";
import { SelectedAssistantButton } from "./SelectedAssistantButton";

type Mode = "Agent" | "Custom";

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

export function AssistantAndOrgListbox() {
  const [currentMode, setCurrentMode] = useState<Mode>("Agent");
  const tinyFont = useFontSize(-4);

  useEffect(() => {
    let lastToggleTime = 0;
    const DEBOUNCE_MS = 800;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "'" &&
        isMetaEquivalentKeyPressed(event as any) &&
        event.shiftKey
      ) {
        const now = Date.now();

        if (now - lastToggleTime >= DEBOUNCE_MS) {
          lastToggleTime = now;
          // Toggle between Agent and Custom
          setCurrentMode((prev) => (prev === "Agent" ? "Custom" : "Agent"));
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Listbox value={currentMode} onChange={setCurrentMode}>
      <div className="relative">
        <SelectedAssistantButton mode={currentMode} />
        <Transition>
          <ListboxOptions
            className="-translate-x-1.5 pb-0"
            style={{ zIndex: 200 }}
          >
            {/* Mode Selection */}
            <div className="flex flex-col py-1">
              <ListboxOption
                value="Agent"
                className="flex select-none flex-row items-center justify-between px-2 py-1 background-transparent hover:bg-list-active hover:text-list-active-foreground cursor-pointer opacity-100"
                style={{ fontSize: fontSize(-2) }}
              >
                {({ selected }) => (
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <InfinityIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-1">Agent</span>
                    </div>
                    {selected && (
                      <CheckIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                    )}
                  </div>
                )}
              </ListboxOption>
              <ListboxOption
                value="Custom"
                className="flex select-none flex-row items-center justify-between px-2 py-1 background-transparent hover:bg-list-active hover:text-list-active-foreground cursor-pointer opacity-100"
                style={{ fontSize: fontSize(-2) }}
              >
                {({ selected }) => (
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <AdjustmentsHorizontalIcon className="h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-1">Custom</span>
                    </div>
                    {selected && (
                      <CheckIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                    )}
                  </div>
                )}
              </ListboxOption>
            </div>

            {/* Keyboard Shortcut Info */}
            <div
              className="text-description border-border flex items-center justify-between gap-1.5 border-x-0 border-b-0 border-t border-solid px-2 py-2"
              style={{ fontSize: tinyFont }}
            >
              <span className="block" style={{ fontSize: tinyFont - 1 }}>
                <code>{getMetaKeyLabel()} ⇧ '</code> to toggle mode
              </span>
            </div>
          </ListboxOptions>
        </Transition>
      </div>
    </Listbox>
  );
}
