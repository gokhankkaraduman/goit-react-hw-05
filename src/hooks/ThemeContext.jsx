import React, { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const themes = {
  dark: {
    '--ana-renk': '#111827',
    '--ikincil-renk': '#1f2937',
    '--vurgu-rengi': '#64748b',
    '--metin-rengi': '#e2e8f0',
    '--hover-rengi': '#9ca3af',
  },
  light: {
    '--ana-renk': '#f8f9fa', // Daha açık bir arka plan
    '--ikincil-renk': '#ffffff', // Beyaz
    '--vurgu-rengi': '#2196f3', // Daha canlı bir mavi
    '--metin-rengi': '#343a40', // Daha koyu bir metin rengi
    '--hover-rengi': '#1976d2', // Mavi hover rengi
  },
  colorful: {
    '--ana-renk': '#424242', // Koyu gri arka plan
    '--ikincil-renk': '#616161', // Açık gri
    '--vurgu-rengi': '#ff9800', // Turuncu
    '--metin-rengi': '#ffffff', // Beyaz metin
    '--hover-rengi': '#f57c00', // Turuncu hover
  },
};

const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') || 'dark' // LocalStorage'dan temayı al veya 'dark' varsayılanı kullan
  );

  useEffect(() => {
    localStorage.setItem('theme', currentTheme); // Temayı LocalStorage'a kaydet

    const theme = themes[currentTheme];
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }

    document.body.classList.remove('dark', 'light', 'colorful');
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };