'use client';

import {ChartType} from '../utils/definition';
import DynamicChart from './dynamicChart';

interface ChartProps {
  id: string;  
  type: ChartType;
  data: any[];
}

const ChartComponent: React.FC<ChartProps> = ({ id, type, data}) => {
    const elId = "chart-" + id;    

    return (
        <div className="flex w-full h-full">
            <DynamicChart parentElId={elId} chartType={type} chartData={data}/>
            <div id={elId} className="flex w-full h-full">                 
            </div>
        </div>
    );
};

export default ChartComponent;