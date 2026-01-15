import { useEffect, useState } from "react";

export function useScroll() {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const isScrolled = () => {
      setScroll(window.scrollY > 0)
    }

    window.addEventListener('scroll', isScrolled);
    return () => window.removeEventListener('scroll', isScrolled)
  }, [])

  return scroll;
}