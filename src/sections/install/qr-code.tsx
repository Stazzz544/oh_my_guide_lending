import { useMemo } from 'react';
import { encode } from 'uqr';

import type { JSX } from 'react';

type QrCodeProps = {
  value: string;
  className?: string;
};

export const QrCode = ({ value, className }: QrCodeProps): JSX.Element => {
  const { path, size } = useMemo(() => {
    const qr = encode(value, { ecc: 'M', border: 1 });
    const segments: string[] = [];
    qr.data.forEach((row, y) => {
      row.forEach((isDark, x) => {
        if (isDark) {
          segments.push(`M${x} ${y}h1v1h-1z`);
        }
      });
    });
    return { path: segments.join(''), size: qr.size };
  }, [value]);

  return (
    <svg className={className} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" aria-hidden="true">
      <path d={path} fill="currentColor" />
    </svg>
  );
};
