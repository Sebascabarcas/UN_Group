import React, {useEffect, useState, useRef} from 'react';
import BigIconItem from '../BigIconItem';
import {AntDesign} from '@expo/vector-icons';
import theme from '../../styles/theme.style';

const CardActivity = ({activityName, onPress, touchContainerStyles}) => (
  <BigIconItem
    touchContainerStyles={touchContainerStyles}
    onPress={onPress}
    leftContainerStyles={{backgroundColor: theme.ACTIVITY_CARD_ICON_COLOR}}
    leftItem={
        <AntDesign name="book" color="white" size={theme.ICON_SIZE_MEDIUM} />
    }
    primaryText={activityName}
    rightContainerStyles={{
        backgroundColor: theme.ACTIVITY_CARD_ICON_COLOR,
        height: '100%',
		alignItems: 'center',
		paddingRight: 10,
		padding: 10,
		borderRadius: 20,
    }}
    rightItem={
        <AntDesign name="eye" color="white" size={theme.ICON_SIZE_MEDIUM} />
    }
  />
);

export default CardActivity;
