import { Switch } from "@/components/ui/switch"
import { useAppStore } from "@/store/store"

const SwitchModeButton = ({ text }) => {
    const { setVegMode, vegMode } = useAppStore();

    const handleSwitch = (checked) => {
        setVegMode(checked);
    }

    return (
        <label
            htmlFor="veg-mode-switch"
            className={`w-auto flex items-center gap-2 sm:text-sm shadow-lg p-2 rounded-xl cursor-pointer select-none transition-colors duration-200 ${vegMode ? "bg-yellow-300" : "bg-transparent border border-gray-300"
                }`}
        >
            <Switch id="veg-mode-switch" checked={vegMode} onCheckedChange={handleSwitch} />
            <span>{text}</span>
        </label>
    )
}

export default SwitchModeButton
