import { motion } from 'framer-motion';

function HeroStat({ label, value, unit, caption, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-3xl border p-4 ${index === 0 ? 'border-sun bg-sun shadow-glow' : 'border-zinc-100 bg-white shadow-card'}`}
    >
      <p className="text-[10px] font-bold tracking-wider uppercase opacity-60">{label}</p>
      <p className="mt-1 text-2xl font-extrabold tracking-tight tabular-nums">
        {value ?? '—'}
        {value != null && <span className="ml-1 text-xs font-semibold opacity-50">{unit}</span>}
      </p>
      <p className="mt-0.5 text-xs font-semibold opacity-70">{caption}</p>
    </motion.div>
  );
}

export function HeroStats({ snapshot }) {
  const { bloodPressure } = snapshot;
  const stats = [
    {
      label: 'Blood pressure',
      value: bloodPressure ? `${bloodPressure.systolic}/${bloodPressure.diastolic}` : null,
      unit: 'mmHg',
      caption: snapshot.bloodPressureCategory?.label,
    },
    {
      label: 'Weight',
      value: snapshot.weightKg,
      unit: 'kg',
      caption: `${snapshot.profile.heightCm} cm tall`,
    },
    { label: 'Body fat', value: snapshot.bodyFatPct, unit: '%', caption: 'of body mass' },
    { label: 'BMI', value: snapshot.bmi, unit: 'kg/m²', caption: snapshot.bmiRange?.label },
  ];

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <HeroStat key={stat.label} index={index} {...stat} />
      ))}
    </div>
  );
}
