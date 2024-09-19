import dynamic from "next/dynamic";
import {ChartType} from '../utils/definition';

const G2Chart = dynamic(() => import("./g2Chart"), {
  ssr: false
});


export default function DynamicChart({ parentElId, chartType, chartData}: { parentElId: string, chartType: ChartType, chartData: any[]}) {
  return (
    <div className="chart-dynamic">
      <G2Chart parentElId={parentElId} chartType={chartType} chartData={chartData}/>
    </div>
  );
}