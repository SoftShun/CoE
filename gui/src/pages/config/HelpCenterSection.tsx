import {
  DocumentArrowUpIcon,
  PaintBrushIcon
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IdeMessengerContext } from "../../context/IdeMessenger";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setOnboardingCard } from "../../redux/slices/uiSlice";
import { saveCurrentSession } from "../../redux/thunks/session";
import { ROUTES } from "../../util/navigation";
import MoreHelpRow from "./MoreHelpRow";

export function HelpCenterSection() {
  const ideMessenger = useContext(IdeMessengerContext);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentSession = useAppSelector((state) => state.session);

  const handleViewSessionData = async () => {
    const sessionData = await ideMessenger.request("history/load", {
      id: currentSession.id,
    });

    if (sessionData.status === "success") {
      await ideMessenger.request("showVirtualFile", {
        name: `${sessionData.content.title}.json`,
        content: JSON.stringify(sessionData.content, null, 2),
      });
    }
  };

  return (
    <div className="py-5">
      <h3 className="mb-4 mt-0 text-xl">Help center</h3>
      <div className="-mx-4 flex flex-col">
        <MoreHelpRow
          title="Quickstart"
          description="Reopen the quickstart and tutorial file"
          Icon={DocumentArrowUpIcon}
          onClick={async () => {
            navigate("/");
            // Used to clear the chat panel before showing onboarding card
            await dispatch(
              saveCurrentSession({
                openNewSession: true,
                generateTitle: true,
              }),
            );
            dispatch(
              setOnboardingCard({
                show: true,
                activeTab: undefined,
              }),
            );
            ideMessenger.post("showTutorial", undefined);
          }}
        />
        {process.env.NODE_ENV === "development" && (
          <MoreHelpRow
            title="Theme Test Page"
            description="Development page for testing themes"
            Icon={PaintBrushIcon}
            onClick={async () => {
              navigate(ROUTES.THEME);
            }}
          />
        )}
      </div>
    </div>
  );
}
