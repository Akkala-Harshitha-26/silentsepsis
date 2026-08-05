import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

// Numbers on a monitor shouldn't just appear — they should tick up like a
// reading settling in, the way a real vitals display does.
export default function CountUp({ value, decimals = 0, suffix = '' }) {
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (v) => v.toFixed(decimals));
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    const controls = animate(motionVal, value, { duration: 0.9, ease: [0.16, 1, 0.3, 1] });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => { controls.stop(); unsub(); };
  }, [value]);

  return <motion.span>{display}{suffix}</motion.span>;
}
