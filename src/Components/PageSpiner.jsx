import { Spin } from 'antd';

export const PageSpiner = () => {
  return (
    <div className="h-full absolute left-1/2 flex flex-col justify-center">
      <Spin size="large" className="self-stretch " />
    </div>
  );
};
