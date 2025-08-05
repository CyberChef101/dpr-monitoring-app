import React from 'react';
import { useTheme } from '../context/ThemeContext';
import DarkModeToggle from './DarkModeToggle';

const Header = () => {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">DPR Monitoring App – Sandur</h1>
          <p className="text-sm text-muted-foreground">Daily Progress Report Management System</p>
        </div>
        <div className="flex items-center space-x-4">
          <UserProfile />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

const UserProfile = () => {
  // For now, hardcoded user info
  const userName = 'Site Supervisor';
  const userEmail = 'supervisor@sandur.com';

  // Extract initials for avatar
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <button
      type="button"
      className="flex items-center gap-3 rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] bg-primary text-primary-foreground hover:bg-primary/90 h-auto p-3"
      aria-label="User profile menu"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary-foreground font-semibold">
          {initials}
        </div>
        <div className="text-left">
          <div className="text-sm font-medium">{userName}</div>
          <div className="text-xs text-muted-foreground">{userEmail}</div>
        </div>
      </div>
    </button>
  );
};

export default Header;
