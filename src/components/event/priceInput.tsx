import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PriceInput() {
  const minPrice = 0.5;
  const maxPrice = 10;
  const step = 0.5;

  const [price, setPrice] = useState(minPrice);

  const increasePrice = () => {
    setPrice((prev) => (prev + step <= maxPrice ? parseFloat((prev + step).toFixed(1)) : prev));
  };

  const decreasePrice = () => {
    setPrice((prev) => (prev - step >= minPrice ? parseFloat((prev - step).toFixed(1)) : prev));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (isNaN(value)) return;
    value = Math.max(minPrice, Math.min(maxPrice, value));
    value = Math.round(value * 2) / 2; // Ensure step of 0.5
    setPrice(value);
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={decreasePrice} disabled={price <= minPrice}>
        -
      </Button>
      <Input
        type="number"
        step={step}
        min={minPrice}
        max={maxPrice}
        value={price}
        onChange={handleChange}
        className="w-20 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button onClick={increasePrice} disabled={price >= maxPrice}>
        +
      </Button>
    </div>
  );
}