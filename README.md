# BrandAI

AI-powered brand management and content marketing platform for creating, scheduling, and optimizing brand content.

<!-- Add screenshot here -->

## Features

- **Content Dashboard** — Overview of all content pieces with status tracking and performance metrics
- **Brand Voice Engine** — Define and maintain consistent brand voice across all content types
- **Content Generator** — AI-powered creation of blog posts, social media, emails, ad copy, and landing pages
- **Campaign Manager** — Plan and manage multi-channel marketing campaigns
- **Editorial Calendar** — Visual calendar view for scheduling content across dates
- **SEO Optimization** — Built-in SEO analysis and keyword optimization tools
- **A/B Testing** — Compare content variants with performance tracking
- **Compliance Checker** — Ensure content meets brand guidelines and regulatory requirements
- **Performance Analytics** — Track views, clicks, and conversions per content piece

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **AI Integration:** OpenAI SDK
- **Database:** Supabase (with SSR helpers)
- **Date Utilities:** date-fns
- **Notifications:** react-hot-toast
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key
- Supabase project

### Installation

```bash
git clone <repo-url>
cd brandai
npm install
```

### Environment Variables

Create a `.env.local` file:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

### Running

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # UI components for each tab
├── lib/              # Store, Supabase client, utilities
└── types/            # TypeScript type definitions
```

## License

MIT
