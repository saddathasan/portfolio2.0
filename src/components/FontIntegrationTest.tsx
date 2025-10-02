import React from 'react';

const FontIntegrationTest: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Tailwind Font Integration Test</h1>
      
      {/* Inter Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inter Font with Native Tailwind Weights</h2>
        <div className="space-y-2">
          <p className="font-inter font-light">Inter Light (font-light) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter font-normal">Inter Normal (font-normal) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter font-medium">Inter Medium (font-medium) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter font-semibold">Inter Semibold (font-semibold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter font-bold">Inter Bold (font-bold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter font-extrabold">Inter Extrabold (font-extrabold) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Cabinet Grotesk Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cabinet Grotesk with Native Tailwind Weights</h2>
        <div className="space-y-2">
          <p className="font-cabinet-grotesk font-thin">Cabinet Grotesk Thin (font-thin) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-light">Cabinet Grotesk Light (font-light) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-normal">Cabinet Grotesk Normal (font-normal) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-medium">Cabinet Grotesk Medium (font-medium) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-semibold">Cabinet Grotesk Semibold (font-semibold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-bold">Cabinet Grotesk Bold (font-bold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-extrabold">Cabinet Grotesk Extrabold (font-extrabold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk font-black">Cabinet Grotesk Black (font-black) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Clash Display Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Clash Display with Native Tailwind Weights</h2>
        <div className="space-y-2">
          <p className="font-clash-display font-extralight">Clash Display Extralight (font-extralight) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display font-light">Clash Display Light (font-light) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display font-normal">Clash Display Normal (font-normal) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display font-medium">Clash Display Medium (font-medium) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display font-semibold">Clash Display Semibold (font-semibold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display font-bold">Clash Display Bold (font-bold) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Panchang Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Panchang with Native Tailwind Weights</h2>
        <div className="space-y-2">
          <p className="font-panchang font-light">Panchang Light (font-light) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang font-normal">Panchang Normal (font-normal) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang font-medium">Panchang Medium (font-medium) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang font-semibold">Panchang Semibold (font-semibold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang font-bold">Panchang Bold (font-bold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang font-extrabold">Panchang Extrabold (font-extrabold) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Space Grotesk Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Space Grotesk with Native Tailwind Weights</h2>
        <div className="space-y-2">
          <p className="font-space-grotesk font-light">Space Grotesk Light (font-light) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk font-normal">Space Grotesk Normal (font-normal) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk font-medium">Space Grotesk Medium (font-medium) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk font-semibold">Space Grotesk Semibold (font-semibold) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk font-bold">Space Grotesk Bold (font-bold) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Mixed Font and Weight Combinations */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Mixed Font and Weight Combinations</h2>
        <div className="space-y-2">
          <h3 className="font-clash-display font-bold text-xl">Clash Display Bold Heading</h3>
          <p className="font-cabinet-grotesk font-medium">Cabinet Grotesk Medium paragraph text for readability</p>
          <p className="font-inter font-normal">Inter Normal body text with excellent legibility</p>
          <p className="font-panchang font-semibold">Panchang Semibold for emphasis and attention</p>
          <p className="font-space-grotesk font-light">Space Grotesk Light for subtle, modern styling</p>
        </div>
      </section>

      {/* Responsive Weight Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Responsive Weight Tests</h2>
        <div className="space-y-2">
          <p className="font-inter font-light md:font-medium lg:font-bold">
            Inter: Light on mobile, Medium on tablet, Bold on desktop
          </p>
          <p className="font-cabinet-grotesk font-normal md:font-semibold lg:font-extrabold">
            Cabinet Grotesk: Normal on mobile, Semibold on tablet, Extrabold on desktop
          </p>
        </div>
      </section>
    </div>
  );
};

export default FontIntegrationTest;