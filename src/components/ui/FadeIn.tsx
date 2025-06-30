"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

interface FadeInProps {
  children: React.ReactNode;
  duration?: number; // Duration in milliseconds
  className?: string;
}

export default function FadeIn({
  children,
  duration = 700, // Default duration is 700ms
  className = "",
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, duration);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [duration]);

  return (
    <div
      ref={elementRef}
      className={clsx(
        `transition-all duration-${duration} ease-in-out`,
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-0",
        className
      )}
    >
      {children}
    </div>
  );
}