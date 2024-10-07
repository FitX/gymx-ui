import type { Component } from 'vue';

export interface GymxNotificationProps {
  type?: 'success' | 'warning' | 'error';
  icon?: Component;
  text?: string;
}
