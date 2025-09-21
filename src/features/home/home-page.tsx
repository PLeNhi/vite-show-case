import React from 'react';

export interface HomePageProps {
  className?: string;
  // TODO: add your props
}

const HomePage: React.FC<HomePageProps> = (props) => {
  const { className } = props;
  return <div className={className}>HomePage component</div>;
};

export default React.memo(HomePage);
