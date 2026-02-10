# Product Requirements Document: Body Sculpt Mobile App

## 1. Overview

**Product vision**  
Body Sculpt is a mobile‑first workout companion that helps users follow curated bodyweight and strength routines, track their progress, and stay motivated with structured plans and community features.[file:25]

**Problem statement**  
People who want to work out often lack a clear, structured plan and an easy way to discover appropriate exercises and routines on mobile, leading to confusion and drop‑off.[file:25]

**Target users / personas**  
- Beginner fitness enthusiasts who want guided, ready‑made workouts they can follow at home or in the gym.[file:25]  
- Intermediate lifters/calisthenics athletes seeking structured routines and progression for specific goals (e.g., core, pullups, legs).[file:25]  
- Busy professionals who need fast access to short, effective plans they can run from their phone.[file:25]

**Business goals & success metrics**  
- Increase weekly active users engaging with at least one workout or plan per week.[file:25]  
- Improve user retention by providing clear plans, saved progress, and a sense of community.[file:25]  
- Create a foundation for future monetization via premium plans and coaching.[file:25]  
- Key metrics: app opens per week, workouts started/completed, plan adherence, community engagement (posts/reactions), and profile completion.[file:25]

---

## 2. Scope & non‑scope

**In‑scope (this release)**  
- Mobile‑optimized web app UI with bottom navigation across Home, Workouts, Plans, Community, and Profile.[file:25]  
- Static catalogue of workouts and exercises with rich cards and detail screens.[file:25]  
- Basic “Plans” surface for presenting workout plans (UI and navigation, limited logic).[file:25]  
- Community and Profile pages with placeholder content ready for iteration.[file:25]  
- Core UI components (cards, buttons, lists, carousels, charts, forms) and layout system (AppLayout, BottomNav).[file:25]

**Out‑of‑scope (current version)**  
- User authentication and persistent user accounts.[file:25]  
- Real data sync, backend APIs, and cloud storage (current data is local/static via `src/data`).[file:25]  
- Advanced plan logic (adaptive plans, scheduling, reminders).[file:25]  
- Social graph, real‑time chat, or content posting in Community.[file:25]  
- Payment, subscriptions, or in‑app purchases.[file:25]

---

## 3. User stories and flows

### 3.1 Core user stories

- As a new user, I want to browse featured workouts from the Home screen so that I can quickly start training without configuring anything.[file:25]  
- As a user, I want to view a list of workouts by category so that I can choose a routine that fits my goals (core, legs, pullups, etc.).[file:25]  
- As a user, I want to open a workout detail screen so that I can see the exercises included and understand how to perform them.[file:25]  
- As a user, I want to open exercise details so I can see muscles targeted and instructions or demo imagery.[file:25]  
- As a user, I want to view available workout plans so I can follow a structured program over time.[file:25]  
- As a user, I want to access a Community screen so I feel there is a social aspect and future updates for shared progress.[file:25]  
- As a user, I want a Profile screen where my future stats and preferences can live.[file:25]

Each user story should have acceptance criteria, e.g.:

- Home featured workouts:  
  - The Home page loads within 2 seconds on a typical mobile connection.[file:25]  
  - It displays at least one hero workout and a list/grid of additional workouts.[file:25]  
  - Tapping any workout card navigates to its Workout Detail screen.[file:25]

### 3.2 User flows (linked to screens)

**Flow 1 – Discover and open a workout**

1. User opens the app and lands on `/` (Home), rendered by `Home.tsx` via `Index.tsx` routing and `AppLayout`.[file:25]  
2. Home shows hero imagery (e.g., `hero-home.jpg`) and featured workouts using `WorkoutCard` and `workouts.ts` data.[file:25]  
3. User taps a workout card; navigation goes to `/workouts/:id`, handled by `WorkoutDetail.tsx`.[file:25]  
4. Workout Detail displays workout title, description, maybe difficulty and focus area, plus list of exercises from `exercises.ts`.[file:25]  
5. User can navigate back or move to related exercises.

**Flow 2 – Explore all workouts**

1. User taps the Workouts icon in `BottomNav` (`/workouts`).[file:25]  
2. `Workouts.tsx` lists all available workouts, possibly grouped or filtered.[file:25]  
3. User scrolls, taps any workout to open Workout Detail.[file:25]

