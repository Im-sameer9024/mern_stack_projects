import React, { useState } from "react";
import { useClearUserData } from "../hooks/useSettings";
import Modal from "@/shared/components/custom/Modal";
import CustomButton from "@/shared/components/custom/CustomButton";

const ClearUserData = () => {
  const [showClearModal, setShowClearModal] = useState(false);
  const { mutateAsync: clearData, isPending } = useClearUserData();

  const handleConfirmClear = async () => {
    await clearData();
    setShowClearModal(false);
  };

  const onOpen = () => {
    setShowClearModal(true);
  };

  const onClose = () => {
    if (isPending) return;
    setShowClearModal(false);
  };

  return (
    <>
      <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <h2 className="text-lg font-semibold text-amber-700">Clear All Data</h2>

        <p className="text-gray-600 text-sm">
          This will remove all your income, expense, and transaction records. Your
          account will remain active.
        </p>

        <button
          onClick={onOpen}
          disabled={isPending}
          className="rounded bg-amber-500 px-4 py-2 text-white transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Clearing..." : "Clear Data"}
        </button>
      </div>

      <Modal
        isVisible={showClearModal}
        onClose={onClose}
        width={"520px"}
        content={
          <div className="space-y-4">
            <p className="text-sm text-slate-700">Are you sure you want to clear all data?</p>
            <div className="flex gap-3">
              <CustomButton onClick={handleConfirmClear} loading={isPending} active={true}>
                Clear Data
              </CustomButton>
              <CustomButton active={false} onClick={onClose} disabled={isPending}>
                Cancel
              </CustomButton>
            </div>
          </div>
        }
      />
    </>
  );
};

export default ClearUserData;