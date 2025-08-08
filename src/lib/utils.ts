// Re-export utilities from the main utils file
export * from '@/utils';

// Keep the original cn function for backward compatibility
import { cn as cnUtil } from '@/utils';
export { cnUtil as cn };
