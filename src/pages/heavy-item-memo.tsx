import React from 'react';

function heavyCompute(n: number) {
  let s = 0;
  for (let i = 0; i < 20000; i++) s += Math.sqrt(n + i);
  return Math.round(s);
}

type Props = { id: number; title: string };

function HeavyItemBase({ id, title }: Props) {
  const score = heavyCompute(id);
  return (
    <div style={{ display: 'flex', gap: 12, padding: 8, borderBottom: '1px solid #eee' }}>
      <img src={`https://picsum.photos/seed/${id}/48/48`} alt="" width={48} height={48} />
      <div>
        <div style={{ fontWeight: 600 }}>{title}</div>
        <small>Score: {score}</small>
      </div>
    </div>
  );
}

export const HeavyItem = React.memo(HeavyItemBase);
