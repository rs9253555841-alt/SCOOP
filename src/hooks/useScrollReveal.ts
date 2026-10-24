import { useEffect } from 'react';

/**
 * useScrollReveal hook
 * Attaches a lightweight IntersectionObserver to elements matching the selector.
 * Adds the 'revealed' class when element is 20% visible, then unobserves it.
 * Triggers strictly once per element with zero repeats.
 */
export const useScrollReveal = (selector = '.reveal-init') => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll(selector).forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target); // Once per element, no repeat
          }
        });
      },
      {
        threshold: 0.2, // Triggers when 20% visible
        rootMargin: '0px 0px -20px 0px'
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  });
};
