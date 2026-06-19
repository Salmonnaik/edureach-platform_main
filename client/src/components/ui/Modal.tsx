import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  size = "md" 
}: ModalProps) {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl"
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <div
            className={`
              relative w-full ${sizes[size]} 
              bg-white/30 backdrop-blur-lg 
              border border-white/20 rounded-2xl 
              shadow-2xl shadow-purple-500/10
              overflow-hidden
            `}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                {title && (
                  <h3 className="text-xl font-semibold text-gray-900">
                    {title}
                  </h3>
                )}
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
            
            {/* Close button for modals without title */}
            {!title && (
              <div className="flex justify-end p-4">
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            )}
            
            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
