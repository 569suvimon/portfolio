import { IcnGitHub } from "@/components/icons";

export const iconMap = {
  github: IcnGitHub,
  home: IcnGitHub,
  user: IcnGitHub,
  previous: IcnGitHub,
  save: IcnGitHub,
  next: IcnGitHub,
  add: IcnGitHub,
  delete: IcnGitHub,
  edit: IcnGitHub,
  cancel: IcnGitHub,
} as const;

export type IconName = keyof typeof iconMap;