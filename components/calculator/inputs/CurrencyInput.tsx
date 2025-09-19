"use client";

import { useState, useEffect } from "react";

interface CurrencyInputProps {
  value: number | undefined;
  onChange: (value: number | undefined) => void;
  placeholder?: string;
  error?: string;
}

export default function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
  error,
}: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("");

  useEffect(() => {
    if (value !== undefined && value !== null) {
      setDisplayValue(formatForDisplay(value));
    } else {
      setDisplayValue("");
    }
  }, [value]);

  const formatForDisplay = (num: number): string => {
    return new Intl.NumberFormat("en-AU", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");

    if (rawValue === "") {
      setDisplayValue("");
      onChange(undefined);
      return;
    }

    const numericValue = parseInt(rawValue, 10);
    setDisplayValue(formatForDisplay(numericValue));
    onChange(numericValue);
  };

  return (
    <div className="w-full max-w-xl">
      <div className="relative">
        <span className="absolute left-6 top-1/2 -translate-y-1/2 text-4xl md:text-5xl font-medium text-muted-foreground">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full pl-16 pr-6 py-8 text-4xl md:text-5xl font-bold text-center bg-background border-2 border-input rounded-2xl focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
        />
      </div>

      {error && (
        <p className="mt-4 text-lg text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
