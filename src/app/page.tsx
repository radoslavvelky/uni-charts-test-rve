'use client'

import { useEffect, useState } from 'react';
import { fetchCoronaData } from './utils/api';
import Card from './ui/card';
import imgAvatar from './icons/avatar.svg';
import { Button } from "antd";
import { DownloadOutlined, WifiOutlined, AlignLeftOutlined} from '@ant-design/icons';

export default function Home() {
  const [pageTitle, setPageTitle] = useState<string>("Page title");
  const [pageNotes, setPageNotes] = useState<number>(3);
  const chartTitle = "Chart Title";
  const graphText = "Graph";

  useEffect(() => {
    async function fetchData() {
      console.log('Fetching data 1');
      fetchCoronaData().then((data) => {
        // Handle the fetched data here
        console.log('Fetched data: ', data);
      }).catch((err) => {
        // Handle the error here
        console.error("Fetch Corona data error: ", err);
      });
    }

    fetchData();
  }, []);

  function getPageNotesTitle(): string {
    return pageNotes + " notes for this page";
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 bg-gray-100 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
        <Card title={chartTitle} graph={graphText} avatar={imgAvatar.src} comments={3}>
        </Card>
        <Card title={chartTitle} graph={graphText} avatar={imgAvatar.src} comments={5}>
        </Card>
      </div>
    </div>
  );
}
