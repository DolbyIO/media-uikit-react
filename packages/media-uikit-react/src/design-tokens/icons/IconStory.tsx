import { IconGallery, IconItem } from '@storybook/addon-docs';
import { Icon, Icons } from '../../components/core';

export const IconStory = ({ iconModule }: { iconModule: any }) => {
  return (
    <IconGallery>
      {Object.keys(iconModule).map((iconKey: any, index) => {
        return (
          <IconItem name={iconKey} key={index}>
            <Icon icon={Icons[iconKey] as any} style={{ width: 24, height: 24 }} />
          </IconItem>
        );
      })}
    </IconGallery>
  );
};
