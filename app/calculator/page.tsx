"use client";

import { Wizard } from "react-use-wizard";
import { AnimatePresence } from "framer-motion";
import WizardFooter from "@/components/calculator/WizardFooter";
import AnimationWrapper from "@/components/calculator/AnimationWrapper";

// Step components
import WelcomePage from "@/components/calculator/steps/WelcomePage";
import AgeQuestion from "@/components/calculator/steps/AgeQuestion";
import ScrollWheelAge from "@/components/calculator/steps/ScrollWheelAge";
import RetirementYears from "@/components/calculator/steps/RetirementYears";
import SuperBalance from "@/components/calculator/steps/SuperBalance";
import RelationshipStatus from "@/components/calculator/steps/RelationshipStatus";
import HomeOwnership from "@/components/calculator/steps/HomeOwnership";
import SectionComplete from "@/components/calculator/steps/SectionComplete";

export default function CalculatorPage() {
  return (
    <div className="mx-auto px-4 overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Wizard wrapper={<AnimationWrapper />} footer={<WizardFooter />}>
          {/* Welcome */}
          <WelcomePage />

          {/* Section 1: Personal Information */}
          <AgeQuestion />
          <ScrollWheelAge />
          <RetirementYears />
          <SuperBalance />
          <RelationshipStatus />

          {/* Section Complete */}
          <SectionComplete />

          {/* Section 2: Age Pension */}
          <HomeOwnership />
        </Wizard>
      </AnimatePresence>
    </div>
  );
}
