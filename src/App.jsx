import { useEffect } from 'react';
import { categories } from './data/links';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import AdBlockerModal from './components/AdBlockerModal';
import ScrollToTop from './components/ScrollToTop';
import GradientBackground from './components/GradientBackground';
import CursorFollower from './components/CursorFollower';

import './App.css';

export default function App() {
  const totalLinks = categories.reduce((acc, cat) => acc + cat.links.length, 0);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GradientBackground />
      <AdBlockerModal />
      <Header categories={categories} />
      <main className="main">
        <Hero totalLinks={totalLinks} />
          <div className="main-content">
            {categories.map(cat => (
              <CategorySection key={cat.id} category={cat} />
            ))}
          </div>
      </main>
      <Footer />
      <ScrollToTop />
      <CursorFollower />
    </>
  );
}
