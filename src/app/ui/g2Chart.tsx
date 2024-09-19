'use client';

import { useEffect, useState } from "react";
import { Chart } from '@antv/g2';
import {ChartType} from '../utils/definition';

export default function G2Chart({ parentElId, chartType, chartData }: { parentElId: string, chartType: ChartType, chartData: any[] }) {//+
    const [g2Chart, setG2Chart] = useState<Chart | null>(null);

    useEffect(() => {
        // Wait for the component to be mounted before setting the rootElement
        if (typeof window !== "undefined") {
            const el = document.getElementById(parentElId);    
            if (el) {
                createChart(parentElId);
            }
        }
    }, [parentElId]);

    //onChange data
    useEffect(() => {
        //init Chart type 1
        function initChartType1(sourceData: any[]) {
            if (!g2Chart) return;
        
            g2Chart.source(sourceData, {
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
        function initChartType2(sourceData: any[]) {
            if (!g2Chart) return;

            g2Chart.source(sourceData, {
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

        //update chart data
        function updateChartData(sourceData: any[]) {
           (chartType === ChartType.chartType1) ? initChartType1(sourceData) : initChartType2(sourceData);
        }

        updateChartData(chartData);
    }, [chartData, chartType, g2Chart]);

    //onDestroy
    useEffect(() => {
        //clear Chart
        function destroyChart() {
            if (g2Chart)   {
                g2Chart.destroy();
                setG2Chart(null);
            }
        }

        return () => {
          destroyChart();
        };
    }, [g2Chart]);

    function createChart(id: string):Chart {
        const chart = new Chart({ 
            container: id, 
            forceFit: true,
            height: 500
        });     
        setG2Chart(chart);
        return chart;    
    }

    return (
        <div className="g2-chart-container">
        </div>
    );
}