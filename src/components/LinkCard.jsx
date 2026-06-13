import { useRef, useCallback } from 'react';
import { ExternalIcon } from './Icons';
import './LinkCard.css';

export default function LinkCard({ link, accentColor }) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const overlay = overlayRef.current;
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
    overlay.style.setProperty('--opacity', '1');
  }, []);

  const onMouseLeave = useCallback(() => {
    overlayRef.current.style.setProperty('--opacity', '0');
  }, []);

  return (
    <a
      ref={cardRef}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`link-card ${link.top ? 'link-card--top' : ''}`}
      style={{ '--accent': accentColor }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div className="link-card-base">
        <div className="link-card-inner">
          <div className="link-card-top-row">
            <span className="link-badge" style={{ color: accentColor, background: `${accentColor}10` }}>
              {link.badge}
            </span>
            <span className="link-arrow">
              <ExternalIcon size={14} />
            </span>
          </div>
          <h3 className="link-name">{link.name}</h3>
          <p className="link-desc">{link.description}</p>
          <div className="link-url">
            {link.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
          </div>
        </div>
      </div>

      <div ref={overlayRef} className="link-card-overlay" aria-hidden="true">
        <div className="link-card-inner">
          <div className="link-card-top-row">
            <span className="link-badge" style={{ color: accentColor, background: `${accentColor}10` }}>
              {link.badge}
            </span>
            <span className="link-arrow">
              <ExternalIcon size={14} />
            </span>
          </div>
          <h3 className="link-name">{link.name}</h3>
          <p className="link-desc">{link.description}</p>
          <div className="link-url">
            {link.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
          </div>
        </div>
      </div>
    </a>
  );
}