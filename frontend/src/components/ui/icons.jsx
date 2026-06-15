import React from 'react';
import { cn } from '@/lib/utils';
// Pastikan utility 'cn' sudah di-import, misalnya dari tailwind-merge atau clsx

const AppIcon = ({
  src = '/favicon.svg',
  alt = 'Logo Universitas Galuh',
  className,
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('w-full h-full object-contain', className)}
      {...props}
    />
  );
};

export default AppIcon;
