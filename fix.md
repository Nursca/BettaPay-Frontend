Add useCallback for event handlers in dashboard and settings
Repo Avatar
Betta-Pay/BettaPay-Frontend
Description: Inline functions passed as props (e.g., onClick, onChange, handleCopy) create new function references on every render, causing child components to re-render even with React.memo. Wrapping these in useCallback stabilizes the references.

Requirements:

Wrap handleCopy, handleLogout, onSubmit, and other handlers in useCallback
Include correct dependency arrays
Apply across all pages with interactive elements
Suggested execution steps:

In app/(merchant)/dashboard/page.tsx, wrap handleCopy and the period toggle handler in useCallback
In app/(merchant)/settings/page.tsx, wrap handleLogout and tab change handlers
In app/auth/login/page.tsx, wrap onSubmit and onWalletConnected
In components/layout/Topbar.tsx, wrap handleLogout
Use React DevTools Profiler to verify fewer re-renders