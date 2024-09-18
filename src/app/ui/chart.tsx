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
    const [g2Chart, setG2Chart] = useState<Chart | null>(null);
    const elId = "chart-" + id;    

    //onIinit
    useEffect(() => {
        createChart();
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
          console.log("Destroy Chart id: ", id);
          destroyChart();
        };
    }, []);

    //init chart
    function createChart() {
        const chart = new Chart({ 
            container: elId, 
            forceFit: true,
            height: 500
        });        
        setG2Chart(chart);
    }

    //update chart data
    function updateChartData(newData: any[]) {
        console.log("updateChartData newData: ", newData);
        console.log("updateChartData g2Chart: ", g2Chart);                
        if (type === ChartType.chartType1) {
            initChartType1();
        } else {
            initChartType2();
        }
    }

    //init Chart type 1
    function initChartType1() {
        console.log("initChartType1");
        if (!g2Chart) {
            return;
        }
        console.log("initChartType1.1");
    
        g2Chart.source(data, {
            sync: true,
            call: {
              tickCount: 5
            },
        });

        g2Chart.legend({
            custom: 1,
        });
        g2Chart
            .line()
            .position("date*metric_value")
            .color("#ff3f00")
            .size(3)
            .shape("smooth");
        g2Chart
            .point()
            .position("date*metric_value")
            .color("#ff3f00")
            .size(3)
            .shape("circle");  
    
        g2Chart.render();
    }

    //init Chart type 2
    function initChartType2() {
        console.log("initChartType2");
        if (!g2Chart) {
            return;
        }
        console.log("initChartType2.1");

        g2Chart.source(data, {
            sync: true,
            call: {
                tickCount: 5
              },  
        });
    
        g2Chart
            .interval() 
            .position("date*metric_value")
            .color("metric_value");    
        g2Chart.render();
    }

    //clear Chart
    function destroyChart() {
        if (g2Chart)   {
            console.log("destroyChart");
            g2Chart.destroy();
            setG2Chart(null);
        }
    }

    return (
        <div id={elId} className="flex w-full h-full">
        </div>
    );
};

export default ChartComponent;