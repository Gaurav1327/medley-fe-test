module.exports = {
    verbose: true,
    testEnvironment: 'jsdom',
  
    testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy', // Mock stylesheets
    },
  };
  