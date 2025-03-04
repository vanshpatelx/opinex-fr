// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function PriceInput() {
//   const minPrice = 0.5;
//   const maxPrice = 10;
//   const step = 0.5;

//   const [price, setPrice] = useState(minPrice);

//   const increasePrice = () => {
//     setPrice((prev) => (prev + step <= maxPrice ? parseFloat((prev + step).toFixed(1)) : prev));
//   };

//   const decreasePrice = () => {
//     setPrice((prev) => (prev - step >= minPrice ? parseFloat((prev - step).toFixed(1)) : prev));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = parseFloat(e.target.value);
//     if (isNaN(value)) return;
//     value = Math.max(minPrice, Math.min(maxPrice, value));
//     value = Math.round(value * 2) / 2; // Ensure step of 0.5
//     setPrice(value);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <Button onClick={decreasePrice} disabled={price <= minPrice}>
//         -
//       </Button>
//       <Input
//         type="number"
//         step={step}
//         min={minPrice}
//         max={maxPrice}
//         value={price}
//         onChange={handleChange}
//         className="w-30 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//       />
//       <Button onClick={increasePrice} disabled={price >= maxPrice}>
//         +
//       </Button>
//     </div>
//   );
// }

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// export default function PriceInput({
//   maxLimit,
//   step,
//   minLimit,
//   decimalPlaces = 0, // Default to 1 decimal place
// }: {
//   maxLimit: number;
//   step: number;
//   minLimit: number;
//   decimalPlaces?: number; // Optional prop to define decimal places
// }) {
//   const [price, setPrice] = useState(minLimit);

//   // Function to format number based on decimal places
//   const formatPrice = (value: number) => parseFloat(value.toFixed(decimalPlaces));

//   const increasePrice = () => {
//     setPrice((prev) => (prev + step <= maxLimit ? formatPrice(prev + step) : prev));
//   };

//   const decreasePrice = () => {
//     setPrice((prev) => (prev - step >= minLimit ? formatPrice(prev - step) : prev));
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = parseFloat(e.target.value);
//     if (isNaN(value)) return;
//     value = Math.min(Math.max(value, minLimit), maxLimit); // Ensure it's within limits
//     setPrice(formatPrice(value)); // Format based on decimalPlaces prop
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <Button onClick={decreasePrice} disabled={price <= minLimit}>
//         -
//       </Button>
//       <Input
//         type="number"
//         step={step}
//         min={minLimit}
//         max={maxLimit}
//         value={price}
//         onChange={handleChange}
//         className="w-30 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//       />
//       <Button onClick={increasePrice} disabled={price >= maxLimit}>
//         +
//       </Button>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// interface PriceInputProps {
//   maxLimit: number;
//   step: number;
//   minLimit: number;
//   decimalPlaces?: number;
//   onChange: (value: number) => void;
// }

// export default function PriceInput({
//   maxLimit,
//   step,
//   minLimit,
//   decimalPlaces = 0,
//   onChange,
// }: PriceInputProps) {
//   const [price, setPrice] = useState(minLimit);

//   const formatPrice = (value: number) => parseFloat(value.toFixed(decimalPlaces));

//   const updatePrice = (newPrice: number) => {
//     const formattedPrice = formatPrice(newPrice);
//     setPrice(formattedPrice);
//     onChange(formattedPrice);
//   };

//   const increasePrice = () => {
//     if (price + step <= maxLimit) updatePrice(price + step);
//   };

//   const decreasePrice = () => {
//     if (price - step >= minLimit) updatePrice(price - step);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     let value = parseFloat(e.target.value);
//     if (isNaN(value)) return;
//     value = Math.min(Math.max(value, minLimit), maxLimit);
//     updatePrice(value);
//   };

//   return (
//     <div className="flex items-center gap-2">
//       <Button onClick={decreasePrice} disabled={price <= minLimit}>
//         -
//       </Button>
//       <Input
//         type="number"
//         step={step}
//         min={minLimit}
//         max={maxLimit}
//         value={price}
//         onChange={handleChange}
//         className="w-30 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
//       />
//       <Button onClick={increasePrice} disabled={price >= maxLimit}>
//         +
//       </Button>
//     </div>
//   );
// }


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PriceInputProps {
  maxLimit: number;
  step: number;
  minLimit: number;
  decimalPlaces?: number;
  value: number;  // ✅ Added controlled value prop
  onChange: (value: number) => void;
}

export default function PriceInput({
  maxLimit,
  step,
  minLimit,
  decimalPlaces = 0,
  value,  // ✅ Now controlled externally
  onChange,
}: PriceInputProps) {
  const formatPrice = (val: number) => parseFloat(val.toFixed(decimalPlaces));

  const updatePrice = (newPrice: number) => {
    const formattedPrice = formatPrice(newPrice);
    onChange(formattedPrice);
  };

  const increasePrice = () => {
    if (value + step <= maxLimit) updatePrice(value + step);
  };

  const decreasePrice = () => {
    if (value - step >= minLimit) updatePrice(value - step);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) return;
    val = Math.min(Math.max(val, minLimit), maxLimit);
    updatePrice(val);
  };

  return (
    <div className="flex items-center gap-2">
      <Button onClick={decreasePrice} disabled={value <= minLimit}>-</Button>
      <Input
        type="number"
        step={step}
        min={minLimit}
        max={maxLimit}
        value={value}  // ✅ Controlled input
        onChange={handleChange}
        className="w-30 text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <Button onClick={increasePrice} disabled={value >= maxLimit}>+</Button>
    </div>
  );
}
