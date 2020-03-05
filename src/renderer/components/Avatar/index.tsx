import React, { FC, CSSProperties } from 'react';
import { handleSize, SizeType, accordType } from '@/utils';

interface AvatarProps {
  src: string | null;
  size?: SizeType;
  fallback?: string;
}

const Avatar: FC<AvatarProps> = function(props) {
  const { src, size, fallback, ...rest } = props;

  const fallbackStyle: CSSProperties = {
    backgroundImage: `url(${fallback})`,
    backgroundSize: '50%'
  };

  const srcStyle: CSSProperties = {
    backgroundImage: `url(${src})`
  };

  return (
    <div
      {...rest}
      className="img-preview"
      style={Object.assign(
        {
          backgroundColor: 'var(--gl)',
          backgroundSize: 'cover',
          backgroundPosition: '50%',
          backgroundRepeat: 'no-repeat',
          ...accordType(handleSize(size), 'Object', {})
        },
        src ? srcStyle : fallbackStyle
      )}
    />
  );
};

export default Avatar;
