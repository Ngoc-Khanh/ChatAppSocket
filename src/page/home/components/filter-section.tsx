import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function FilterSection() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="age-range">Age Range</Label>
          <Slider
            id="age-range"
            defaultValue={[18, 60]}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="online-only" />
          <Label htmlFor="online-only">Online only</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="with-photo" />
          <Label htmlFor="with-photo">With photo only</Label>
        </div>
      </div>
    </div>
  )
}

