import classNames from 'classnames';
import React from 'react';

export interface LoadingProps {
  className?: string;
  // TODO: add your props
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { className } = props;
  return (
    <div className={classNames('flex items-center gap-2 text-sm text-gray-500', className)}>
      <span className="animate-spin inline-block w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full" />
      Loading…
    </div>
  );
};

export default React.memo(Loading);
