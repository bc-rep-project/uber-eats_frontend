/// <reference types="jest" />

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}

// Mock fetch globally
(global as any).fetch = jest.fn();

// Clean up after each test
afterEach(() => {
  jest.clearAllMocks();
}); 