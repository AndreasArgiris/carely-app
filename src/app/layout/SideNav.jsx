import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../navItems';

function NavItem({ item }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.to}
      end={item.to === '/'}
      className="relative flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-2.5 text-sm font-semibold text-zinc-500 transition-colors hover:text-ink aria-[current=page]:text-ink"
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <motion.span
              layoutId="nav-active"
              className="absolute inset-0 rounded-2xl bg-sun shadow-glow"
              transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            />
          )}
          <Icon className="relative size-4.5" />
          <span className="relative whitespace-nowrap">{item.label}</span>
        </>
      )}
    </NavLink>
  );
}

export function SideNav() {
  return (
    <nav aria-label="Sections" className="lg:sticky lg:top-6">
      <ul className="-mx-4 flex gap-1 overflow-x-auto px-4 pb-1 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
        {NAV_ITEMS.map((item) => (
          <li key={item.to}>
            <NavItem item={item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
