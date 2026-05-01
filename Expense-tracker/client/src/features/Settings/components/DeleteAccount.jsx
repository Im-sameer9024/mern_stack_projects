import React, { lazy, useState } from "react";
import { useDeleteAccount } from "../hooks/useSettings";
import CustomButton from "@/shared/components/custom/CustomButton";

const Modal = lazy(() => import("@/shared/components/custom/Modal"));

const DeleteAccount = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { mutateAsync: deleteAccount, isPending } = useDeleteAccount();

  const handleConfirmDelete = async () => {
    await deleteAccount();
  };

  const onOpen = () => {
    setShowDeleteModal(true);
  };

  const onClose = () => {
    if (isPending) return;
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="space-y-3 rounded-lg border border-red-200 bg-red-50 p-4">
        <h2 className="text-lg font-semibold text-red-700">
          Delete Account Permanently
        </h2>

        <p className="text-gray-600 text-sm">
          This will permanently delete your account and all associated data. This
          action cannot be undone.
        </p>

        <button
          onClick={onOpen}
          disabled={isPending}
          className="rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Deleting..." : "Delete Account"}
        </button>
      </div>

      <Modal
        isVisible={showDeleteModal}
        onClose={onClose}
        width={"520px"}
        content={
          <div className="space-y-4">
            <p className="text-sm text-slate-700">
              Are you sure you want to delete your account permanently?
            </p>
            <div className="flex gap-3">
              <CustomButton onClick={handleConfirmDelete} loading={isPending} active={true}>
                Delete Account
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

export default DeleteAccount;
