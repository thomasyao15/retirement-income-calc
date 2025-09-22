"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LifetimePage() {
  const purpleColor = "var(--as-tolopea)";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Top Navigation */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="relative flex items-center justify-center px-4 h-14">
          <button className="absolute left-4 p-2">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold">Member Direct</h1>
        </div>
      </div>

      {/* Main Content - Full Height Flex Column */}
      <div className="flex-1 flex flex-col px-6 py-8">
        {/* Top Section */}
        <div className="text-center space-y-4 mb-8">
          <h2
            className="text-3xl font-bold"
            style={{ color: purpleColor }}
          >
            Take the wheel
          </h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-sm mx-auto">
            Member Direct gives you the control and flexibility to self-manage your
            investments, without the hassle of a self-managed super fund.
          </p>
        </div>

        {/* Center Image */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-64 h-64 flex items-center justify-center">
            <img
              src="/assets/lifetime-income-product.png"
              alt="Member Direct"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="space-y-4 mt-8">
          {/* Disclaimer Text */}
          <p className="text-xs text-gray-500 text-center px-4 leading-relaxed">
            A Target Market Determination (TMD) is a document that outlines
            the target market a product has been designed for.{" "}
            <span className="text-blue-600 underline">Read the TMD.</span>
          </p>

          {/* Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full h-12 text-white font-medium rounded-full"
              style={{ backgroundColor: purpleColor }}
            >
              Discover Member Direct
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 font-medium rounded-full border-2"
              style={{
                borderColor: purpleColor,
                color: purpleColor
              }}
            >
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}