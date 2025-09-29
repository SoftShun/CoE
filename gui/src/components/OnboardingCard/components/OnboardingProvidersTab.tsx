import { OnboardingModes } from "core/protocol/core";
import { FormProvider, useForm } from "react-hook-form";
import { useAppDispatch } from "../../../redux/hooks";
import { Button } from "../../index";
import { useSubmitOnboarding } from "../hooks/useSubmitOnboarding";

interface OnboardingProvidersTabProps {
  /** Whether this is being shown in a dialog context */
  isDialog?: boolean;
}

export function OnboardingProvidersTab({
  isDialog,
}: OnboardingProvidersTabProps) {
  const formMethods = useForm();
  const dispatch = useAppDispatch();
  const { submitOnboarding } = useSubmitOnboarding(
    OnboardingModes.API_KEY,
    isDialog,
  );

  const handleFormSubmit = () => {
    // Submit without any provider configuration
    submitOnboarding();
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-full max-w-md">
        <FormProvider {...formMethods}>
          <div className="mt-5 space-y-6">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-description">
                  Provider configuration has been removed.
                </p>
              </div>
            </div>

            <div>
              <Button
                type="button"
                onClick={handleFormSubmit}
                className="w-full"
              >
                Continue
              </Button>
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
}
