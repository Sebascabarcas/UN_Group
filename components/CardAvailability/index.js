import React, {useEffect, useState, useRef} from 'react';
import BigIconItem from '../BigIconItem';
import {AntDesign} from '@expo/vector-icons';
import theme from '../../styles/theme.style';
import {Button} from 'native-base';

const CardAvailability = ({
  weekDay,
  hourRange,
  canDelete,
  onPress,
  touchContainerStyles,
}) => (
  <BigIconItem
    touchContainerStyles={touchContainerStyles}
    leftContainerStyles={{backgroundColor: theme.ACTIVITY_CARD_ICON_COLOR}}
    leftItem={
      <Button transparent>
        <AntDesign
          name="clockcircleo"
          color="white"
          size={theme.ICON_SIZE_MEDIUM}
        />
      </Button>
    }
    primaryText={weekDay}
    secondaryText={hourRange}
    rightContainerStyles={
      canDelete && {
        backgroundColor: theme.DANGER_COLOR,
        height: '100%',
        alignItems: 'center',
        paddingRight: 10,
        padding: 10,
        borderRadius: 20,
      }
    }
    rightItem={
      canDelete &&
        <Button transparent onPress={onPress}>
          <AntDesign
            name="delete"
            color="white"
            size={theme.ICON_SIZE_MEDIUM}
          />
        </Button>
    }
  />
);

export default CardAvailability;
