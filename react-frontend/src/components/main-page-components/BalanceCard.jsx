import { useEffect, useMemo, useState } from "react";

const BalanceCard = ({formatCurrency, balance, monthlySpending}) => {
  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    const target = Number(balance) || 0;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayBalance(target);
      return;
    }

    let frameId;
    const duration = 900;
    const startTime = performance.now();
    const startValue = 0;

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setDisplayBalance(startValue + (target - startValue) * easedProgress);

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [balance]);

  const formattedBalance = useMemo(
    () => formatCurrency(displayBalance),
    [displayBalance, formatCurrency],
  );

  return (
    <div className="relative min-h-[260px] basis-[600px] grow overflow-hidden rounded-3xl border border-primary/35 bg-[radial-gradient(circle_at_16%_10%,rgb(255_255_255_/_0.34),transparent_18rem),radial-gradient(circle_at_95%_0%,color-mix(in_oklch,var(--color-secondary)_80%,transparent),transparent_22rem),linear-gradient(135deg,color-mix(in_oklch,var(--color-primary)_92%,black),var(--color-primary))] p-8 shadow-[0_22px_60px_color-mix(in_oklch,var(--color-primary)_22%,transparent),0_16px_36px_color-mix(in_oklch,var(--color-base-content)_8%,transparent)]">
      <div className="pointer-events-none absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-base-100/25" />
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-primary-content/35" />

      <div className="relative z-10 flex w-fit items-center gap-2 rounded-full bg-base-100/20 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-primary-content/90 backdrop-blur">
        <span className="badge size-2 p-0 bg-primary-content"></span>
        SYNCED
      </div>
      <div className="relative z-10 mt-8">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-content/70">Total Balance</p>
        <h1 className="mt-3 tabular-nums text-5xl font-black tracking-tight text-primary-content transition-transform duration-300 xl:text-6xl">
          {formattedBalance}
        </h1>
      </div>
      <div className="relative z-10 mt-7 rounded-2xl bg-base-100/18 p-4 text-primary-content backdrop-blur">
        <h5 className="text-xs font-bold uppercase tracking-[0.18em] text-primary-content/65">
          MONTHLY SPENDING
        </h5>
        <h4 className="mt-2 text-2xl font-extrabold">
          {formatCurrency(monthlySpending)}
        </h4>
      </div>
    </div>
  );
};

export default BalanceCard;
