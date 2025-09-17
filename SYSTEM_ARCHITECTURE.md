# System Architecture

## Overview
A clean, maintainable architecture for the retirement income calculator that emphasizes reusability, type safety, and elegant branching logic using react-use-wizard for step management.

---

## Core Architecture Components

### 1. Component Hierarchy & Reusability

#### Base Components (`components/calculator/`)
- **QuestionLayout.tsx** - Wrapper for all question pages with consistent styling, animations, and layout
- **TextDisplay.tsx** - Narrative text pages with reveal animations
- **NumericInput.tsx** - Standard numeric input with validation and formatting
- **ScrollWheelInput.tsx** - iOS-style scroll wheel number selector for age and year inputs
- **CurrencyInput.tsx** - Formatted currency input with AUD formatting
- **MultipleChoice.tsx** - Radio button group for single-choice questions (not dropdowns)
- **YesNoChoice.tsx** - Specialized binary choice component
- **ProgressBar.tsx** - Animated progress indicator at bottom of screen

#### Page Templates (`components/calculator/templates/`)
- **NarrativePage.tsx** - Text-only narrative pages for story elements
- **SingleInputPage.tsx** - Single question with one input field (all questions use this)
- **SummaryPage.tsx** - Section summaries and milestone celebrations
- **ResultsPage.tsx** - Final results display with visualizations

### 2. Form Flow Architecture with react-use-wizard

#### Wizard Implementation Strategy
Using react-use-wizard's built-in features for navigation and branching:

```typescript
// Branching achieved through conditional goToStep()
const StockQuestion = () => {
  const { handleStep, goToStep, activeStep } = useWizard();

  const onSubmit = (data: FormData) => {
    if (data.ownsStocks === 'no') {
      // Skip stock detail questions
      goToStep(activeStep + 3); // Skip next 2 steps
    } else {
      // Continue to stock details
      nextStep();
    }
  };
};
```

#### Step Organization (`config/steps/`)
```typescript
// Flat array of all possible steps
export const allSteps = [
  // Personal Information Section
  WelcomePage,
  AgeQuestion,
  RetirementTimeframe,
  SuperBalance,
  RelationshipStatus,

  // Conditional branches (flat structure)
  OwnsStocks,
  StockValue,        // Only shown if owns stocks
  StockDividends,    // Only shown if owns stocks
  OwnsProperty,
  PropertyValue,     // Only shown if owns property

  // Age Pension Section
  PensionIntro,
  HomeOwnership,
  OtherAssets,
  IncomeStreams,

  // Results Section
  PensionResult,
  RecommendationIntro,
  PreMixRecommendation,
  IncomeProjection,
  FinalComparison
];
```

### 3. State Management Architecture (Simplified)

#### Two-Layer State System

1. **Step State** - React Hook Form for current step's form data
   - Handles validation for current input
   - Temporary storage before committing to global state

2. **Global State** - Zustand for accumulated form data
   - Persists all user inputs across steps
   - Used for calculations and final submission
   - Provides data for back navigation

```typescript
// store/calculatorStore.ts
interface CalculatorState {
  // User data
  personalInfo: {
    age: number;
    retirementYears: number;
    superBalance: number;
    relationshipStatus: string;
  };

  assets: {
    ownsStocks: boolean;
    stockValue?: number;
    stockDividends?: number;
    ownsProperty: boolean;
    propertyValue?: number;
  };

  pensionData: {
    homeOwnership: string;
    otherAssets: number;
    incomeStreams: number;
  };

  // Calculated results
  calculations: {
    estimatedPension: number;
    recommendedPreMix: PreMixOption;
    projectedIncome: number;
  };

  // Actions
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateAssets: (data: Partial<Assets>) => void;
  updatePensionData: (data: Partial<PensionData>) => void;
  setCalculations: (data: Calculations) => void;

  // Helper to get all data for calculations
  getAllData: () => CompleteFormData;
}
```

**Why Two Layers?**
- **Step State**: Immediate validation and user feedback
- **Global State**: Data persistence across navigation and calculations

### 4. Calculation Functions Architecture

#### Dedicated Calculation Module (`lib/calculations/`)
```typescript
// lib/calculations/agePension.ts
export function calculateAgePension(data: {
  age: number;
  relationshipStatus: string;
  homeOwnership: string;
  assets: number;
  income: number;
}): AgePensionResult {
  // Mock calculation for now
  return {
    eligible: true,
    amount: 25000,
    type: 'partial'
  };
}

// lib/calculations/preMix.ts
export function determinePreMix(
  pensionResult: AgePensionResult
): PreMixRecommendation {
  // Logic to determine optimal pre-mix
  return {
    option: 'balanced',
    lifetimeIncome: 30,
    choiceIncome: 40,
    agePension: 30
  };
}

// lib/calculations/retirement.ts
export function projectRetirementIncome(
  preMix: PreMixRecommendation,
  userData: CompleteFormData
): ProjectionResult {
  // Calculate projected income
  return {
    monthlyIncome: 4500,
    sources: [...]
  };
}
```

