# Product Requirements Document
## Australian Super Retirement Income Calculator

### Executive Summary
A polished, narrative-driven retirement income calculator designed for Australian Super members approaching retirement. The calculator guides users through a wizard-style multi-step form to determine their optimal pre-mix investment option based on their Age Pension eligibility and personal circumstances.

---

## 1. Product Overview

### Purpose
To help Australian Super members who are about to retire calculate their projected retirement income and recommend an optimal pre-mix investment option tailored to their Age Pension eligibility status.

### Target Users
- Australian Super members approaching retirement age
- Members seeking to understand their retirement income options
- Members wanting personalized pre-mix recommendations

### Key Value Proposition
- Personalized retirement income projections
- Tailored pre-mix investment recommendations
- Clear comparison between recommended vs. non-recommended options
- Educational journey that explains retirement income components

---

## 2. Product Components

### 2.1 Pre-mix Options Overview
Pre-mix options are preset retirement income strategies composed of three components:

1. **Age Pension** - Government pension based on eligibility
2. **Lifetime Income** - Australian Super product offering guaranteed income for life from a lump sum investment
3. **Choice Income** - Annuity-like product allowing regular withdrawals while remaining funds continue to grow

### 2.2 Pre-mix Determination Logic
Pre-mix recommendations are based on Age Pension eligibility status:
- **Not eligible** → Specific pre-mix allocation
- **Partial eligibility** → Variable rate pre-mix allocation
- **Full eligibility** → Full pension pre-mix allocation

---

## 3. User Experience Requirements

### 3.1 Design Principles
- **Single Question Per Page**: One focused question/input per screen
- **Narrative Journey**: Story-based flow that guides users through their retirement planning
- **Ultra-Polished UI**: Corporate, clean, professional aesthetic
- **Progressive Disclosure**: Information revealed contextually as users progress
- **Accessibility**: Fully accessible for all users

### 3.2 Form Flow Architecture
- **Wizard-style navigation** with clear progress indication
- **Back navigation** enabled for all steps
- **State persistence** across all form sections
- **Smooth transitions** between steps
- **Clear section demarcation** between the three main sections

### 3.3 User Journey Narrative
The calculator should feel like a guided conversation:
- Welcome users warmly
- Explain each step's purpose
- Provide context for why information is needed
- Celebrate milestones (section completions)
- Build anticipation toward the final recommendation

### 3.4 Narrative Framing & Story Arc
Instead of generic step numbers, frame the form as a guided journey with clear narrative sections:

#### Section Headers
- **Section 1**: "Let's get to know you"
- **Section 2**: "See what you're eligible for"
- **Section 3**: "Here's your personalised outcome"

#### Conversational Introduction
Each step includes a short, conversational intro:
- "First, tell us a bit about you."
- "Now, let's see if you qualify for Age Pension."
- "Here's how your future income could look."

This creates a lightweight story arc with beginning, middle, and payoff that builds trust and aligns with Australian Super's brand tone.

### 3.5 Micro-Animations & Transitions
Keep the flow playful without gimmicks through subtle animations:

#### Page Transitions
- Smooth fade/slide between steps using Framer Motion
- Direction-aware transitions (forward vs. backward navigation)

#### Progress Indicators
- Subtle progress bar that fills up as users advance
- Animated step indicators showing completion status

#### Reveal Moments
- Pension eligibility numbers animate with a counting-up effect
- Results fade in progressively rather than appearing instantly

#### Data Visualization Entrance
- Income breakdown chart animates into view at the end
- Individual chart segments stagger their entrance

### 3.6 Conversational UI Elements
Use natural language and warmth throughout:

#### Natural Language Labels
Instead of rigid form fields:
- ❌ "DOB: [input]"
- ✅ "I was born on [input]"
- ❌ "Current Balance: [input]"
- ✅ "My super balance is approximately [input]"

#### Inline Explainers
- Tooltips/popovers with "Why we ask this" explanations
- Builds trust by being transparent about data usage
- Light conversational copy that feels guided, not interrogated

### 3.7 Milestone Check-ins
Add rhythm and prevent overwhelm in the 20-step journey:

#### Section Summaries
After each major section, display a mini-summary card:
- **After Personal Info**: "Got it. Here's what we know about you so far."
- **After Age Pension**: "Here's your Age Pension estimate: $X per fortnight"
- **Before Recommendations**: "Great! We have everything we need."

#### Visual Contrast Screen
At the journey's end:
- Split-screen comparison: "With our Pre-mix: $X/month" vs. "Without: $Y/month"
- Visual graph breaking down pension vs. lifetime income vs. choice income
- Clear call-to-action for next steps

These milestone moments reinforce the narrative arc and help users understand their progress.

---

## 4. Functional Requirements

### 4.1 Section 1: Personal Information
**Purpose**: Capture basic demographic and financial information

**Data Collection**:
- Full name
- Date of birth
- Current age
- Expected retirement age
- Gender
- Relationship status
- Current superannuation balance
- Other relevant personal details

**Features**:
- Input validation
- Age calculations
- Clear field labels and helper text
- Progress saving

