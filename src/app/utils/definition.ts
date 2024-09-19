'use client';

import { Chart } from '@antv/g2';

export enum ChartType {
  chartType1 = 'chartType1',
  chartType2 = 'chartType2',
}

export interface Favour {
  chartId: string;
  isFavour: boolean;
}

export function delay(time: number) {
  return new Promise(resolve => setTimeout(resolve, time));
}  
