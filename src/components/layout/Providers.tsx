"use client";

import React from 'react';
import { LayoutGroup } from 'framer-motion';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
