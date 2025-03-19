export interface GymxTab {
  id?: number | string,
  content?: string,
  title: string,
}

export interface GymxTabsProps {
  tabs: GymxTab[];
  // default tab index = 0
  selectedTab?: number;
  label: string;
}
