import type { Component } from 'vue';

export interface GymxToastProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: Component | string;
  text: string;
  closeText?: string;
  duration?: number;
}
