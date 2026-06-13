import { useState, useEffect } from 'react';
import { ShieldIcon, CheckIcon, ExternalIcon, ArrowDownIcon } from './Icons';
import './AdBlockerModal.css';

function detectEnv() {
  const ua = navigator.userAgent || '';
  const isIos = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);
  const isBrave = 'brave' in navigator;
  const isFirefox = /Firefox\//i.test(ua) && !/Seamonkey/i.test(ua);
  const isEdge = /Edg\//i.test(ua);
  const isChrome = /Chrome\//i.test(ua) && !isEdge && !isBrave;

  let browser = 'other';
  if (isBrave) browser = 'brave';
  else if (isFirefox) browser = 'firefox';
  else if (isEdge) browser = 'edge';
  else if (isChrome) browser = 'chrome';

  let device = 'desktop';
  if (isIos) device = 'ios';
  else if (isAndroid) device = 'android';

  return { device, browser };
}

const uBlockLinks = {
  chrome: {
    url: 'https://chromewebstore.google.com/detail/ublock-origin-lite/ddkjiahejlhfcafbddmgiahcphecmpfh',
    label: 'Installer uBlock Origin',
  },
  edge: {
    url: 'https://microsoftedge.microsoft.com/addons/detail/ublock-origin/odfafepnkmbhccpbejgmiehpchacaeak',
    label: 'Installer uBlock Origin',
  },
  firefox: {
    url: 'https://addons.mozilla.org/fr/firefox/addon/ublock-origin/',
    label: 'Installer uBlock Origin',
  },
};

const braveLinks = [
  { key: 'desktop', url: 'https://brave.com/fr/download/', label: 'PC / Mac' },
  { key: 'android', url: 'https://play.google.com/store/apps/details?id=com.brave.browser&hl=fr', label: 'Android' },
  { key: 'ios', url: 'https://apps.apple.com/fr/app/brave-private-web-browser/id1052879175', label: 'iPhone' },
];

export default function AdBlockerModal() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const { device, browser } = detectEnv();
  const alreadyProtected = browser === 'brave';
  const ublock = uBlockLinks[browser];
  const showUblockSection = !alreadyProtected && !!ublock;
  const showIosNote = !alreadyProtected && device === 'ios' && !ublock;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  function handleDismiss() {
    setDismissed(true);
    setTimeout(() => setVisible(false), 200);
  }

  if (!visible) return null;

  return (
    <div className={`modal-overlay ${dismissed ? 'modal-overlay--exiting' : ''}`} onClick={handleDismiss}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className="modal-glow" />

        <div className="modal-brand">
          <div className="modal-brand-dot" />
          <span className="modal-brand-name">Mondial-<strong>Afrika</strong></span>
        </div>

        <div className={`modal-header ${alreadyProtected ? 'modal-header--success' : ''}`}>
          <div className="modal-header-icon">
            {alreadyProtected ? <CheckIcon size={20} /> : <ShieldIcon size={20} />}
          </div>
          <div className="modal-header-text">
            <h2 className="modal-title">
              {alreadyProtected ? 'Navigation protégée' : 'Protège ton streaming'}
            </h2>
            <p className="modal-subtitle">
              {alreadyProtected
                ? 'Brave bloque pubs et trackers automatiquement'
                : 'Les bloqueurs de pub sont obligatoires pour profiter des sites sans coupure'}
            </p>
          </div>
        </div>

        <div className="modal-body">
          {alreadyProtected && (
            <div className="modal-message modal-message--success">
              <CheckIcon size={15} />
              <span>Tu es déjà protégé. Brave bloque tout automatiquement. Bon streaming !</span>
            </div>
          )}

          {showUblockSection && (
            <div className="modal-section">
              <div className="modal-section-label">
                <span className="modal-tag modal-tag--accent">Rapide</span>
                <span>Extension pour {browser === 'chrome' ? 'Chrome' : browser === 'firefox' ? 'Firefox' : 'Edge'}</span>
              </div>
              <a href={ublock.url} target="_blank" rel="noopener noreferrer" className="modal-btn modal-btn--primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9,18 15,12 9,6" />
                </svg>
                {ublock.label}
              </a>
            </div>
          )}

          {showIosNote && (
            <div className="modal-message">
              <span>uBlock Origin n'est pas disponible sur iOS. Passe sur <strong>Brave Browser</strong> qui bloque tout nativement.</span>
            </div>
          )}

          {showUblockSection && (
            <div className="modal-divider">
              <span>Option recommandée</span>
            </div>
          )}

          {!alreadyProtected && (
            <div className="modal-section">
              <div className="modal-section-label">
                <span className="modal-tag modal-tag--brand">Recommandé</span>
                <span>Brave — bloqueur intégré, zéro config</span>
              </div>
              <div className="modal-grid">
                {braveLinks.map(link => (
                  <a
                    key={link.key}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`modal-grid-btn${device === link.key ? ' modal-grid-btn--active' : ''}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="modal-btn-ghost" onClick={handleDismiss} type="button">
            {alreadyProtected ? 'Accéder au catalogue' : 'J\'ai déjà un bloqueur'}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}