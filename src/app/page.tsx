'use client'

import { useEffect, useState } from 'react';
import { fetchCoronaData1, fetchCoronaData2 } from './utils/api';
import {ChartType} from './utils/definition';
import Card from './ui/card';
import { Button } from "antd";
import { DownloadOutlined, WifiOutlined, AlignLeftOutlined} from '@ant-design/icons';

let isFetched = false;

export default function Home() {
  const [pageWidth, setPageWidth] = useState<number>(0);
  const [pageHeight, setPageHeight] = useState<number>(0);
  const [pageTitle, setPageTitle] = useState<string>("Page title");
  const [pageNotes, setPageNotes] = useState<number>(3);
  const [graphData1, setGraphData1] = useState<any[]>([]);
  const [graphData2, setGraphData2] = useState<any[]>([]);
  const chartTitle = "Chart Title";

  //onInit
  useEffect(() => {
    console.log("init Home page");
    window.addEventListener('resize', ()=> {
      console.log("resize to: ", window.innerHeight, window.innerWidth)
      setPageWidth(window.innerWidth);
      setPageHeight(window.innerHeight);
    });

    fetchData();
  }, []);

  async function fetchData() {
    if (isFetched) {
      return;
    }

    isFetched = true;

    fetchCoronaData1().then((data) => {
      // Handle the fetched data here
      console.log('Fetched data1: ', data);
      setGraphData1(data);
    }).catch((err) => {
      // Handle the error here
      console.error("Fetch Corona data1 error: ", err);
    });

    fetchCoronaData2().then((data) => {
      // Handle the fetched data here
      console.log('Fetched data2: ', data);
      setGraphData2(data);
    }).catch((err) => {
      // Handle the error here
      console.error("Fetch Corona data2 error: ", err);
    });
  }

  //set Title
  function getPageNotesTitle(): string {
    return pageNotes + " notes for this page";
  }
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center h-full w-full p-8 pb-20 gap-16 bg-gray-100 font-[family-name:var(--font-geist-sans)]">
          <div className="flex justify-between items-center w-full px-4">
            <h1 className="text-md">{pageTitle}</h1>
            <div className="flex items-center space-x-4">
              <Button className="flex items-center space-x-2 px-3 py-2 rounded-md text-black bg-white gap-2" title="Export page as PDF file">
                Export to PDF
                <DownloadOutlined className="svg-image svg-green" style={{fontSize: '24px'}}/>
              </Button>
              <Button className="flex items-center space-x-2 px-3 py-2 rounded-md text-black bg-white gap-2" title={getPageNotesTitle()}>
                Notes 
                <span className="ml-1 rounded-full text-slate-300">({pageNotes})</span>
                <AlignLeftOutlined className="svg-image svg-green" style={{fontSize: '24px'}}/>
              </Button>
              <Button className="flex items-center space-x-2 px-3 py-2 rounded-md text-black bg-white gap-2" title="Filter items">
                Filter
                <span className="ml-1 text-xs font-semibold bg-gray-200 text-gray-800 rounded-full px-2 py-1">9+</span>
                <WifiOutlined className="svg-image svg-green" style={{fontSize: '24px'}} rotate={0}/>
              </Button>
            </div>
          </div>
          <div className="flex w-full h-full justify-center gap-8 flex-row">
            <Card title={chartTitle} chartData={graphData1} chartType={ChartType.chartType1} comments={3} id="1">
            </Card>
            <Card title={chartTitle} chartData={graphData2} chartType={ChartType.chartType2} comments={5} id="2">
            </Card>
          </div>
    </div>
  );
}
