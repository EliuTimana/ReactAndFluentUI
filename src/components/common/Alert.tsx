import {
  DefaultButton,
  Dialog,
  DialogFooter,
  IDialogContentProps,
  PrimaryButton,
  ProgressIndicator
} from '@fluentui/react'

interface Props {
  onConfirm?: () => void;

  onCancel?: () => void;

  visible: boolean;
  loading?: boolean;
  dialogContentProps: IDialogContentProps;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export const Alert = ({
                        dialogContentProps,
                        onConfirm,
                        onCancel,
                        visible,
                        loading,
                        confirmButtonText,
                        cancelButtonText
                      }: Props) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  }

  return (
      <Dialog dialogContentProps={dialogContentProps} isOpen={visible}>
        {loading && <ProgressIndicator/>}
        <DialogFooter>
          <PrimaryButton disabled={loading} onClick={() => handleConfirm()} text={confirmButtonText || 'Confirm'}/>
          <DefaultButton disabled={loading} onClick={() => handleCancel()} text={cancelButtonText || 'Cancel'}/>
        </DialogFooter>
      </Dialog>
  );
}
