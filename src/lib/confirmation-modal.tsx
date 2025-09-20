"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, AlertTriangle, HelpCircle } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  confirmLoading?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  confirmLoading = false,
}: ConfirmationModalProps) {
  const Icon = variant === "destructive" ? AlertTriangle : HelpCircle;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              variant === "destructive" ? "bg-destructive/10" : "bg-primary/10"
            }`}>
              <Icon className={`h-5 w-5 ${
                variant === "destructive" ? "text-destructive" : "text-primary"
              }`} />
            </div>
            <AlertDialogTitle>{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={confirmLoading}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={confirmLoading}
            className={variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
          >
            {confirmLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

interface ConfirmationModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
  onConfirm?: () => void;
}

export function useConfirmationModal() {
  const [modalState, setModalState] = useState<ConfirmationModalState>({
    isOpen: false,
    title: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const showModal = (config: Omit<ConfirmationModalState, "isOpen"> & { onConfirm: () => void | Promise<void> }) => {
    setModalState({
      ...config,
      isOpen: true,
    });
  };

  const hideModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
    setIsLoading(false);
  };

  const handleConfirm = async () => {
    if (modalState.onConfirm) {
      setIsLoading(true);
      try {
        await modalState.onConfirm();
        hideModal();
      } catch (error) {
        console.error("Confirmation action failed:", error);
        setIsLoading(false);
      }
    }
  };

  const ModalComponent = () => (
    <ConfirmationModal
      isOpen={modalState.isOpen}
      onClose={hideModal}
      onConfirm={handleConfirm}
      title={modalState.title}
      message={modalState.message}
      confirmText={modalState.confirmText}
      cancelText={modalState.cancelText}
      variant={modalState.variant}
      confirmLoading={isLoading}
    />
  );

  return {
    showModal,
    hideModal,
    ModalComponent,
    isLoading,
  };
}

