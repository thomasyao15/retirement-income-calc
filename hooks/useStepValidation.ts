import { useCalculatorStore } from "@/store/calculatorStore";

export function useStepValidation(stepName: string) {
  const { personalInfo, assets, pensionData } = useCalculatorStore();

  const validate = (): boolean => {
    switch (stepName) {
      case "age":
        return personalInfo.age !== undefined && personalInfo.age >= 18 && personalInfo.age <= 120;

      case "gender":
        return personalInfo.gender !== undefined;

      case "relationshipStatus":
        return personalInfo.relationshipStatus !== undefined && personalInfo.relationshipStatus !== "";

      case "expectedLongevity":
        return personalInfo.retirementYears !== undefined && personalInfo.retirementYears >= 1;

      case "superBalance":
        return personalInfo.superBalance !== undefined && personalInfo.superBalance >= 0;

      case "bankMoney":
        // If they said yes, they must enter an amount
        if (assets.hasBankMoney === true) {
          return assets.bankMoneyAmount !== undefined && assets.bankMoneyAmount > 0;
        }
        // Must answer yes/no
        return assets.hasBankMoney !== undefined;

      case "sharesInvestment":
        if (assets.hasShares === true) {
          return assets.sharesValue !== undefined && assets.sharesValue > 0;
        }
        return assets.hasShares !== undefined;

      case "investmentProperty":
        if (assets.hasInvestmentProperty === true) {
          return assets.investmentPropertyValue !== undefined && assets.investmentPropertyValue > 0;
        }
        return assets.hasInvestmentProperty !== undefined;

      case "homeOwnership":
        return pensionData.homeOwnership !== undefined && pensionData.homeOwnership !== "";

      case "otherAssets":
        // Other assets can be 0, but must be defined
        return pensionData.otherAssets !== undefined;

      case "combinedIncome":
        // Income can be 0, but must be defined
        return pensionData.combinedIncome !== undefined;

      default:
        return true; // Allow navigation for steps without validation
    }
  };

  return { validate };
}