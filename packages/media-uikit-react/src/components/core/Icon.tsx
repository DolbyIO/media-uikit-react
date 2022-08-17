import React, { useState } from 'react';

import { MediaIcons, SocialIcons } from '../../design-tokens/icons';

export const Icon = ({
  icon,
  style,
  isFocused = false,
  ...props
}: {
  icon: Icons | React.FunctionComponent;
  isFocused?: boolean;
  style?: React.CSSProperties & { hover?: React.CSSProperties; focus?: React.CSSProperties };
} & React.SVGProps<SVGSVGElement>) => {
  const [focus, setFocus] = useState(isFocused);
  const [hover, setHover] = useState(false);

  const IconComp: any = Object.values(Icons).includes(icon as Icons)
    ? IconMap[icon as Icons]
    : icon;

  const iconProps = {
    ...props,
    style: {
      color: 'black',
      cursor: 'pointer',
      ...style,
      ...(hover && style?.hover),
      ...(focus && style?.focus),
    },
    onMouseEnter: () => {
      setHover(true);
    },
    onMouseLeave: () => {
      setHover(false);
    },
    onClick: () => {
      setFocus(!focus);
    },
  };

  return <IconComp {...iconProps}></IconComp>;
};

export enum Icons {
  // Media player
  Play,
  Pause,
  Stop,
  Loop,
  Sound,
  Mute,
  // Vendors
  Amazon,
  Apple,
  Soundcloud,
  Spotify,
  Tidal,
  Youtube,
}

const IconMap = {
  [Icons.Play]: MediaIcons.Play,
  [Icons.Pause]: MediaIcons.Pause,
  [Icons.Stop]: MediaIcons.Stop,
  [Icons.Loop]: MediaIcons.Loop,
  [Icons.Mute]: MediaIcons.Mute,
  [Icons.Sound]: MediaIcons.Sound,
  [Icons.Amazon]: SocialIcons.Amazon,
  [Icons.Apple]: SocialIcons.Apple,
  [Icons.Soundcloud]: SocialIcons.Soundcloud,
  [Icons.Spotify]: SocialIcons.Spotify,
  [Icons.Tidal]: SocialIcons.Tidal,
  [Icons.Youtube]: SocialIcons.Youtube,
};

export default Icon;
