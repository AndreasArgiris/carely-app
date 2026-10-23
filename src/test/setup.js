import 'fake-indexeddb/auto';
import '@testing-library/jest-dom/vitest';

// jsdom has no scrolling; framer-motion calls it during layout animations.
window.scrollTo = () => {};
