import { Alert } from "@/components/ui/alert";
import { CircleCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TradeAlertProps {
    show: boolean;
    msg: string;
    onClose: () => void;
}

function TradeAlert({ show, msg, onClose }: TradeAlertProps) {
    if (!show) return null;

    return (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 w-[400px]">
            <Alert
                layout="row"
                className="min-w-[450px] h-[50px] bg-green-100"
                icon={<CircleCheck className="text-emerald-500" size={20} strokeWidth={2} aria-hidden="true" />}
                action={
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            className="group -my-1.5 -me-2 size-8 shrink-0 p-0 hover:bg-transparent"
                            aria-label="Close banner"
                            onClick={onClose}
                        >
                            <X size={16} strokeWidth={2} className="opacity-60 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                        </Button>
                    </div>
                }
            >
                <p className="text-m">{msg}</p>
            </Alert>
        </div>
    );
}

export default TradeAlert;
