'use client'

import { useEffect, useState } from 'react';
import { Chart } from '@antv/g2';
import {ChartType} from '../utils/definition';

interface ChartProps {
  id: string;  
  type: ChartType;
  data: any[];
}

const ChartComponent: React.FC<ChartProps> = ({ type, data, id}) => {
    const elId = "chart-" + id;
    let g2Chart: Chart | null = null;

    //onIinit
    useEffect(() => {
        g2Chart = new Chart({ 
            container: elId, 
            forceFit: true,
            height: 500
        });
        
        
    }, []);

    //onChange data
    useEffect(() => {
        updateChartData(data);
    }, [data]);

    //onChange type
    useEffect(() => {
        if (type === ChartType.chartType1) {
            initChartType1();
        } else {
            initChartType2();
        }
    }, [type]);
    
    //onDestroy
    useEffect(() => {
        return () => {
          destroyChart();
        };
    }, []);

    //update chart data
    function updateChartData(newData: any[]) {
        if (!g2Chart) {
            return;
        }

        g2Chart.changeData(data);
    }

    //init Chart type 1
    function initChartType1() {
        if (!g2Chart) {
            return;
        }
    
        g2Chart.source(data, {
            sync: true,
            call: {
              tickCount: 5
            },
            waiting: {
              tickCount: 5
            },
            people: {
              tickCount: 5
            }
        });

        g2Chart.legend({
            custom: 1,
            items: [
              {
                value: "waiting",
                marker: { symbol: "square", fill: "#008fff", radius: 5 }
              },
              {
                value: "people",
                marker: { symbol: "hyphen", stroke: "#ff3f00", radius: 5, lineWidth: 2 }
              }
            ]
        });
        g2Chart
            .interval()
            .position("time*waiting")
            .color("#008fff");
        g2Chart
            .line()
            .position("time*people")
            .color("#ff3f00")
            .size(3)
            .shape("smooth");
        g2Chart
            .point()
            .position("time*people")
            .color("#ff3f00")
            .size(3)
            .shape("circle");          
    
        g2Chart.render();
    }

    //init Chart type 2
    function initChartType2() {
        if (!g2Chart) {
            return;
        }

        g2Chart.source(data, {
            sync: true,
            call: {
              tickCount: 5
            },
            waiting: {
              tickCount: 5
            },
            people: {
              tickCount: 5
            }
        });
    
        g2Chart
        .interval() // chart.[mark]()
        .position("genre*sold")
        .color("genre"); // node.encode()        
        
        g2Chart.render();
    }

    //clear Chart
    function destroyChart() {
        if (g2Chart)   {
            g2Chart.destroy();
            //setG2Chart(null);
            g2Chart = null;
        }
    }

    return (
        <div id={elId} className="flex w-full h-full">
        </div>
    );
};

export default ChartComponent;