#### Calling Calculations Mid-Flow
```typescript
// At the end of Age Pension section
const PensionResultPage = () => {
  const { getAllData, setCalculations } = useCalculatorStore();
  const { nextStep } = useWizard();

  useEffect(() => {
    const data = getAllData();
    const pensionResult = calculateAgePension(data);
    setCalculations({ estimatedPension: pensionResult.amount });
  }, []);

  // Display result and continue
};
```

### 5. Theme System (Simplified)

#### Single-Source CSS Variable Theming
Following shadcn's recommended approach - using CSS variables only, no separate design tokens:

**Theme Configuration** (`app/globals.css`)
```css
:root {
  /* Australian Super Brand Colors */
  --primary: oklch(0.25 0.09 165);        /* AS Deep Green */
  --primary-foreground: oklch(1 0 0);     /* White */

  --secondary: oklch(0.52 0.19 150);      /* AS Bright Green */
  --secondary-foreground: oklch(1 0 0);

  --accent: oklch(0.75 0.18 85);          /* AS Gold */
  --accent-foreground: oklch(0.2 0 0);

  /* Keep other shadcn defaults */
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);

  /* Custom additions for calculator */
  --success: oklch(0.52 0.19 150);
  --success-foreground: oklch(1 0 0);

  --warning: oklch(0.84 0.16 84);
  --warning-foreground: oklch(0.28 0.07 46);

  /* No dark mode - light only */
}

@theme inline {
  --color-success: var(--success);
  --color-success-foreground: var(--success-foreground);
  --color-warning: var(--warning);
  --color-warning-foreground: var(--warning-foreground);
}
```

**Usage in Components**
```tsx
// Simple, consistent usage everywhere
<div className="bg-primary text-primary-foreground">
  Australian Super
</div>

<Button variant="secondary">Continue</Button>

<div className="bg-accent text-accent-foreground">
  Highlight
</div>
```

**Benefits**
- No duplicate color definitions
- Works seamlessly with shadcn components
- Simple to maintain and modify
- Tailwind utilities handle everything

### 6. Project Structure (Updated)

```
src/
├── app/
│   ├── calculator/
│   │   ├── layout.tsx           # Calculator layout with progress bar
│   │   └── page.tsx             # Wizard wrapper and step components
│   └── globals.css              # CSS variables for theming
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   ├── calculator/
│   │   ├── inputs/
│   │   │   ├── ScrollWheelInput.tsx
│   │   │   ├── NumericInput.tsx
│   │   │   ├── CurrencyInput.tsx
│   │   │   └── MultipleChoice.tsx
│   │   ├── templates/
│   │   │   ├── NarrativePage.tsx
│   │   │   ├── SingleInputPage.tsx
│   │   │   ├── SummaryPage.tsx
│   │   │   └── ResultsPage.tsx
│   │   └── ProgressBar.tsx
│   └── animations/              # Additional Framer Motion components
│
├── config/
│   ├── steps/
│   │   ├── index.ts             # All step components array
│   │   ├── personal.tsx         # Personal info step components
│   │   ├── pension.tsx          # Age pension step components
│   │   └── results.tsx          # Results section components
│   └── validations/
│       └── schemas.ts           # Zod validation schemas
│
├── lib/
│   ├── calculations/
│   │   ├── agePension.ts        # Age pension calculator
│   │   ├── preMix.ts           # Pre-mix recommendation logic
│   │   └── retirement.ts        # Retirement income projections
│   ├── hooks/
│   │   └── useStepValidation.ts # Validation hook for steps
│   └── utils/
│       └── formatters.ts        # Number, currency formatting
│
├── store/
│   └── calculatorStore.ts       # Zustand store
│
├── styles/
│   └── animations/              # Framer Motion variants only
│
└── types/
    └── calculator.ts            # TypeScript type definitions
```

### 7. Branching Logic with react-use-wizard

#### Step Visibility Map (Default Approach)
We'll use conditional rendering as our primary branching strategy - it's cleaner and more maintainable:

```typescript
// app/calculator/page.tsx
const CalculatorWizard = () => {
  const {
    ownsStocks,
    ownsProperty,
    hasPartner
  } = useCalculatorStore();

  return (
    <Wizard wrapper={<AnimationWrapper />}>
      {/* Section 1: Personal Information */}
      <WelcomePage />
      <AgeQuestion />
      <RetirementTimeframe />
      <SuperBalance />
      <RelationshipStatus />

      {hasPartner && (
        <>
          <PartnerAge />
          <PartnerSuper />
        </>
      )}

      {/* Section 1.5: Assets */}
      <OwnsStocks />
      {ownsStocks && (
        <>
          <StockValue />
          <StockDividends />
        </>
      )}

      <OwnsProperty />
      {ownsProperty && (
        <>
          <PropertyValue />
          <PropertyType />
        </>
      )}

      {/* Section 2: Age Pension */}
      <PensionIntro />
      <HomeOwnership />
      <OtherAssets />
      <IncomeStreams />
      <PensionResultPage />

      {/* Section 3: Results */}
      <RecommendationIntro />
      <PreMixRecommendation />
      <IncomeProjection />
      <ComparisonChart />
      <FinalSummary />
    </Wizard>
  );
};
```

