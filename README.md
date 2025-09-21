# LegalEase AI

LegalEase AI is a powerful application designed to simplify the complexity of legal documents. By leveraging cutting-edge AI, it provides users with instant summaries, risk analysis, and plain-English explanations for any legal document they upload. This tool empowers individuals without a legal background to understand and navigate contracts and agreements with confidence.

![LegalEase AI Dashboard](https://i.imgur.com/your-screenshot.png) <!-- Replace with a real screenshot URL -->

## ✨ Key Features

- **Secure Document Upload**: Upload documents in various formats, including `.pdf`, `.docx`, and `.txt`.
- **AI-Powered Summarization**: Get concise, easy-to-understand summaries of lengthy legal texts in seconds.
- **Comprehensive Risk Analysis**: Automatically identifies and categorizes clauses by risk level:
  - **🔴 Critical Risks**: Clauses that pose a significant and immediate risk.
  - **🟡 Negotiation Points**: Clauses that are worth discussing or clarifying.
  - **🟢 Standard Clauses**: Common, low-risk legal language.
- **Interactive Q&A Chat**: Ask questions about your document in natural language and get instant, context-aware answers from the AI.
- **Clarity Checklist**: An AI-generated checklist that highlights key information, such as renewal dates and payment terms, to ensure you don't miss critical details.
- **Fairness Score**: A unique scoring system that provides an at-a-glance measure of how balanced a document is, based on the ratio of safe to risky clauses.
- **User Authentication**: Secure sign-in and user management powered by Firebase Authentication.

## 🛠️ Tech Stack

This project is built with a modern, robust, and scalable tech stack:

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Component Library**: [Shadcn/ui](https://ui.shadcn.com/)
- **AI Integration**: [Genkit (Google's Generative AI Toolkit)](https://firebase.google.com/docs/genkit)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/en) (v18 or later)
- [npm](https://www.npmjs.com/) or a compatible package manager

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/legalease-ai.git
cd legalease-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of your project and add your Firebase and Google AI credentials. You can get your Firebase configuration from the Firebase console.

```env
# Firebase Configuration
# Replace with your actual Firebase project config
NEXT_PUBLIC_FIREBASE_API_KEY="AIza..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-project.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_pUBLIC_FIREBASE_APP_ID="1:12345:web:abcdef"

# Google AI API Key for Genkit
GEMINI_API_KEY="your-gemini-api-key"
```
*Note: Your `firebaseConfig` is already present in `src/lib/firebase.ts`, but using a `.env` file is best practice.*

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at `http://localhost:9002`.

### 5. Run the Genkit Developer UI (Optional)

To inspect and test your AI flows, you can run the Genkit developer UI in a separate terminal:

```bash
npm run genkit:dev
```

This will start the Genkit inspector at `http://localhost:4000`.


## 📁 Project Structure

The project follows a standard Next.js App Router structure:

```
src
├── ai                  # Genkit flows, prompts, and AI logic
│   ├── flows/
│   └── genkit.ts
├── app                 # Next.js routes and pages
│   ├── (auth)/         # Authentication-related pages (login)
│   ├── dashboard/      # Protected dashboard routes
│   └── layout.tsx
├── components          # Reusable React components
│   ├── dashboard/
│   ├── ui/             # Shadcn/ui components
│   └── ...
├── hooks               # Custom React hooks (e.g., useAuth, useToast)
├── lib                 # Utility functions and libraries
└── ...
```

## 🤖 AI and Genkit

This application uses **Genkit** to orchestrate its generative AI capabilities. Key AI flows are located in `src/ai/flows/`:

- **`ai-summarization-flow.ts`**: Handles the generation of plain-English summaries.
- **`clause-highlighting-and-risk-detection.ts`**: Analyzes clauses and assigns risk levels.
- **`document-highlights-flow.ts`**: Extracts key checklist items like renewal dates and payment terms.
- **`qa-interface-for-documents.ts`**: Powers the interactive Q&A chat functionality.

These flows are defined using Zod schemas for structured input and output, ensuring reliable and type-safe interactions with the AI models.
