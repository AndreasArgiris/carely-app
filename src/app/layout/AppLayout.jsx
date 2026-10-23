import { ProfilePanel } from '@/features/profile/ProfilePanel';
import { AnimatedOutlet } from './AnimatedOutlet';
import { Brand } from './Brand';
import { SideNav } from './SideNav';

export function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/3 h-80 w-[40rem] rounded-full bg-sun/15 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-[1500px] gap-6 px-4 py-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:px-6 xl:grid-cols-[220px_minmax(0,1fr)_330px]">
        <aside className="space-y-6">
          <Brand />
          <SideNav />
        </aside>
        <main className="min-w-0 xl:order-none">
          <AnimatedOutlet />
        </main>
        <aside className="lg:col-start-2 xl:col-start-auto">
          <ProfilePanel />
        </aside>
      </div>
    </div>
  );
}
