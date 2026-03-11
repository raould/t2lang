import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        silent: false,
        setupFiles: ['vitest.setup.ts'],
        environment: 'node',
        include: ['tests/**/*.test.ts'],
        disableConsoleIntercept: true
    },
});