**Flow 3 – View plans**

1. User taps the Plans icon in `BottomNav` (`/plans`).[file:25]  
2. `Plans.tsx` shows a set of available plans or placeholder content for plans.[file:25]  
3. Future: user taps a plan to see a multi‑week schedule and assigned workouts.

**Flow 4 – Community**

1. User taps Community in `BottomNav` (`/community`).[file:25]  
2. `Community.tsx` displays community‑oriented content or placeholders (cards, posts, or FAQ style content using common UI components).[file:25]

**Flow 5 – Profile**

1. User taps Profile in `BottomNav` (`/profile`).[file:25]  
2. `Profile.tsx` shows a basic profile shell (avatar, text, sections) ready for future expansion (stats, preferences).[file:25]

---

## 4. Detailed feature requirements

### 4.1 Feature list

```markdown
| Feature                   | Description                                                       | User stories                                                                 | Priority | Acceptance criteria                                                                                                                                       | Notes / Dependencies                        |
|---------------------------|-------------------------------------------------------------------|------------------------------------------------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------|
| Home screen               | Landing page with hero section and featured workouts             | Discover featured workouts; quick start                                     | Must     | Home loads within 2s, shows hero + workout list; tapping a workout opens its detail; bottom nav visible and functional                                   | Implemented in `Home.tsx`, `WorkoutCard.tsx`.[1] |
| Workouts listing          | List of all workouts with cards and filtering potential          | Explore all workouts                                                         | Must     | `/workouts` route renders list from `workouts.ts`; each item navigates to detail; empty state handled gracefully                                        | `Workouts.tsx`, `WorkoutCard.tsx`, `workouts.ts`.[1] |
| Workout detail            | Detailed view of a single workout and its exercises              | Understand workout content                                                   | Must     | `/workouts/:id` renders; displays title, description, exercises list, difficulty/target area; invalid ID shows NotFound                                  | `WorkoutDetail.tsx`, `exercises.ts`, `NotFound.tsx`.[1] |
| Exercises catalogue       | Catalogue of exercises data used by workouts                     | View exercise details                                                        | Should   | `exercises.ts` defines structured exercise data; each exercise has id, name, muscle group, description/media fields                                       | Data only in current version.[1]       |
| Exercise detail screen    | Detailed view for a single exercise                              | Learn how to perform a specific exercise                                    | Should   | `/exercises/:id` (or similar) renders exercise info from `exercises.ts`; invalid ID handled                                                              | `ExerciseDetail.tsx`, routing setup.[1] |
| Plans screen              | Surface for multi‑session workout plans                          | Discover training plans                                                      | Should   | `/plans` renders plan cards or placeholders; navigation works from bottom nav; empty/placeholder copy guides user                                       | `Plans.tsx`.[1]                        |
| Community screen          | Shell screen for community features                              | Sense of community and future social features                               | Could    | `/community` renders community UI (cards, lists) using shared UI components; copy clarifies current limitations                                          | `Community.tsx`, shared UI components.[1] |
| Profile screen            | User profile shell with avatar and sections                      | Entry point for personalisation and stats                                   | Should   | `/profile` renders basic profile info, avatar, and placeholder sections; bottom nav highlights Profile tab                                               | `Profile.tsx`, `Avatar` component.[1]  |
| Navigation (BottomNav)    | Persistent bottom navigation across app sections                 | Seamless navigation                                                          | Must     | Icons for Home, Workouts, Plans, Community, Profile; active tab indicator; navigation works via `useNavigate`; safe‑area inset respected on mobile       | `AppLayout.tsx`, `BottomNav.tsx`.[1]   |
| Visual design system      | Shared UI component library (buttons, cards, lists, forms, etc.) | Consistent, modern mobile UI                                                | Must     | Components in `src/components/ui` used across pages; theme tokens via Tailwind; typography and spacing consistent                                       | Shadcn‑style UI components.[1]         |
| Analytics (future)        | Event tracking for key actions                                   | Understand user behavior                                                     | Could    | Hooks or placeholders for tracking screen views and workout interactions; actual integration deferred                                                    | To be implemented later.[1]            |
