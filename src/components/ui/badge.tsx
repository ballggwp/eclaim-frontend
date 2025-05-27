'use client';
import React, { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-sm font-medium ${className}`}
    >
      {children}
    </span>
  );
}
