import * as React from "react";
export interface IBarProps {
  title: React.ReactNode;
  color?: string;
  padding?: [number, number, number, number];
  height: number;
  data: Array<{
    x: string;
    y: number;
  }>;
  labelSetting?:object;
  chartSetting?:object;
  autoLabel?: boolean;
  useShape?: boolean;
  showBase?: boolean;
  transpose?: boolean;
  style?: React.CSSProperties;
}

export default class Bar extends React.Component<IBarProps, any> {}
