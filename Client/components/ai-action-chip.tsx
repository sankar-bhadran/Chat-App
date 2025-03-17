"use client";

import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface AiActionChipProps {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  className?: string; // ✅ Add className as an optional prop
}

export default function AiActionChip({
  icon: Icon,
  label,
  onClick,
  className,
}: AiActionChipProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      className={`h-8 gap-1 rounded-full bg-secondary/50 hover:bg-secondary ${className}`}
      onClick={onClick}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
    </Button>
  );
}
