"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const categories = ["Best Sellers", "New Arrivals", "Gift Sets"];
const scentFamilies = ["Floral", "Woody", "Oriental", "Fresh", "Citrus", "Spicy"];
const genders = ["Men", "Women", "Unisex"];

export function ProductFilters() {
  return (
    <div className="w-full space-y-8">
      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider defaultValue={[2000, 15000]} max={20000} step={500} className="mb-4" />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>৳ 2,000</span>
          <span>৳ 20,000</span>
        </div>
      </div>

      <Separator />

      {/* Scent Family Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Scent Family</h3>
        <div className="space-y-3">
          {scentFamilies.map((scent) => (
            <div key={scent} className="flex items-center space-x-2">
              <Checkbox id={`scent-${scent}`} />
              <label
                htmlFor={`scent-${scent}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {scent}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Gender Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Gender</h3>
        <div className="space-y-3">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox id={`gender-${gender}`} />
              <label
                htmlFor={`gender-${gender}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}