import React from 'react';

const NavigationCard = () => {
  const menuItems = [
    { label: 'Home', key: 'home' },
    { label: 'DPR Reports', key: 'dpr-reports' },
    { label: 'Cranes Summary', key: 'cranes-summary' },
    { label: 'Settings', key: 'settings' },
  ];

  return (
    <nav className="card flex flex-col gap-2 p-6">
      <h4 className="text-base font-semibold mb-4">Navigation</h4>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              type="button"
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <span className="inline-block h-4 w-4 rounded-full bg-primary" aria-hidden="true" />
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationCard;