**Why Step Visibility Map?**
- **Clearer code**: Easy to see flow at a glance
- **Maintainable**: Add/remove steps without counting indices
- **React-friendly**: Leverages React's conditional rendering
- **Type-safe**: TypeScript can verify component existence
- **No manual index management**: Avoids off-by-one errors

**Fallback Skip Logic**
For complex scenarios, we can still use `goToStep()` as needed:

```typescript
// For jumping to specific sections
const skipToResults = () => {
  const { goToStep, stepCount } = useWizard();
  goToStep(stepCount - 5); // Jump to results section
};
```

### 8. Progress Bar Implementation

#### Progress Calculation
Using react-use-wizard's `activeStep` and `stepCount`:

```typescript
const ProgressBar = () => {
  const { activeStep, stepCount } = useWizard();
  const { completedSections } = useCalculatorStore();

  // Calculate progress percentage
  const progress = ((activeStep + 1) / stepCount) * 100;

  // Section-based progress
  const sectionProgress = {
    personal: activeStep <= 8 ? 'active' : 'complete',
    pension: activeStep > 8 && activeStep <= 15 ? 'active' :
             activeStep > 15 ? 'complete' : 'pending',
    results: activeStep > 15 ? 'active' : 'pending'
  };

  return (
    <motion.div
      className="fixed bottom-0 w-full"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: progress / 100 }}
      transition={{ duration: 0.3 }}
    >
      {/* Progress bar UI */}
    </motion.div>
  );
};
```

### 9. Animation Strategy (Simplified)

#### Page Transitions via react-use-wizard
Using the `wrapper` prop for animations:

```typescript
// Wrapper component for step animations
const AnimationWrapper = ({ children }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={activeStep} // From useWizard
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  </AnimatePresence>
);

// In main component
<Wizard wrapper={<AnimationWrapper />}>
  {/* Steps */}
</Wizard>
```

#### Component-Level Animations
Individual animations for specific elements:

```typescript
// ScrollWheelInput animation
const ScrollWheelInput = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Scroll wheel UI */}
    </motion.div>
  );
};
```

---

## Implementation Plan

### Phase 1: Core Setup
1. Configure react-use-wizard with all steps
2. Set up Zustand store with proper TypeScript types
3. Create design token system
4. Build ScrollWheelInput component

### Phase 2: Step Components
1. Create all personal information steps
2. Implement branching logic with goToStep()
3. Build age pension calculator steps
4. Add validation with React Hook Form

### Phase 3: Calculations
1. Implement age pension calculation function
2. Add pre-mix recommendation logic
3. Create retirement projection calculator
4. Wire up mid-flow calculations

### Phase 4: Polish
1. Add progress bar with section indicators
2. Implement all animations
3. Create summary pages
4. Build final results visualization with Recharts

---

## Key Architecture Benefits

### 1. Simplified State Management
- Only two layers instead of three
- Clear separation of concerns
- Easy to debug and maintain

### 2. Native Branching Support
- react-use-wizard handles navigation
- Simple skip logic with goToStep()
- No custom wizard engine needed

### 3. Reusability
- Single input template for all questions
- Consistent styling through templates
- Shared validation patterns

### 4. Progress Tracking
- Built-in activeStep from react-use-wizard
- Easy progress bar implementation
- Section-aware navigation

### 5. Calculation Integration
- Clear separation of calculation logic
- Easy to call mid-flow calculations
- Type-safe data flow

---

## Technical Decisions & Rationale

### Why react-use-wizard?
- **Built-in navigation**: Handles step management
- **Async support**: Good for calculations
- **Small size**: Minimal bundle impact
- **Skip logic**: goToStep() enables branching

### Why Two State Layers?
- **Step State**: Immediate validation and UI feedback
- **Global State**: Data persistence and calculations
- No need for separate wizard state (react-use-wizard handles it)

### Why CSS Variables Only?
- **Simplicity**: Single source of truth for theming
- **shadcn native**: Works perfectly with shadcn components
- **No duplication**: Avoid maintaining colors in two places
- **Tailwind integration**: Seamless with utility classes

### Why ScrollWheelInput?
- **Better UX**: More intuitive for age selection
- **Mobile-friendly**: Touch-optimized interaction
- **Distinctive**: Adds polish to the calculator

---

## Questions Resolved

### 1. Branching with react-use-wizard?
**Yes**, using `goToStep(index)` to skip steps based on conditions.

### 2. Form State vs Global State?
- **Form State**: Current step validation only
- **Global State**: Accumulated data for calculations and persistence

### 3. Theming Approach?
- **CSS Variables only**: Single source in globals.css
- **No design tokens**: Avoid over-engineering
- **shadcn convention**: Use bg-primary, text-primary-foreground

### 4. Calculation Data Source?
Pull from **Global State** using `getAllData()` when needed for calculations.

### 5. Progress Bar Data?
Use `activeStep` and `stepCount` from `useWizard()` hook.