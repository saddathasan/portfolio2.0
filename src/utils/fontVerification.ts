/**
 * Font Verification Utility
 * Verifies that all variable fonts are properly loaded and accessible
 */

export interface FontConfig {
  name: string;
  family: string;
  weights: number[];
  cssClass: string;
}

export const VARIABLE_FONTS: FontConfig[] = [
  {
    name: 'Inter Variable',
    family: 'Inter Variable',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    cssClass: 'font-inter',
  },
  {
    name: 'Cabinet Grotesk Variable',
    family: 'Cabinet Grotesk Variable',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    cssClass: 'font-cabinet-grotesk',
  },
  {
    name: 'Clash Display Variable',
    family: 'Clash Display Variable',
    weights: [200, 300, 400, 500, 600, 700],
    cssClass: 'font-clash-display',
  },
  {
    name: 'Panchang Variable',
    family: 'Panchang Variable',
    weights: [300, 400, 500, 600, 700, 800],
    cssClass: 'font-panchang',
  },
  {
    name: 'Space Grotesk Variable',
    family: 'Space Grotesk Variable',
    weights: [300, 400, 500, 600, 700],
    cssClass: 'font-space-grotesk',
  },
];

export const TAILWIND_FONT_FAMILIES = [
  'font-sans',
  'font-inter',
  'font-cabinet-grotesk',
  'font-clash-display',
  'font-panchang',
  'font-space-grotesk',
  'font-mono',
];

/**
 * Check if a font is loaded in the browser
 */
export const isFontLoaded = (fontFamily: string, weight = 400): boolean => {
  if (typeof document === 'undefined') return false;
  
  try {
    return document.fonts.check(`${weight} 16px "${fontFamily}"`);
  } catch (error) {
    console.warn(`Error checking font ${fontFamily}:`, error);
    return false;
  }
};

/**
 * Verify all variable fonts are loaded
 */
export const verifyVariableFonts = (): { loaded: FontConfig[]; failed: FontConfig[] } => {
  const loaded: FontConfig[] = [];
  const failed: FontConfig[] = [];

  VARIABLE_FONTS.forEach(font => {
    if (isFontLoaded(font.family)) {
      loaded.push(font);
    } else {
      failed.push(font);
    }
  });

  return { loaded, failed };
};

/**
 * Get font verification report
 */
export const getFontVerificationReport = () => {
  const { loaded, failed } = verifyVariableFonts();
  
  return {
    totalFonts: VARIABLE_FONTS.length,
    loadedCount: loaded.length,
    failedCount: failed.length,
    loadedFonts: loaded.map(f => f.name),
    failedFonts: failed.map(f => f.name),
    success: failed.length === 0,
    tailwindClasses: TAILWIND_FONT_FAMILIES,
  };
};

/**
 * Log font verification results to console
 */
export const logFontVerification = () => {
  const report = getFontVerificationReport();
  
  console.group('🔤 Variable Font Verification Report');
  console.log(`Total Fonts: ${report.totalFonts}`);
  console.log(`Loaded: ${report.loadedCount}`);
  console.log(`Failed: ${report.failedCount}`);
  
  if (report.loadedFonts.length > 0) {
    console.log('✅ Loaded Fonts:', report.loadedFonts);
  }
  
  if (report.failedFonts.length > 0) {
    console.warn('❌ Failed Fonts:', report.failedFonts);
  }
  
  console.log('🎨 Available Tailwind Classes:', report.tailwindClasses);
  console.log(`Overall Status: ${report.success ? '✅ SUCCESS' : '❌ FAILED'}`);
  console.groupEnd();
  
  return report;
};