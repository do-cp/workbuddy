import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header.jsx';
import Welcome from './components/Welcome.jsx';
import Messages from './components/Messages.jsx';
import Composer from './components/Composer.jsx';
import { getLocalAnswer } from './services/localAnswerService.js';
import { getAiAnswer, isAiEnabled } from './services/aiService.js';

const shellStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  background: 'var(--color-bg)',
};

const mainStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  minHeight: 0,
};

async function getAnswer(query, messages) {
  if (isAiEnabled()) {
    try {
      return await getAiAnswer([...messages, { role: 'user', content: query }]);
    } catch (err) {
      if (err.message === 'AWS_EXPIRED') {
        return {
          answer:
            '⚠️ AWS credentials have expired. Go to the [access portal](https://d-996741f28a.awsapps.com/start/#/) → **DeveloperAccess** → **Access keys** → copy the new values into `server/.env`, then restart the server.',
          followUps: [],
        };
      }
      // Any other AI error → fall through to local knowledge base
      console.warn('AI unavailable, using local answers:', err.message);
    }
  }
  return getLocalAnswer(query);
}

export default function App() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  const hasMessages = messages.length > 0;
  const viewingChat = hasMessages && !showWelcome;

  const sendMessage = useCallback(async (text) => {
    const userMsg = { role: 'user', content: text };
    const next = [...messages, userMsg];
    setMessages(next);
    setIsTyping(true);
    setShowWelcome(false);

    // Small artificial delay so the typing indicator has time to show
    await new Promise((r) => setTimeout(r, 400 + Math.random() * 300));

    try {
      const { answer, followUps } = await getAnswer(text, messages);
      const assistantMsg = { role: 'assistant', content: answer, followUps };
      setMessages([...next, assistantMsg]);
    } catch {
      setMessages((cur) => [
        ...cur,
        {
          role: 'assistant',
          error: true,
          content:
            "I couldn't reach the assistant just now. Check your connection and try again — or ping **#it-support** on Slack if it keeps happening.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [messages]);

  const startNewChat = () => {
    setMessages([]);
    setShowWelcome(false);
  };

  useEffect(() => {
    if (hasMessages) setShowWelcome(false);
  }, [messages.length]);

  return (
    <div style={shellStyle}>
      <Header onNewChat={startNewChat} hasMessages={viewingChat} />
      <div style={mainStyle}>
        {viewingChat ? (
          <Messages messages={messages} isTyping={isTyping} onPickFollow={sendMessage} />
        ) : (
          <div
            className="scroll"
            style={{ flex: 1, overflowY: 'auto' }}
          >
            <Welcome
              onPick={sendMessage}
              hasHistory={hasMessages}
              onResume={() => setShowWelcome(false)}
            />
          </div>
        )}
        <Composer
          onSend={sendMessage}
          disabled={isTyping}
          showBack={viewingChat}
          onBack={() => setShowWelcome(true)}
        />
      </div>
    </div>
  );
}
