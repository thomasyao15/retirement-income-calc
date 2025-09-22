"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeviceFrameset } from "react-device-frameset";
import "react-device-frameset/styles/marvel-devices.min.css";

export default function LifetimePage() {
  const purpleColor = "var(--as-tolopea)";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-8">
      <DeviceFrameset device="iPhone X" zoom={0.8}>
        <div className="min-h-screen bg-white flex flex-col">
          {/* Top Navigation */}
          <div className="sticky top-0 z-50 bg-white border-b pt-8">
            <div className="relative flex items-center justify-center px-4 h-14">
              <button className="absolute left-4 p-2">
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-md font-semibold">Lifetime Income Product</h1>
            </div>
          </div>

          {/* Main Content - Full Height Flex Column */}
          <div className="flex-1 flex flex-col px-6 py-8">
            {/* Top Section */}
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold" style={{ color: purpleColor }}>
                Unlock more for life
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
                Optional at retirement, powerful by design: opt in to help
                maximise your Age Pension and access income for life, only if
                and when it suits you!
              </p>
            </div>

            {/* Center Image */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-32 h-32 flex items-center justify-center">
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
              <p className="text-[10px] text-gray-500 text-center px-4 leading-relaxed">
                Deeming-rate opt-in can reduce the assets assessed for the Age
                Pension assets test, which can help maximise Age Pension
                eligibility depending on personal circumstances and Centrelink
                rules.{" "}
                <span className="text-blue-600 underline">
                  Read the Product Disclosure Statement.
                </span>
              </p>

              {/* Buttons */}
              <div className="space-y-3">
                <Button
                  className="w-full h-12 text-white font-medium rounded-full"
                  style={{ backgroundColor: purpleColor }}
                >
                  Opt-in Today
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-12 font-medium rounded-full border-2"
                  style={{
                    borderColor: purpleColor,
                    color: purpleColor,
                  }}
                >
                  Learn more
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DeviceFrameset>
    </div>
  );
}
