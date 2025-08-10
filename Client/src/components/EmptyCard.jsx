import { Frown } from "lucide-react";

const EmptyCard = ({ text, }) => {
    return (
        <div className="flex flex-col items-center justify-center p-6 w-full h-full">
            <Frown className="text-primary mb-4" size={60} />
            <p className="text-center text-yellow-400 max-w-sm">
                {text}
            </p>
        </div>
    );
};

export default EmptyCard;
