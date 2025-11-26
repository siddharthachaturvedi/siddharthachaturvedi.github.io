import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Recognition from './components/Recognition';
import Ventures from './components/Ventures';
import Current from './components/Current';
import Connect from './components/Connect';
import { useScrollSpy } from './hooks/useScrollSpy';
import './styles.css';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const activeSection = useScrollSpy(['hero', 'about', 'recognition', 'ventures', 'current', 'connect']);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    setIsDarkTheme(initialTheme === 'dark');
    document.body.classList.toggle('dark-theme', initialTheme === 'dark');
    document.body.classList.toggle('light-theme', initialTheme !== 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    document.body.classList.toggle('dark-theme', newTheme);
    document.body.classList.toggle('light-theme', !newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <>
      <Navigation
        activeSection={activeSection}
        isDarkTheme={isDarkTheme}
        toggleTheme={toggleTheme}
      />
      <Hero />
      <About />
      <Recognition />
      <Ventures />
      <Current />
      <Connect />
    </>
  );
}

export default App;
