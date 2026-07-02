import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send, Bot, User, FileText, Sparkles,
  CheckCircle2, ListTodo, PenLine, BookOpen, Zap,
  MessageSquare, Plus, Loader2, MessageCircle, AlertCircle
} from 'lucide-react';
import GradientButton from '../components/ui/GradientButton';
import { useConversations, useConversationMessages } from 'lemma-sdk/react';
import { lemmaClient } from '../lib/lemma';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  // Check if we are running in Demo Mode (bypassing auth)
  const isDemo = (window as any).isLemmaDemoMode === true;

  // Local state variables for interactive Demo/Prototype mode
  const [demoConversations, setDemoConversations] = useState<any[]>([
    { id: 'demo-1', title: 'Q3 Strategy Discussion' },
    { id: 'demo-2', title: 'Database Optimization Leads' }
  ]);
  const [activeDemoConvId, setActiveDemoConvId] = useState<string>('demo-1');
  const [demoMessages, setDemoMessages] = useState<Record<string, any[]>>({
    'demo-1': [
      {
        id: 'msg-1',
        role: 'user',
        kind: 'TEXT',
        text: 'What did we decide about the migration plans in the Q3 strategy doc?',
        created_at: new Date(Date.now() - 600000).toISOString()
      },
      {
        id: 'msg-2',
        role: 'assistant',
        kind: 'TEXT',
        text: "According to the strategy document, we decided to migrate the production databases to a globally distributed structure starting in August. We will run a staging benchmark first. Here are the key details I retrieved:\n\n1. Target Database: Postgres Multi-Region cluster\n2. Staging test phase: August 1 - August 15\n3. Code freeze: August 20",
        created_at: new Date(Date.now() - 500000).toISOString(),
        metadata: {
          sources: [
            { name: 'Q3_Strategy_v2.pdf', relevance: 98 },
            { name: 'Architecture_Board_Minutes.md', relevance: 86 }
          ],
          insights: [
            'Migration requires coordinate freezes across billing systems.',
            'Staging benchmark should replicate 50% peak production traffic.'
          ],
          actionItems: [
            'Prepare PostgreSQL staging schema scripts (assigned to DevOps team).',
            'Schedule performance review meeting for August 16.'
          ]
        }
      }
    ],
    'demo-2': [
      {
        id: 'msg-3',
        role: 'user',
        kind: 'TEXT',
        text: 'Show database leads.',
        created_at: new Date(Date.now() - 300000).toISOString()
      },
      {
        id: 'msg-4',
        role: 'assistant',
        kind: 'TEXT',
        text: 'Retrieved 2 key performance bottlenecks from the database logs:\n\n- Unindexed joins in `transaction_ledger` query.\n- Connection pool saturation during 09:00 UTC spike.',
        created_at: new Date(Date.now() - 200000).toISOString()
      }
    ]
  });
  const [demoStreamingText, setDemoStreamingText] = useState('');
  const [demoIsStreaming, setDemoIsStreaming] = useState(false);

  // 1. Fetch and manage conversations list (only enabled if not in demo mode)
  const {
    conversations,
    effectiveSelectedConversationId,
    selectConversation,
    createAndSelectConversation,
    isLoading: isLoadingConversations,
    error: conversationsError,
  } = useConversations({
    client: lemmaClient!,
    agentName: 'second_brain_agent',
    autoSelectFirst: true,
    enabled: !isDemo && !!lemmaClient,
  });

  // 2. Fetch and manage messages for the active conversation (only enabled if not in demo mode)
  const {
    messages,
    isStreaming,
    isLoading: isLoadingMessages,
    sendMessage,
    streamingText,
    error: messagesError,
  } = useConversationMessages({
    client: lemmaClient!,
    agentName: 'second_brain_agent',
    conversationId: effectiveSelectedConversationId,
    autoResume: true,
    enabled: !isDemo && !!lemmaClient && !!effectiveSelectedConversationId,
  });

  // Resolve active views/states based on mode
  const conversationsList = isDemo ? demoConversations : conversations;
  const activeConversationId = isDemo ? activeDemoConvId : effectiveSelectedConversationId;
  const chatMessagesList = isDemo ? (demoMessages[activeDemoConvId] || []) : messages;
  const isStreamingActive = isDemo ? demoIsStreaming : isStreaming;
  const streamingTextValue = isDemo ? demoStreamingText : streamingText;
  const isLoadingConversationsList = isDemo ? false : isLoadingConversations;
  const conversationsErrorState = isDemo ? null : conversationsError;
  const isLoadingMessagesList = isDemo ? false : isLoadingMessages;
  const messagesErrorState = isDemo ? null : messagesError;

  // Scroll to bottom when new messages arrive or when streaming updates
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessagesList, streamingTextValue, isStreamingActive]);

  const handleSend = async () => {
    if (!input.trim()) return;

    if (isDemo) {
      // Demo Mode Chat Simulator
      const userMsg = {
        id: `demo-msg-${Date.now()}`,
        role: 'user' as const,
        kind: 'TEXT' as const,
        text: input,
        created_at: new Date().toISOString()
      };

      const currentConvId = activeDemoConvId;
      setDemoMessages(prev => ({
        ...prev,
        [currentConvId]: [...(prev[currentConvId] || []), userMsg]
      }));
      setInput('');

      // Simulate streaming response from Assistant
      setDemoIsStreaming(true);
      const fullResponse = "I've searched your mock second brain database. Since this is the demo environment, I will simulate a smart assistant response explaining how the tool extracts facts, schedules tasks, and links thoughts together! You can configure your own Lemma credentials to test this on live documents.";
      
      let currentText = '';
      const interval = setInterval(() => {
        if (currentText.length < fullResponse.length) {
          currentText += fullResponse.slice(currentText.length, currentText.length + 5);
          setDemoStreamingText(currentText);
        } else {
          clearInterval(interval);
          setDemoIsStreaming(false);
          setDemoStreamingText('');

          const assistantMsg = {
            id: `demo-msg-${Date.now() + 1}`,
            role: 'assistant' as const,
            kind: 'TEXT' as const,
            text: fullResponse,
            created_at: new Date().toISOString(),
            metadata: {
              sources: [{ name: 'System_Demo_Spec.txt', relevance: 100 }],
              insights: ['Running in Sandbox Demo Mode.'],
              actionItems: ['Complete .env configurations to test with custom files.']
            }
          };

          setDemoMessages(prev => ({
            ...prev,
            [currentConvId]: [...(prev[currentConvId] || []), assistantMsg]
          }));
        }
      }, 50);
      return;
    }

    // Live Lemma SDK send path
    try {
      let targetConvId = effectiveSelectedConversationId;

      if (!targetConvId) {
        const newConv = await createAndSelectConversation({
          title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
          agentName: 'second_brain_agent',
        });
        targetConvId = newConv.id;
      }

      const promptValue = input;
      setInput('');

      await sendMessage(promptValue, {
        conversationId: targetConvId,
      });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  const handleNewChat = () => {
    if (isDemo) {
      const newId = `demo-${Date.now()}`;
      setDemoConversations(prev => [
        ...prev,
        { id: newId, title: `New Chat ${new Date().toLocaleDateString()}` }
      ]);
      setDemoMessages(prev => ({
        ...prev,
        [newId]: []
      }));
      setActiveDemoConvId(newId);
      return;
    }

    createAndSelectConversation({
      title: `Brainstorm ${new Date().toLocaleDateString()}`,
      agentName: 'second_brain_agent',
    });
  };

  const handleSelectConversation = (id: string) => {
    if (isDemo) {
      setActiveDemoConvId(id);
    } else {
      selectConversation(id);
    }
  };

  if (!isDemo && !lemmaClient) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="text-center text-white/40">
          <AlertCircle className="w-8 h-8 mx-auto mb-3 text-red-400" />
          Lemma client not initialized.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex gap-6" style={{ height: 'calc(100vh - 8rem)' }}>
      {/* Sidebar - Conversation History */}
      <div className="w-80 flex flex-col glass rounded-2xl p-4 border border-white/5 overflow-hidden flex-shrink-0 hidden md:flex">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white/70 flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-blue-400" />
            Conversations
          </h3>
          <button
            onClick={handleNewChat}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
            title="New Conversation"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {isLoadingConversationsList ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
            </div>
          ) : conversationsErrorState ? (
            <div className="text-xs text-red-400/80 p-2 text-center">
              Failed to load conversations
            </div>
          ) : conversationsList.length === 0 ? (
            <div className="text-xs text-white/30 text-center py-8">
              No conversations yet. Start a new one!
            </div>
          ) : (
            conversationsList.map((conv) => {
              const isActive = conv.id === activeConversationId;
              return (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv.id)}
                  className={`
                    w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all cursor-pointer truncate block
                    ${isActive
                      ? 'bg-white/8 text-white border-l-2 border-blue-500 pl-4'
                      : 'text-white/50 hover:text-white/80 hover:bg-white/3'
                    }
                  `}
                >
                  {conv.title || 'Untitled Conversation'}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main Chat Viewport */}
      <div className="flex-1 flex flex-col glass rounded-2xl border border-white/5 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/1">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">AI Assistant</h2>
              <span className="text-xs text-white/30">
                {isDemo ? 'Sandbox Demo Environment' : 'Connected to Second Brain Agent'}
              </span>
            </div>
          </div>
          <button
            onClick={handleNewChat}
            className="md:hidden flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> New Chat
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {isLoadingMessagesList && chatMessagesList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3">
              <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
              <span className="text-xs text-white/30 tracking-widest uppercase">Loading conversation...</span>
            </div>
          ) : messagesErrorState ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <AlertCircle className="w-8 h-8 text-red-400 mb-2" />
              <p className="text-sm text-white/70">Failed to load messages</p>
            </div>
          ) : chatMessagesList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-white/2 border border-white/5 flex items-center justify-center text-blue-400">
                <Bot className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Ask your Second Brain</h3>
                <p className="text-sm text-white/40 mt-2 leading-relaxed">
                  Start a conversation about your stored notes, PDF documents, strategy links, and captured ideas.
                </p>
              </div>
              <div className="w-full space-y-2">
                {[
                  'What did I discuss about my hackathon?',
                  'Summarize Q3 strategy document.',
                  'List key action items from team standups.',
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => setInput(s)}
                    className="w-full text-left px-4 py-3 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 hover:border-white/10 text-xs text-white/50 hover:text-white transition-all cursor-pointer"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {chatMessagesList.map((msg, i) => {
                const isUserMsg = msg.role === 'user';
                // Show thinking or text kind of messages
                if (msg.kind !== 'TEXT' && msg.kind !== 'THINKING') return null;

                const sources = (msg.metadata?.sources || []) as any[];
                const insights = (msg.metadata?.insights || []) as string[];
                const actionItems = (msg.metadata?.actionItems || msg.metadata?.action_items || []) as string[];

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.5) }}
                    className={`flex gap-4 ${isUserMsg ? 'justify-end' : ''}`}
                  >
                    {!isUserMsg && (
                      <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className={`max-w-[85%] ${isUserMsg ? 'order-first' : ''}`}>
                      {msg.kind === 'THINKING' ? (
                        <details className="group glass rounded-2xl px-5 py-3.5 text-xs text-white/40 border border-white/5 mb-2">
                          <summary className="font-semibold text-white/60 cursor-pointer list-none flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-violet-400 group-open:rotate-45 transition-transform" />
                            Thought Process
                          </summary>
                          <div className="mt-2 pl-4 border-l border-white/10 whitespace-pre-wrap leading-relaxed">
                            {msg.text}
                          </div>
                        </details>
                      ) : (
                        <div
                          className={`
                            rounded-2xl px-5 py-4 text-sm leading-relaxed
                            ${isUserMsg
                              ? 'gradient-bg text-white ml-auto rounded-br-md'
                              : 'glass text-white/90 rounded-bl-md'
                            }
                          `}
                        >
                          <div className="whitespace-pre-line">{msg.text}</div>
                        </div>
                      )}

                      {/* Display Sources from Metadata */}
                      {sources.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3"
                        >
                          <p className="text-xs text-white/30 font-medium mb-2 flex items-center gap-1.5">
                            <FileText className="w-3 h-3" /> Sources
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {sources.map((source, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors cursor-pointer"
                              >
                                <FileText className="w-3 h-3 text-blue-400" />
                                <span className="text-xs text-white/60">{source.name || source}</span>
                                {source.relevance && (
                                  <span className="text-xs text-white/20">{source.relevance}%</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Display Insights from Metadata */}
                      {insights.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3"
                        >
                          <p className="text-xs text-white/30 font-medium mb-2 flex items-center gap-1.5">
                            <Sparkles className="w-3 h-3" /> Insights
                          </p>
                          <div className="space-y-1.5">
                            {insights.map((insight, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs text-white/50">
                                <span className="text-blue-400 mt-0.5">•</span>
                                {insight}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Display Action Items from Metadata */}
                      {actionItems.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-3"
                        >
                          <p className="text-xs text-white/30 font-medium mb-2 flex items-center gap-1.5">
                            <CheckCircle2 className="w-3 h-3" /> Action Items
                          </p>
                          <div className="space-y-1.5">
                            {actionItems.map((item, index) => (
                              <div key={index} className="flex items-start gap-2 text-xs text-white/50">
                                <CheckCircle2 className="w-3 h-3 text-emerald-400 mt-0.5 flex-shrink-0" />
                                {item}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}

                      {/* Action buttons if metadata dictates */}
                      {actionItems.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-wrap gap-2 mt-4"
                        >
                          {[
                            { label: 'Generate Tasks', icon: ListTodo },
                            { label: 'Generate Draft', icon: PenLine },
                            { label: 'Summarize', icon: BookOpen },
                            { label: 'Decision Support', icon: Zap },
                          ].map((action) => (
                            <button
                              key={action.label}
                              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 hover:bg-white/8 text-xs text-white/60 hover:text-white/80 transition-all cursor-pointer"
                            >
                              <action.icon className="w-3 h-3" />
                              {action.label}
                            </button>
                          ))}
                        </motion.div>
                      )}

                      <p className="text-xs text-white/20 mt-2">
                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    {isUserMsg && (
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Streaming UI */}
              {isStreamingActive && streamingTextValue && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="glass rounded-2xl rounded-bl-md px-5 py-4 text-sm leading-relaxed text-white/90">
                      <div className="whitespace-pre-line">{streamingTextValue}</div>
                      <span className="inline-block w-1.5 h-4 ml-1 bg-blue-400 animate-pulse align-middle" />
                    </div>
                  </div>
                </motion.div>
              )}
            </>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5 bg-white/1">
          <div className="glass rounded-xl p-2 flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask your Second Brain..."
              rows={1}
              className="flex-1 bg-transparent px-3 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none resize-none max-h-32"
              style={{ minHeight: '40px' }}
              disabled={isStreamingActive}
            />
            <GradientButton
              size="sm"
              onClick={handleSend}
              className="flex-shrink-0 mb-0.5"
              disabled={isStreamingActive}
              icon={isStreamingActive ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            >
              {isStreamingActive ? 'Streaming' : 'Send'}
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}
