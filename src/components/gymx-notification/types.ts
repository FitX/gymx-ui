import type { Component } from 'vue';

export interface GymxNotificationProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  icon?: Component;
  text?: string;
}
