import React, { useEffect, useState } from 'react';
import { logFontVerification } from '@/utils/fontVerification';

interface FontReport {
  totalFonts: number;
  loadedCount: number;
  failedCount: number;
  loadedFonts: string[];
  failedFonts: string[];
  success: boolean;
  tailwindClasses: string[];
}

const FontTestComponent: React.FC = () => {
  const [fontReport, setFontReport] = useState<FontReport | null>(null);

  useEffect(() => {
    // Wait for fonts to load, then verify
    const timer = setTimeout(() => {
      const report = logFontVerification();
      setFontReport(report);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-8 space-y-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8">Variable Font Test Component</h1>
      
      {/* Font Verification Report */}
      {fontReport && (
        <section className="mb-8 p-4 border rounded-lg bg-muted">
          <h2 className="text-xl font-semibold mb-4">Font Verification Report</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{fontReport.totalFonts}</div>
              <div className="text-sm text-muted-foreground">Total Fonts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{fontReport.loadedCount}</div>
              <div className="text-sm text-muted-foreground">Loaded</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{fontReport.failedCount}</div>
              <div className="text-sm text-muted-foreground">Failed</div>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold ${fontReport.success ? 'text-green-600' : 'text-red-600'}`}>
                {fontReport.success ? '✅' : '❌'}
              </div>
              <div className="text-sm text-muted-foreground">Status</div>
            </div>
          </div>
          {fontReport.failedFonts.length > 0 && (
            <div className="text-red-600">
              <strong>Failed Fonts:</strong> {fontReport.failedFonts.join(', ')}
            </div>
          )}
        </section>
      )}
      
      {/* Inter Variable Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Inter Variable Font</h2>
        <div className="space-y-2">
          <p className="font-inter-thin text-lg">Inter Thin (100) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-extralight text-lg">Inter Extra Light (200) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-light text-lg">Inter Light (300) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-normal text-lg">Inter Normal (400) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-medium text-lg">Inter Medium (500) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-semibold text-lg">Inter Semibold (600) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-bold text-lg">Inter Bold (700) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-extrabold text-lg">Inter Extra Bold (800) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter-black text-lg">Inter Black (900) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Cabinet Grotesk Variable Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Cabinet Grotesk Variable Font</h2>
        <div className="space-y-2">
          <p className="font-cabinet-grotesk-thin text-lg">Cabinet Grotesk Thin (100) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-extralight text-lg">Cabinet Grotesk Extra Light (200) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-light text-lg">Cabinet Grotesk Light (300) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-normal text-lg">Cabinet Grotesk Normal (400) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-medium text-lg">Cabinet Grotesk Medium (500) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-semibold text-lg">Cabinet Grotesk Semibold (600) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-bold text-lg">Cabinet Grotesk Bold (700) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-extrabold text-lg">Cabinet Grotesk Extra Bold (800) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk-black text-lg">Cabinet Grotesk Black (900) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Clash Display Variable Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Clash Display Variable Font</h2>
        <div className="space-y-2">
          <p className="font-clash-display-extralight text-lg">Clash Display Extra Light (200) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display-light text-lg">Clash Display Light (300) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display-normal text-lg">Clash Display Normal (400) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display-medium text-lg">Clash Display Medium (500) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display-semibold text-lg">Clash Display Semibold (600) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display-bold text-lg">Clash Display Bold (700) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Panchang Variable Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Panchang Variable Font</h2>
        <div className="space-y-2">
          <p className="font-panchang-light text-lg">Panchang Light (300) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang-normal text-lg">Panchang Normal (400) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang-medium text-lg">Panchang Medium (500) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang-semibold text-lg">Panchang Semibold (600) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang-bold text-lg">Panchang Bold (700) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang-extrabold text-lg">Panchang Extra Bold (800) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Space Grotesk Variable Font Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Space Grotesk Variable Font</h2>
        <div className="space-y-2">
          <p className="font-space-grotesk-light text-lg">Space Grotesk Light (300) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk-normal text-lg">Space Grotesk Normal (400) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk-medium text-lg">Space Grotesk Medium (500) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk-semibold text-lg">Space Grotesk Semibold (600) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk-bold text-lg">Space Grotesk Bold (700) - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>

      {/* Tailwind Font Family Tests */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Tailwind Font Family Classes</h2>
        <div className="space-y-2">
          <p className="font-sans text-lg">Default Sans (Inter Variable) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-inter text-lg">Inter Font (Inter Variable) - The quick brown fox jumps over the lazy dog</p>
          <p className="font-cabinet-grotesk text-lg">Cabinet Grotesk Font - The quick brown fox jumps over the lazy dog</p>
          <p className="font-clash-display text-lg">Clash Display Font - The quick brown fox jumps over the lazy dog</p>
          <p className="font-panchang text-lg">Panchang Font - The quick brown fox jumps over the lazy dog</p>
          <p className="font-space-grotesk text-lg">Space Grotesk Font - The quick brown fox jumps over the lazy dog</p>
          <p className="font-mono text-lg">Mono Font - The quick brown fox jumps over the lazy dog</p>
        </div>
      </section>
    </div>
  );
};

export default FontTestComponent;