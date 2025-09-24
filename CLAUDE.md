Every line of code you write should be clean, elegant and maintainable without being overengineered. I need simple and clean code being written.


# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server with TurboPack (fast refresh)
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Project Architecture

This is a Next.js 15+ retirement income calculator for AustralianSuper members, built as a multi-step wizard with three main sections:

### Core Structure
- **Framework**: Next.js App Router with TypeScript
- **State Management**: Zustand store (`store/calculatorStore.ts`) - centralized state for all calculator data
- **Form Management**: React Hook Form + Zod validation across all wizard steps
- **Multi-Step Flow**: react-use-wizard for wizard navigation with AnimatePresence transitions

### Calculator Flow (3 Sections, 20+ Steps)

1. **Section 1 - Personal Information** (`components/calculator/steps/`)
   - Collects age, gender, relationship status, super balance, assets
   - Updates `personalInfo` and `assets` in store

2. **Section 2 - Age Pension Calculator**
   - Determines eligibility (full/partial/none) based on income and asset tests
   - Complex calculation logic in `lib/calculations.ts`
   - Results stored in `calculations` object

3. **Section 3 - PreSet Recommendation**
   - Recommends product (A/B/C/D) based on pension eligibility percentage
   - Shows allocation between Choice Income and Lifetime Income products
   - Visual comparisons and income projections

### Key Business Logic

**Age Pension Calculation** (`lib/calculations.ts`):
- Two tests: Income Test and Asset Test (lower result applies)
- 40% discount on Lifetime Income products for asset test
- Products recommended based on pension percentage:
  - Product A: 90-100% pension (85% Choice, 15% Lifetime)
  - Product B: 50-90% pension (80% Choice, 20% Lifetime)
  - Product C: 10-50% pension (70% Choice, 30% Lifetime) - optimal for discount
  - Product D: 0-10% pension (90% Choice, 10% Lifetime)

**Income Calculations**:
- **Choice Income**: Age-based drawdown rates (5-14% annually)
- **Lifetime Income**: Fixed 6.7% annually for life
- **Age Pension**: Government benefit based on means testing

### UI/UX Principles
- Single question per page with narrative journey
- Section checkpoints between major sections
- Progressive disclosure with educational content
- Animated transitions using Framer Motion
- Corporate, polished aesthetic with AustralianSuper branding

### Component Organization
- `components/calculator/` - Wizard components and steps
- `components/ui/` - Reusable UI primitives (shadcn/ui)
- `contexts/ValidationContext.tsx` - Form validation state
- `app/calculator/` - Main calculator page and layout

## Code Guidelines

1. **Clean, Simple Code**: Write maintainable code without overengineering
2. **Follow Existing Patterns**: Check neighboring components for conventions
3. **State Management**: Use Zustand store for all calculator data
4. **Form Handling**: React Hook Form + Zod for all inputs
5. **Styling**: Tailwind CSS with custom theme, use `cn()` utility for class merging
6. **Type Safety**: Full TypeScript coverage, no `any` types