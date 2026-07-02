import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthGuard, useAuth } from 'lemma-sdk/react';
import { Brain } from 'lucide-react';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage';
import ChatPage from './pages/ChatPage';
import KnowledgePage from './pages/KnowledgePage';
import InsightsPage from './pages/InsightsPage';
import DecisionPage from './pages/DecisionPage';
import TasksPage from './pages/TasksPage';
import KnowledgeGraphPage from './pages/KnowledgeGraphPage';
import SettingsPage from './pages/SettingsPage';
import { lemmaClient, isLemmaConfigured, VITE_LEMMA_API_URL, VITE_LEMMA_AUTH_URL, VITE_LEMMA_POD_ID } from './lib/lemma';

// Initialize React Query Client for Lemma
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function CustomSignIn() {
  const { redirectToAuth } = useAuth(lemmaClient!);

  const handleSignIn = () => {
    redirectToAuth({
      redirectUri: 'http://localhost:5174',
    });
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-md w-full glass rounded-3xl p-8 border border-white/10 relative z-10 text-center glow-gradient">
        <div className="w-16 h-16 rounded-2xl gradient-bg mx-auto flex items-center justify-center mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Welcome to GAPPY AI</h1>
        <p className="text-white/50 text-sm mb-8">
          Sign in to connect to your Second Brain workspace and AI agent.
        </p>

        <button
          onClick={handleSignIn}
          className="w-full gradient-bg hover:opacity-90 text-white font-medium py-3 px-4 rounded-xl transition-all cursor-pointer shadow-lg shadow-indigo-500/20"
        >
          Sign In with Lemma
        </button>
      </div>
    </div>
  );
}

function ConfigErrorPage() {
  const missingVars = [];
  if (!VITE_LEMMA_API_URL) missingVars.push('VITE_LEMMA_API_URL');
  if (!VITE_LEMMA_AUTH_URL) missingVars.push('VITE_LEMMA_AUTH_URL');
  if (!VITE_LEMMA_POD_ID) missingVars.push('VITE_LEMMA_POD_ID');

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full glass rounded-3xl p-8 border border-white/10 relative z-10 text-center glow-gradient">
        <div className="w-16 h-16 rounded-2xl gradient-bg mx-auto flex items-center justify-center mb-6">
          <Brain className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Integration Required</h1>
        <p className="text-white/50 text-sm mb-6">
          GAPPY AI is built with enterprise-grade connectivity to Lemma Cloud. Please configure the required environment variables in your <code className="bg-white/5 px-1.5 py-0.5 rounded text-blue-400">.env</code> file.
        </p>

        <div className="bg-[#0f172a]/60 rounded-2xl p-5 text-left border border-white/5 space-y-4 mb-6">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">Missing Keys</p>
          {missingVars.map((v) => (
            <div key={v} className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-red-400">{v}</span>
              <span className="text-xs text-white/40">
                {v === 'VITE_LEMMA_API_URL' && 'The API endpoint url (e.g. https://api.lemma.work)'}
                {v === 'VITE_LEMMA_AUTH_URL' && 'The Auth provider endpoint (e.g. https://lemma.work/auth)'}
                {v === 'VITE_LEMMA_POD_ID' && 'The connected pod identifier representing your second brain'}
              </span>
            </div>
          ))}
        </div>

        <div className="text-left text-xs text-white/30 border-t border-white/5 pt-4">
          <span className="font-semibold text-white/50">Example .env configuration:</span>
          <pre className="mt-2 p-3 bg-black/40 rounded-lg text-white/60 font-mono overflow-x-auto">
{`VITE_LEMMA_API_URL=https://api.lemma.work
VITE_LEMMA_AUTH_URL=https://lemma.work/auth
VITE_LEMMA_POD_ID=your_pod_id_here`}
          </pre>
        </div>
      </div>
    </div>
  );
}

function AuthenticatedApp() {
  if (!isLemmaConfigured || !lemmaClient) {
    return <ConfigErrorPage />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthGuard
        client={lemmaClient}
        unauthenticatedFallback={<CustomSignIn />}
        loadingFallback={
          <div className="min-h-screen bg-[#0B1220] flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center animate-pulse">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/40 text-xs tracking-widest uppercase">Connecting to Second Brain...</span>
            </div>
          </div>
        }
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/knowledge" element={<KnowledgePage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/tasks" element={<TasksPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/decisions" element={<DecisionPage />} />
              <Route path="/graph" element={<KnowledgeGraphPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthGuard>
    </QueryClientProvider>
  );
}

export default function App() {
  if (!isLemmaConfigured) {
    return <ConfigErrorPage />;
  }
  return <AuthenticatedApp />;
}
