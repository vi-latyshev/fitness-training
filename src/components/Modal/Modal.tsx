import { Portal } from '@/components/Portal';

interface ModalProps {
    open: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

export const Modal = ({
    open,
    onClose,
    children,
}: ModalProps) => {
    if (!open) {
        return null;
    }

    return (
        <Portal>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal"
                className="fixed z-10 inset-0 overflow-y-auto"
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                        aria-hidden="true"
                        onClick={onClose}
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                    />
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <div className="inline-block align-bottom text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};
