import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="footer-logo-icon">◈</span>
          <span>Mondial-<span className="footer-gold">Afrika</span></span>
        </div>

        <div className="footer-proverb">
          <span className="proverb-symbol">✦</span>
          <em>&ldquo;Seul on va plus vite, ensemble on va plus loin.&rdquo;</em>
          <span className="proverb-origin">— Proverbe africain</span>
        </div>

        <p className="footer-text">
          Portail streaming premium — films, séries, sport &amp; TV en direct.<br />
          Utilise un bloqueur de pub pour une expérience optimale.
        </p>

        <div className="footer-tip">
          <span className="footer-tip-icon">→</span>
          <span>Astuce : installe <strong>Brave</strong> (mobile) ou <strong>uBlock Origin</strong> (PC) pour 0 pub</span>
        </div>

        <p className="footer-copy">© 2026 Mondial-Afrika — Tous droits réservés</p>
      </div>
    </footer>
  );
}
