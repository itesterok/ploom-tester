export const WaitersConfig = {
    short: 1_000,    // Quick wait for UI updates
    medium: 5_000,   // Standard wait for elements to appear
    long: 30_000,    // Longer wait for operations to complete
} as const;
