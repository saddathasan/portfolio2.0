// Re-export utilities from the main utils file
export * from '@/shared/utils';

// Keep the original cn function for backward compatibility
import { cn as cnUtil } from '@/shared/utils';
export { cnUtil as cn };
