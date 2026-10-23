import { motion } from 'framer-motion';
import { ArrowUpRight, CalendarHeart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDateTime, formatRelativeDay } from '@/shared/lib/date';

export function NextVisitNote({ appointment }) {
  return (
    <motion.div
      initial={{ rotate: 0 }}
      whileHover={{ rotate: -1, y: -2 }}
      className="relative rounded-2xl bg-sun p-4 shadow-glow"
    >
      <p className="mb-1 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
        <CalendarHeart className="size-3.5" /> Note · next exam or visit
      </p>
      {appointment ? (
        <>
          <p className="text-base leading-tight font-extrabold">{appointment.title}</p>
          <p className="mt-1 text-xs font-semibold">
            {formatDateTime(appointment.scheduledAt)} · {formatRelativeDay(appointment.scheduledAt)}
          </p>
          {appointment.doctor && <p className="text-xs">{appointment.doctor}</p>}
        </>
      ) : (
        <p className="text-sm font-semibold">Nothing planned. Enjoy the quiet.</p>
      )}
      <Link
        to="/appointments"
        aria-label="Open planned visits"
        className="absolute top-3 right-3 grid size-7 place-items-center rounded-full bg-white/70 hover:bg-white hover:shadow-glow-sm"
      >
        <ArrowUpRight className="size-4" />
      </Link>
    </motion.div>
  );
}
