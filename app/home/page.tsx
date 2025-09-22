"use client";

import {
  Home,
  Receipt,
  TrendingUp,
  MoreHorizontal,
  Bell,
  MessageCircle,
  Umbrella,
  Compass,
  ChevronRight,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function HomePage() {
  const purpleColor = "var(--as-tolopea)";

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Top Navigation - Sticky */}
      <div className="sticky top-0 z-50 bg-white border-b">
        <div className="relative flex items-center justify-center px-4 h-14">
          <h1 className="text-lg font-semibold">Home</h1>
          <div className="absolute right-4 flex items-center gap-3">
            <button className="relative p-2">
              <div
                className="absolute -top-1 -right-1 w-5 h-5 text-white rounded-full flex items-center justify-center text-xs font-medium"
                style={{ backgroundColor: purpleColor }}
              >
                5
              </div>
              <Bell className="w-5 h-5" style={{ color: purpleColor }} />
            </button>
            <button className="p-2">
              <MessageCircle
                className="w-5 h-5"
                style={{ color: purpleColor }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Contribution caps */}
        <div className="space-y-1">
          <label className="text-sm font-bold" style={{ color: purpleColor }}>
            Contribution caps
          </label>
          <div className="pb-4">
            <Separator className="bg-gray-300" />
          </div>
        </div>

        {/* BPAY */}
        <div className="space-y-1">
          <label className="text-sm font-bold" style={{ color: purpleColor }}>
            BPAY
          </label>
          <div className="pb-4">
            <Separator className="bg-gray-300" />
          </div>
        </div>

        {/* Direct debit */}
        <div className="space-y-3">
          <label className="text-sm text-gray-600">Direct debit</label>
          <div className="flex gap-2 flex-wrap">
            {["$50", "$100", "$200", "Other"].map((amount) => (
              <button
                key={amount}
                className="px-6 py-2 bg-white border-2 rounded-full font-medium transition-colors hover:text-white"
                style={{
                  borderColor: purpleColor,
                  color: purpleColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = purpleColor;
                  e.currentTarget.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.color = purpleColor;
                }}
              >
                {amount}
              </button>
            ))}
          </div>
        </div>

        {/* Insurance cover section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm text-gray-600">Insurance cover</h3>
            <button className="p-1">
              <Info className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <Card className="bg-white py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Umbrella className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-base font-medium">Cover not started</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Direct section */}
        <div className="space-y-2">
          <h3 className="text-sm text-gray-600">Member Direct</h3>

          {/* Member Direct card */}
          <Card className="bg-white py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium">
                    Discover Member Direct
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lifetime Income Product section */}
        <div className="space-y-2">
          <h3 className="text-sm text-gray-600">Lifetime Income Product</h3>

          {/* Lifetime Income Product card */}
          <Card className="bg-white py-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-medium">
                    Discover Lifetime Income
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Keep on track section */}
        <div className="space-y-4">
          <h3 className="text-sm text-gray-600">Keep on track</h3>

          {/* Beneficiaries */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label
                className="text-sm font-bold"
                style={{ color: purpleColor }}
              >
                Beneficiaries
              </label>
              <button className="text-orange-500 font-medium text-sm">
                + Add
              </button>
            </div>
            <div className="pb-4">
              <Separator className="bg-gray-300" />
            </div>
          </div>

          {/* Tell your employer */}
          <div className="space-y-1">
            <label className="text-sm font-bold" style={{ color: purpleColor }}>
              Tell your employer
            </label>
            <div className="pb-4">
              <Separator className="bg-gray-300" />
            </div>
          </div>

          {/* Consolidate your super */}
          <div className="space-y-1">
            <label className="text-sm font-bold" style={{ color: purpleColor }}>
              Consolidate your super
            </label>
            <div className="pb-4">
              <Separator className="bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-4 h-16">
          <button
            className="flex flex-col items-center justify-center gap-1"
            style={{ color: purpleColor }}
          >
            <Home className="w-5 h-5" fill="currentColor" />
            <span className="text-xs">Home</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-500">
            <Receipt className="w-5 h-5" />
            <span className="text-xs">Transactions</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-500">
            <TrendingUp className="w-5 h-5" />
            <span className="text-xs">Investments</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-1 text-gray-500">
            <MoreHorizontal className="w-5 h-5" />
            <span className="text-xs">More</span>
          </button>
        </div>
      </div>
    </div>
  );
}
