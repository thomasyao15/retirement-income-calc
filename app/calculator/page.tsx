"use client";

import { Wizard } from "react-use-wizard";
import { AnimatePresence } from "framer-motion";
import WizardFooter from "@/components/calculator/WizardFooter";
import WizardProgress from "@/components/calculator/WizardProgress";
import SectionCheckpoint from "@/components/calculator/SectionCheckpoint";
import AnimationWrapper from "@/components/calculator/AnimationWrapper";

// Step components - Personal Information
import WelcomePage from "@/components/calculator/steps/WelcomePage";
import AgeQuestion from "@/components/calculator/steps/AgeQuestion";
import Gender from "@/components/calculator/steps/Gender";
import RelationshipStatus from "@/components/calculator/steps/RelationshipStatus";
import ExpectedLongevity from "@/components/calculator/steps/ExpectedLongevity";
import SuperBalance from "@/components/calculator/steps/SuperBalance";
import BankMoney from "@/components/calculator/steps/BankMoney";
import SharesInvestment from "@/components/calculator/steps/SharesInvestment";
import InvestmentProperty from "@/components/calculator/steps/InvestmentProperty";
import IncomeStreams from "@/components/calculator/steps/IncomeStreams";

// Step components - Age Pension
import AgePensionIntro from "@/components/calculator/steps/AgePensionIntro";
import HomeOwnership from "@/components/calculator/steps/HomeOwnership";
import OtherAssets from "@/components/calculator/steps/OtherAssets";
import CombinedIncome from "@/components/calculator/steps/CombinedIncome";
import AgePensionResult from "@/components/calculator/steps/AgePensionResult";

// Step components - Pre-Mix Recommendation
import PreMixIntro from "@/components/calculator/steps/PreMixIntro";
import UnderstandingOptions from "@/components/calculator/steps/UnderstandingOptions";
import SafetyNetDisplay from "@/components/calculator/steps/SafetyNetDisplay";
import FinalIncomeDisplay from "@/components/calculator/steps/FinalIncomeDisplay";
import CallToAction from "@/components/calculator/steps/CallToAction";
import SummaryReview from "@/components/calculator/steps/SummaryReview";

// Checkpoint components
const Section1Checkpoint = () => (
  <SectionCheckpoint
    currentSection={1}
    title="Great progress!"
    subtitle="You've completed the personal information section"
    content="Now let's check your Age Pension eligibility to determine the best retirement income strategy for you."
  />
);

const Section2Checkpoint = () => (
  <SectionCheckpoint
    currentSection={2}
    title="Excellent work!"
    subtitle="We've calculated your Age Pension eligibility"
    content="Finally, let's explore your personalized Pre-Mix recommendation to maximize your retirement income."
  />
);

export default function CalculatorPage() {
  return (
    <div className="mx-auto px-4 overflow-x-hidden">
      <AnimatePresence mode="wait">
        <Wizard wrapper={<AnimationWrapper />} footer={<WizardFooter />}>
          {/* Welcome */}
          <WelcomePage />

          {/* Section 1: Personal Information */}
          <AgeQuestion />
          <Gender />
          <RelationshipStatus />
          <ExpectedLongevity />
          <SuperBalance />
          <BankMoney />
          <SharesInvestment />
          <InvestmentProperty />
          <IncomeStreams />

          {/* Section 1 Complete */}
          <Section1Checkpoint />

          {/* Section 2: Age Pension */}
          <AgePensionIntro />
          <HomeOwnership />
          <OtherAssets />
          <CombinedIncome />
          <AgePensionResult />

          {/* Section 2 Complete */}
          <Section2Checkpoint />

          {/* Section 3: Pre-Mix Recommendation */}
          <PreMixIntro />
          <UnderstandingOptions />
          <SafetyNetDisplay />
          <FinalIncomeDisplay />
          <CallToAction />

          {/* Summary Review */}
          <SummaryReview />
        </Wizard>
      </AnimatePresence>
    </div>
  );
}
