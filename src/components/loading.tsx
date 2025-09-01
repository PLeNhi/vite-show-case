import React from 'react';

export interface LoadingProps {
  className?: string;
  // TODO: add your props
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { className } = props;
  return <div className={className}>Loading component</div>;
};

export default React.memo(Loading);
