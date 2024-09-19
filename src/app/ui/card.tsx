'use client';

import { useState } from 'react';
import { HeartOutlined, HeartFilled, TwitchOutlined } from '@ant-design/icons';
import { Avatar } from "antd";
import { UserOutlined } from '@ant-design/icons';
import Chart from './chart'; // Import the Chart component
import {ChartType, Favour} from '../utils/definition';
import {updateFavourGraph} from '../utils/api';

interface CardProps {
  id: string;
  title: string;
  chartData: any[];
  chartType: ChartType;
  comments: number;
}

const Card: React.FC<CardProps> = ({ id, title, chartData, chartType, comments }) => {
  const [useHeart, setUseHeart] = useState<boolean>(false);

  //Get Titles
  function getCommentTitle(): string {
    return comments + ' comments for chart';
  }
  function getAvatarTitle(): string {
    return "User";
  }

  function getHeartTitle(): string {
    return "Select chart as a favorite"
  }

  function handleHeart(state: boolean) {
    updateFavourGraph(id, state).then((favour: Favour) => {
        setUseHeart(favour.isFavour);
        console.log("Favour updated to: ", favour.chartId, favour.isFavour);
    })
    .catch (error => {
        console.error("Failed to update favorite graph: ", error);
    });   
  }

  return (
    <div className="flex flex-col w-full rounded-md shadow-md overflow-hidden justify-between bg-white">
      <div className="px-4 py-2 border-b border-solid border-slate-200">
        <h2 className="text-lg font-semibold">{title}</h2>        
      </div>
      <div className="flex items-center justify-between px-4 py-2 w-full h-full">
          <Chart type={chartType} data={chartData} id={id}/>
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 select-none">
        <div className="flex items-center" title={getAvatarTitle()}>
          <Avatar icon={<UserOutlined />} />
        </div>
        <div className="flex items-center cursor-pointer" title={getHeartTitle()} onClick={() => handleHeart(!useHeart)}>
          {!useHeart ?
            <HeartOutlined className="svg-image svg-red" style={{fontSize: '24px'}}/> 
            :
            <HeartFilled className="svg-image svg-red" style={{fontSize: '24px'}}/>
          }
        </div>
        <div className="flex items-center gap-2" title={getCommentTitle()}>
          <span className="ml-2 text-sm font-semibold text-slate-400">{comments}</span>
              <TwitchOutlined className="svg-image svg-gray" style={{fontSize: '24px'}}/>                   
        </div>
      </div>
    </div>
  );
};

export default Card;