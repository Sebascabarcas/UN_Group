import React from 'react';
import {Text} from 'native-base';
import theme from '../../styles/theme.style';

export default function MyText (props) {
  const {fontStyle, style, color} = props;
  switch (fontStyle) {
    case 'light':
      return (
        <Text
          {...props}
          style={[style, color ? {fontFamily: theme.FONT_FAMILY_LIGHT, color} : {fontFamily: theme.FONT_FAMILY_LIGHT}]}
        />
      );
    case 'bold':
      return (
        <Text
          {...props}
          style={[style, color ? {fontFamily: theme.FONT_FAMILY_BOLD, color} : {fontFamily: theme.FONT_FAMILY_BOLD}]}
        />
      );
    case 'semibold':
      return (
        <Text
          {...props}
          style={[style, color ? {fontFamily: theme.FONT_FAMILY_SEMIBOLD, color} : {fontFamily: theme.FONT_FAMILY_SEMIBOLD}]}
        />
      );
    default:
      return (
        <Text
          {...props}
          style={[style, color ? {fontFamily: theme.FONT_FAMILY_REGULAR, color} : {fontFamily: theme.FONT_FAMILY_REGULAR}]}
        />
      );
  }
}
