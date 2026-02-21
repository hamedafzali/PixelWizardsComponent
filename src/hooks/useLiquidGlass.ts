import { useEffect, useRef } from "react";
import { applyLiquidGlassVariables } from "../themes/liquidGlassEnhanced";

// Hook for applying liquid glass effects to components
export const useLiquidGlass = <T extends HTMLElement = HTMLElement>(
  options: {
    variant?: "navigation" | "card" | "modal" | "button" | "panel";
    blur?: "subtle" | "medium" | "strong" | "ultra";
    alpha?: number;
    edgeLight?: "soft" | "medium" | "strong";
    reflection?: "subtle" | "medium" | "strong";
    floating?: boolean;
    pulse?: boolean;
    layer?: "background" | "glass" | "solid" | "dynamic" | "modal" | "toast";
  } = {},
) => {
  const elementRef = useRef<T>(null);

  const {
    variant = "card",
    blur = "medium",
    alpha = 0.75,
    edgeLight,
    reflection,
    floating = false,
    pulse = false,
    layer = "glass",
  } = options;

  useEffect(() => {
    // Apply liquid glass CSS variables globally once
    applyLiquidGlassVariables();
  }, []);

  const applyGlassStyles = (element: HTMLElement) => {
    // Base glass styles
    element.classList.add("liquid-glass");
    element.classList.add(`liquid-glass--${variant}`);
    element.classList.add(`liquid-glass--blur-${blur}`);
    element.classList.add(`liquid-glass--layer-${layer}`);

    // Apply custom alpha if specified
    if (alpha !== 0.75) {
      element.style.backgroundColor = `rgba(255, 255, 255, ${alpha})`;
    }

    // Edge light effects
    if (edgeLight) {
      element.classList.add(`liquid-glass--edge-light-${edgeLight}`);
    }

    // Reflection effects
    if (reflection) {
      element.classList.add(`liquid-glass--reflection-${reflection}`);
    }

    // Animation effects
    if (floating) {
      element.classList.add("liquid-glass--floating");
    }

    if (pulse) {
      element.classList.add("liquid-glass--pulse");
    }
  };

  return {
    elementRef,
    applyGlassStyles,
    glassClasses: [
      "liquid-glass",
      `liquid-glass--${variant}`,
      `liquid-glass--blur-${blur}`,
      `liquid-glass--layer-${layer}`,
      edgeLight && `liquid-glass--edge-light-${edgeLight}`,
      reflection && `liquid-glass--reflection-${reflection}`,
      floating && "liquid-glass--floating",
      pulse && "liquid-glass--pulse",
    ]
      .filter(Boolean)
      .join(" "),
  };
};

// Hook for dynamic glass effects based on scroll or interaction
export const useDynamicGlass = (
  elementRef: React.RefObject<HTMLElement>,
  options: {
    scrollEffect?: boolean;
    hoverEffect?: boolean;
    parallaxEffect?: boolean;
  } = {},
) => {
  const {
    scrollEffect = true,
    hoverEffect = true,
    parallaxEffect = false,
  } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrameId: number;

    const handleScroll = () => {
      if (!scrollEffect) return;

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      animationFrameId = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollY / maxScroll;

        // Dynamic blur based on scroll
        const blurIntensity = Math.min(scrollProgress * 32, 32);
        element.style.backdropFilter = `blur(${blurIntensity}px) saturate(${
          150 + scrollProgress * 50
        }%)`;

        // Dynamic transparency
        const alpha = Math.max(0.85 - scrollProgress * 0.3, 0.55);
        const isDark =
          document.documentElement.getAttribute("data-theme") === "dark";
        const bgColor = isDark ? `10, 10, 10` : `255, 255, 255`;
        element.style.backgroundColor = `rgba(${bgColor}, ${alpha})`;
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hoverEffect || !parallaxEffect) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      // Subtle parallax effect
      const translateX = deltaX * 4;
      const translateY = deltaY * 4;

      element.style.transform = `translate(${translateX}px, ${translateY}px)`;
    };

    const handleMouseEnter = () => {
      if (!hoverEffect) return;

      element.style.backdropFilter = "var(--glass-blur-dynamic)";
      element.style.transform = "translateY(-2px)";
      element.style.boxShadow = "var(--glass-shadow-floating)";
    };

    const handleMouseLeave = () => {
      if (!hoverEffect) return;

      element.style.transform = "translateY(0)";
      element.style.boxShadow = "";
    };

    // Event listeners
    if (scrollEffect) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    if (hoverEffect) {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    }

    if (parallaxEffect) {
      element.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [elementRef, scrollEffect, hoverEffect, parallaxEffect]);
};

// Hook for responsive glass effects
export const useResponsiveGlass = (
  elementRef: React.RefObject<HTMLElement>,
  breakpoints: {
    mobile?: { blur?: string; alpha?: number };
    tablet?: { blur?: string; alpha?: number };
    desktop?: { blur?: string; alpha?: number };
  } = {},
) => {
  const {
    mobile = { blur: "subtle", alpha: 0.9 },
    tablet = { blur: "medium", alpha: 0.8 },
    desktop = { blur: "medium", alpha: 0.75 },
  } = breakpoints;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const updateGlassForScreenSize = () => {
      const width = window.innerWidth;
      let config = desktop;

      if (width < 768) {
        config = mobile;
      } else if (width < 1024) {
        config = tablet;
      }

      element.style.backdropFilter = `var(--glass-blur-${config.blur})`;
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const bgColor = isDark ? `10, 10, 10` : `255, 255, 255`;
      element.style.backgroundColor = `rgba(${bgColor}, ${config.alpha})`;
    };

    updateGlassForScreenSize();
    window.addEventListener("resize", updateGlassForScreenSize);

    return () => {
      window.removeEventListener("resize", updateGlassForScreenSize);
    };
  }, [elementRef, mobile, tablet, desktop]);
};
