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

      case "totalAssets":
        // Total assets can be 0, but must be defined
        return personalInfo.totalAssets !== undefined && personalInfo.totalAssets >= 0;

      case "homeOwnership":
        return pensionData.homeOwnership !== undefined && pensionData.homeOwnership !== "";

      case "combinedIncome":
        // Income can be 0, but must be defined
        return pensionData.combinedIncome !== undefined;

      default:
        return true; // Allow navigation for steps without validation
    }
  };

  return { validate };
}