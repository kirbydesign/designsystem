import { Plugin } from 'chart.js';

export interface VerticalLinePlugin extends Plugin {
  id: string;
  drawTime: string;
  line?: {
    color: string;
  };
  defaults?: {
    width: number;
    color: string;
  };
}
