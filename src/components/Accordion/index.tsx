type Props = {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
  showContinueButton?: boolean;
  onContinue?: () => void;
  isLastSection?: boolean;
};

const Accordion = ({
  title,
  children,
  isOpen,
  onClick,
  showContinueButton,
  onContinue,
  isLastSection,
}: Props) => {
  return (
    <div className="border border-gray-200 rounded-lg mb-4 shadow-sm">
      <button
        type="button"
        className="flex justify-between items-center w-full p-4 bg-gray-50 text-gray-800 font-semibold text-lg rounded-t-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        onClick={onClick}
        aria-expanded={isOpen}>
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="p-4 bg-white rounded-b-lg">
          {children}
          {isOpen && showContinueButton && onContinue && !isLastSection && (
            <div className="mt-6 text-right">
              <button
                type="button"
                onClick={onContinue}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 transition duration-200">
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