### 4.2 Section 2: Age Pension Calculator
**Purpose**: Determine Age Pension eligibility and estimated amount

**Data Collection**:
- Home ownership status
- Assets (financial and non-financial)
- Income sources
- Partner details (if applicable)
- Other Age Pension-specific variables

**Features**:
- Real-time eligibility calculation
- Clear eligibility status display (Not eligible/Partial/Full)
- Estimated pension amount display
- Educational tooltips explaining Age Pension rules
- Section summary before proceeding

### 4.3 Section 3: Pre-mix Recommendation Journey
**Purpose**: Present personalized pre-mix recommendation and retirement income projection

**Flow**:
1. **Introduction** - Explain what's coming
2. **Recommendation Reveal** - Show recommended pre-mix based on Age Pension status
3. **Component Breakdown** - Explain each component of the pre-mix
4. **Income Projection** - Display projected retirement income
5. **Comparison** - Show recommended vs. non-recommended scenarios
6. **Visualization** - Interactive charts showing income sources breakdown

**Features**:
- No additional user input required
- Conversational, educational tone
- Progressive reveal of information
- Interactive data visualizations
- Downloadable/printable summary

---

## 5. Technical Requirements

### 5.1 Core Technology Stack

#### Framework & Language
- **Next.js** (App Router) + **TypeScript**
- Server-side rendering for performance
- Type safety throughout

#### Styling & UI
- **Tailwind CSS** with custom theme and design tokens
- **Radix UI** primitives for accessibility
- **shadcn/ui** for common components (Button, Input, Dialog, Progress)
- **lucide-react** for iconography
- **Framer Motion** or similar for page/step transitions

#### Form Management
- **React Hook Form** for form state management
- **Zod** for schema validation via @hookform/resolvers/zod
- **react-use-wizard** for multi-page flow orchestration

#### Data & Utilities
- **TanStack Query** for fetching/caching rates & assumptions
- **date-fns** for age/retirement date calculations
- **Intl.NumberFormat** for AUD currency & percentage formatting

#### Data Visualization
- **Recharts** for retirement income projection charts
- Interactive, responsive chart components
- Clear visual hierarchy

### 5.2 Code Quality Requirements
- **Maintainability**: Clean, modular component structure
- **Reusability**: Shared components and utilities
- **Type Safety**: Full TypeScript coverage
- **Testing**: Unit tests for critical calculations
- **Documentation**: Clear inline documentation
- **Performance**: Optimized bundle size and rendering

### 5.3 State Management
- Centralized form state using React Hook Form
- Persistent state across navigation
- Debug-friendly state structure
- Clear state reset mechanisms

---

## 6. Non-Functional Requirements

### 6.1 Performance
- Page load time < 2 seconds
- Smooth transitions between steps (< 300ms)
- No layout shift during navigation
- Optimized for mobile devices

### 6.2 Browser Compatibility
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)
- Edge (latest 2 versions)

### 6.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support

### 6.4 Security
- No sensitive data stored client-side
- HTTPS only
- Input sanitization
- XSS protection

---

## 7. Implementation Phases

### Phase 1: Foundation
1. Project setup with all dependencies
2. Design system and theme configuration
3. Basic multi-step form architecture
4. Component library setup

### Phase 2: Personal Information Section
1. Build all personal info forms
2. Implement validation
3. State management setup
4. Section transitions

### Phase 3: Age Pension Calculator
1. Build Age Pension forms
2. Implement calculation logic (mock)
3. Results display
4. Educational content

### Phase 4: Pre-mix Recommendation
1. Build narrative flow
2. Recommendation logic
3. Comparison displays
4. Data visualizations

### Phase 5: Polish & Optimization
1. Animations and transitions
2. Performance optimization
3. Cross-browser testing
4. Accessibility audit

---

## 8. Success Metrics

### User Experience
- Form completion rate > 80%
- Average time to complete < 10 minutes
- User satisfaction score > 4.5/5

### Technical
- Lighthouse performance score > 90
- Zero critical accessibility issues
- < 500kb JavaScript bundle size

### Business
- Stakeholder approval for production development
- Clear demonstration of value to members
- Increased understanding of retirement options

---

## 9. Risks & Mitigation

### Risk 1: Complex Form Abandonment
**Mitigation**: Save progress, allow resume later, clear progress indicators

### Risk 2: Calculation Accuracy Concerns
**Mitigation**: Clear disclaimers, mock calculations for POC, professional review

### Risk 3: Mobile Experience
**Mitigation**: Mobile-first design, extensive device testing

---

## 10. Future Enhancements

- Save and return functionality
- Email results summary
- Appointment booking integration
- Multiple scenario comparisons
- Educational video content
- Multi-language support

---

## Appendix

### A. Mockup References
- Single question per page examples: Typeform, TurboTax
- Corporate clean design: Apple Card application, Stripe checkout
- Narrative flow: Headspace onboarding, Duolingo

### B. Australian Super Brand Guidelines
- Colors, typography, and tone of voice to be incorporated
- Accessibility standards compliance
- Legal disclaimer requirements

### C. Regulatory Considerations
- ASIC financial advice regulations
- Privacy Act compliance
- Superannuation disclosure requirements