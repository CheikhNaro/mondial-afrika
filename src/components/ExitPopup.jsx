import { useState, useEffect, useRef, useCallback } from 'react';
import './ExitPopup.css';

export default function ExitPopup() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [autoShown, setAutoShown] = useState(false);
  const [siteName, setSiteName] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!dismissed) {
        setExpanded(true);
        setAutoShown(true);
      }
    }, 30000);
    return () => clearTimeout(timer);
  }, [dismissed]);

  useEffect(() => {
    if (expanded && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [expanded]);

  const toggle = useCallback(() => {
    setExpanded(prev => !prev);
  }, []);

  function handleSend() {
    const text = siteName.trim()
      ? `Bonjour, le site "${siteName.trim()}" ne fonctionne plus sur Mondial-Afrika.`
      : 'Bonjour, un lien ne fonctionne plus sur Mondial-Afrika.';
    window.open(`https://wa.me/22962471464?text=${encodeURIComponent(text)}`, '_blank');
    setSiteName('');
  }

  function handleDismiss() {
    setDismissed(true);
    setExpanded(false);
    setAutoShown(false);
  }

  return (
    <div className="exit-widget">
      <button className="exit-icon" onClick={toggle} aria-label="Signaler un lien mort">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      {expanded && (
        <div className={`exit-card ${autoShown ? 'exit-card--auto' : ''}`}>
          <button className="exit-card-close" onClick={handleDismiss} aria-label="Fermer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <h4 className="exit-card-title">Un lien ne marche plus ?</h4>
          <p className="exit-card-desc">Veuillez bien nous le notifier !</p>
          <input
            ref={inputRef}
            type="text"
            className="exit-card-input"
            placeholder="Nom du site"
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
          />
          <button className="exit-card-btn" onClick={handleSend}>
            Envoyer
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15,3 21,3 21,9" /><line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
