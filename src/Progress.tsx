import { useContext, ReactNode } from 'react';
import { StoriesContext } from './Context';

export interface ProgressWrapperProps {
  children: ReactNode;
  width: number;
  paused: boolean;
}

const ProgressWrapper = ({ children, width, paused }: ProgressWrapperProps) => (
  <div
    style={{
      height: 2,
      maxWidth: '100%',
      background: 'rgba(255,255,255, .4)',
      margin: 2,
      borderRadius: 2,
      transition: 'opacity 400ms ease-in-out',
      width: `${width * 100}%`,
      opacity: paused ? 0 : 1,
    }}
  >
    {children}
  </div>
);

export interface ProgressProps {
  width: number;
  active: number;
  count: number;
}

export const Progress = (props: ProgressProps): JSX.Element => {
  const { paused } = useContext(StoriesContext);

  const getProgressStyle = ({ active }: { active: number }) => {
    switch (active) {
      case 2:
        return { width: '100%' };
      case 1:
        return { transform: `scaleX(${props.count / 100})` };
      default:
        return { width: 0 };
    }
  };

  const { width, active } = props;
  return (
    <ProgressWrapper width={width} paused={paused}>
      <div
        style={{
          background: '#fff',
          height: '100%',
          maxWidth: '100%',
          borderRadius: 2,
          transformOrigin: 'center left',
          WebkitBackfaceVisibility: 'hidden',
          MozBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
          WebkitPerspective: 1000,
          MozPerspective: 1000,
          perspective: 1000,
          ...getProgressStyle({ active }),
        }}
      />
    </ProgressWrapper>
  );
};
