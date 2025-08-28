import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/store"

const SwitchModeButton = ({ text }) => {
    const { setVegMode, vegMode } = useAppStore();

    const handleSwitch = (checked) => {
        setVegMode(checked);
    }

    return (
        <label
            htmlFor="veg-mode-switch"
            className={`w-auto flex items-center border gap-2 text-sm sm:text-lg font-semibold shadow-lg p-2 rounded-xl cursor-pointer select-none transition-colors duration-200 ${vegMode ? "bg-green-200 border-green-600" : "bg-transparent border-gray-300"
                } transition-all duration-200 max-sm:w-[130px]`}
        >
            <Switch id="veg-mode-switch" checked={vegMode} onCheckedChange={handleSwitch} className="cursor-pointer" />
            <span className={cn({ "text-green-500": vegMode })}>{text}</span>
        </label>
    )
}

export default SwitchModeButton
