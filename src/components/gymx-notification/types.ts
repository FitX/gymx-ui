import type { Component } from 'vue';

export interface GymxNotificationProps {
  type?: 'success' | 'warning' | 'error' | 'info';
  icon?: Component | string;
  text?: string;
}
