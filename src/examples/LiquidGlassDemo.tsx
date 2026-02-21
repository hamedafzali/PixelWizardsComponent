import React, { useState } from "react";
import {
  LiquidGlassCard,
  LiquidGlassButton,
  LiquidGlassModal,
  LiquidGlassNav,
} from "../components/LiquidGlass/LiquidGlassComponents";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

export const LiquidGlassDemo: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlur, setSelectedBlur] = useState<
    "subtle" | "medium" | "strong" | "ultra"
  >("medium");
  const [selectedAlpha, setSelectedAlpha] = useState(0.75);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      {/* Import liquid glass styles */}
      <style>{`
        @import url('../styles/liquidGlass.css');
      `}</style>

      {/* Navigation */}
      <LiquidGlassNav
        blur="medium"
        alpha={0.85}
        edgeLight="soft"
        reflection="subtle"
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-white">Liquid Glass Demo</h1>
          <ThemeToggle />
        </div>
        <div className="flex items-center space-x-4">
          <LiquidGlassButton size="sm" onClick={() => setIsModalOpen(true)}>
            Open Modal
          </LiquidGlassButton>
        </div>
      </LiquidGlassNav>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Controls */}
        <LiquidGlassCard
          className="mb-8 p-6"
          edgeLight="medium"
          reflection="medium"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Liquid Glass Controls
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Blur Intensity
              </label>
              <div className="flex space-x-2">
                {(["subtle", "medium", "strong", "ultra"] as const).map(
                  (blur) => (
                    <LiquidGlassButton
                      key={blur}
                      size="sm"
                      variant={selectedBlur === blur ? "primary" : "ghost"}
                      onClick={() => setSelectedBlur(blur)}
                    >
                      {blur}
                    </LiquidGlassButton>
                  ),
                )}
              </div>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Transparency ({Math.round(selectedAlpha * 100)}%)
              </label>
              <input
                type="range"
                min="0.3"
                max="0.95"
                step="0.05"
                value={selectedAlpha}
                onChange={(e) => setSelectedAlpha(parseFloat(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </LiquidGlassCard>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Basic Card */}
          <LiquidGlassCard blur={selectedBlur} alpha={selectedAlpha}>
            <h3 className="text-lg font-semibold text-white mb-2">
              Basic Card
            </h3>
            <p className="text-white text-sm">
              Simple liquid glass card with customizable blur and transparency.
            </p>
          </LiquidGlassCard>

          {/* Card with Edge Light */}
          <LiquidGlassCard
            blur={selectedBlur}
            alpha={selectedAlpha}
            edgeLight="medium"
            reflection="subtle"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              Edge Light Effect
            </h3>
            <p className="text-white text-sm">
              Card with subtle edge lighting and reflection effects for enhanced
              depth.
            </p>
          </LiquidGlassCard>

          {/* Floating Card */}
          <LiquidGlassCard
            blur={selectedBlur}
            alpha={selectedAlpha}
            edgeLight="strong"
            reflection="medium"
            floating={true}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              Floating Card
            </h3>
            <p className="text-white text-sm">
              Animated floating card with strong edge lighting and medium
              reflection.
            </p>
          </LiquidGlassCard>

          {/* Pulse Card */}
          <LiquidGlassCard
            blur={selectedBlur}
            alpha={selectedAlpha}
            pulse={true}
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              Pulse Effect
            </h3>
            <p className="text-white text-sm">
              Card with subtle pulsing animation for drawing attention.
            </p>
          </LiquidGlassCard>

          {/* Strong Blur Card */}
          <LiquidGlassCard blur="strong" alpha={0.65} edgeLight="medium">
            <h3 className="text-lg font-semibold text-white mb-2">
              Strong Blur
            </h3>
            <p className="text-white text-sm">
              Card with strong blur effect for maximum background distortion.
            </p>
          </LiquidGlassCard>

          {/* Ultra Blur Card */}
          <LiquidGlassCard blur="ultra" alpha={0.55} reflection="strong">
            <h3 className="text-lg font-semibold text-white mb-2">
              Ultra Blur
            </h3>
            <p className="text-white text-sm">
              Card with ultra blur effect and strong reflection for dramatic
              effect.
            </p>
          </LiquidGlassCard>
        </div>

        {/* Buttons Section */}
        <LiquidGlassCard
          className="p-6"
          blur="medium"
          alpha={0.8}
          edgeLight="soft"
        >
          <h2 className="text-xl font-semibold text-white mb-4">
            Liquid Glass Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <LiquidGlassButton variant="primary">
              Primary Button
            </LiquidGlassButton>
            <LiquidGlassButton variant="secondary">
              Secondary Button
            </LiquidGlassButton>
            <LiquidGlassButton variant="ghost">Ghost Button</LiquidGlassButton>
            <LiquidGlassButton loading>Loading Button</LiquidGlassButton>
            <LiquidGlassButton disabled>Disabled Button</LiquidGlassButton>
          </div>
        </LiquidGlassCard>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <LiquidGlassCard
            blur="medium"
            alpha={0.7}
            edgeLight="soft"
            reflection="subtle"
            className="text-center p-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Dynamic Blur
            </h3>
            <p className="text-white text-sm">
              Advanced glassmorphism effects with modern Liquid Glass content
              and user interaction.
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard
            blur="medium"
            alpha={0.7}
            edgeLight="medium"
            reflection="medium"
            className="text-center p-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Layer System
            </h3>
            <p className="text-white text-sm">
              Intelligent layering system for proper depth and hierarchy.
            </p>
          </LiquidGlassCard>

          <LiquidGlassCard
            blur="medium"
            alpha={0.7}
            edgeLight="strong"
            reflection="strong"
            className="text-center p-8"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              Light Effects
            </h3>
            <p className="text-white text-sm">
              Realistic light diffusion and reflection effects for premium feel.
            </p>
          </LiquidGlassCard>
        </div>
      </div>

      {/* Modal */}
      <LiquidGlassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Liquid Glass Modal"
        blur="strong"
        alpha={0.95}
        edgeLight="medium"
        reflection="medium"
      >
        <div className="space-y-4">
          <p className="text-white">
            This is a liquid glass modal with strong blur effects and enhanced
            transparency. The modal uses advanced glassmorphism techniques
            inspired by modern Liquid Glass design.
          </p>
          <div className="flex space-x-4">
            <LiquidGlassButton onClick={() => setIsModalOpen(false)}>
              Close
            </LiquidGlassButton>
            <LiquidGlassButton variant="secondary">
              Save Changes
            </LiquidGlassButton>
          </div>
        </div>
      </LiquidGlassModal>
    </div>
  );
};
