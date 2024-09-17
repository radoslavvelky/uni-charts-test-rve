import Image from 'next/image';
import imgComment from '../icons/comment.svg';

interface CardProps {
  title: string;
  graph: string;
  avatar: string;
  comments: number;
}

const Card: React.FC<CardProps> = ({ title, graph, avatar, comments }) => {
  function getCommentTitle(): string {
    return comments + ' comments for chart';
  }
  function getAvatarTitle(): string {
    return "User";
  }

  return (
    <div className="flex flex-col w-full rounded-md shadow-md overflow-hidden justify-between bg-white">
      <div className="px-4 py-2 border-b border-solid border-slate-200">
        <h2 className="text-lg font-semibold">{title}</h2>        
      </div>
      <div className="flex items-center justify-between px-4 py-2">
      </div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="flex items-center" title={getAvatarTitle()}>
          <Image src={avatar} alt="User avatar" className="svg-image" width="24" height="24" />
        </div>
        <div className="flex items-center gap-2" title={getCommentTitle()}>
          <span className="ml-2 text-sm font-semibold">{comments}</span>
          <Image src={imgComment.src} alt="User avatar" className="svg-image" width="24" height="24" />
        </div>
      </div>
    </div>
  );
};

export default Card;