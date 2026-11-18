import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Layers, HelpCircle, PhoneCall } from 'lucide-react';
import { cn } from '../../utilities/classNames';

export function Navigation() {
  const { t } = useTranslation();

  const navItems = [
    {
      to: '/',
      label: t('nav.home', 'Home'),
      icon: <Home className="w-4 h-4" />
    },
    {
      to: '/services',
      label: t('nav.services', 'All Services'),
      icon: <Layers className="w-4 h-4" />
    },
    {
      to: '/guide',
      label: t('nav.guidedAssistance', 'Step-by-Step Guide'),
      icon: <HelpCircle className="w-4 h-4" />
    },
    {
      to: '/help',
      label: t('nav.helpDesk', 'Helpline & Centers'),
      icon: <PhoneCall className="w-4 h-4" />
    }
  ];

  return (
    <nav className="bg-[#F8FAFC] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none py-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors duration-150 whitespace-nowrap cursor-pointer',
                  isActive
                    ? 'bg-white text-[#1E40AF] border border-slate-200 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                )
              }
            >
              {item.icon}
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
