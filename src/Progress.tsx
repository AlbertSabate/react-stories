import { CSSProperties, ReactNode, useContext } from 'react';
import { StoriesContext } from './Context';

export interface ProgressWrapperProps {
  storyProgressWrapperStyles?: CSSProperties;
  children: ReactNode;
  width: number;
  paused: boolean;
}

const ProgressWrapper = ({
  children,
  width,
  paused,
  storyProgressWrapperStyles,
}: ProgressWrapperProps) => (
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
      ...storyProgressWrapperStyles,
    }}
  >
    {children}
  </div>
);

export interface ProgressProps {
  storyProgressWrapperStyles?: CSSProperties;
  storyProgressStyles?: CSSProperties;
  width: number;
  active: number;
  count: number;
}

export const Progress = ({
  count,
  width,
  active,
  storyProgressStyles,
  storyProgressWrapperStyles,
}: ProgressProps): JSX.Element => {
  const { paused } = useContext(StoriesContext);

  const getProgressStyle = ({ active }: { active: number }) => {
    switch (active) {
      case 2:
        return { width: '100%' };
      case 1:
        return { transform: `scaleX(${count / 100})` };
      default:
        return { width: 0 };
    }
  };

  return (
    <ProgressWrapper
      width={width}
      paused={paused}
      storyProgressWrapperStyles={storyProgressWrapperStyles}
    >
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
          ...storyProgressStyles,
          ...getProgressStyle({ active }),
        }}
      />
    </ProgressWrapper>
  );
};
