import React from 'react';
import {useDispatch} from 'react-redux';
import styles from './styles.js';
import {View, Image} from 'react-native';
import MyText from '../MyText';
import Images from '../../constants/Images.js';
import { Icon } from 'native-base';
import themeStyle from '../../styles/theme.style.js';

const Header = ({
    type = 'BottomBordered',
    headerColor = themeStyle.PRIMARY_COLOR,
    extraPadding = false,
    leftGoBack,
    middleElement,
    rightGoBack,
    rightElement,
    deleteButton,
    editButton,
    primaryText,
    primaryTextColor = null,
    secondaryText,
    secondaryTextColor = null,
    handleOnDelete,
    handleOnEdit,
    // goBack,
    // dispatch,
    children
  }) => {

    const {navigate, goBack} = useNavigation ();
    const dispatch = useDispatch ();
  
    return (
      <View style={[styles.headerContainer, styles[`headerContainer${type}`], {backgroundColor: headerColor}, extraPadding && styles.headerExtraPadding]}>
        <View style={styles.headerInnerContainer}>
          { leftGoBack && <View>
            <Button
              style={{marginLeft: 6}}
              transparent
              onPress={() => goBack ()}
            >
              <Icon
                type="Ionicons"
                name="ios-arrow-back"
                style={{
                  color: theme.PRIMARY_COLOR,
                  fontSize: theme.ICON_SIZE_SMALL,
                }}
              />
            </Button>
          </View> }
          <View style={styles.headerInfoContainer}>
            {hasPicture && <Image
              resizeMode="cover"
              style={styles.infoImage}
              source={
                picture
                  ? {uri: `${picture}`}
                  : Images['no-profile-photo']
              }
            />}
            {middleElement && {middleElement}}
            <View>
              <MyText style={[styles.primaryText, {color: primaryTextColor}]} fontStyle="bold">
                {primaryText}
              </MyText>
              <MyText
                style={[styles.secondaryText, {color: secondaryTextColor}]}
                fontStyle="semibold"
              >
                {secondaryText}
              </MyText>
            </View>
          </View>
          { deleteButton && <View>
            <Button
              style={{marginRight: 6}}
              transparent
              onPress={() => {
                dispatch ({
                  type: 'modals/SET_STATE',
                  payload: {
                    confirmModalVisible: true,
                    handleOnDelete,
                  },
                });
              }}
            >
              <Icon
                type="Ionicons"
                name="ios-trash"
                style={{color: theme.DANGER_COLOR, size: theme.ICON_SIZE_MEDIUM}}
              />
            </Button>
          </View>}
          { editButton && <View>
            <Button
            // block
            style={{marginRight: 6}}
            iconLeft
            transparent
            onPress={handleOnEdit}
            >
                <Icon
                type="Ionicons"
                name="ios-create"
                style={{color: theme.PRIMARY_COLOR, size: theme.ICON_SIZE_SMALL}}
                />
            </Button>
          </View>}
          {rightGoBack && <View>
            <Button onPress={() => goBack()} light rounded>
                <Icon
                  type="AntDesign"
                  name="arrowup"
                  fontSize={theme.ICON_SIZE_SMALL}
                  style={{color: '#000'}}
                />
            </Button>
          </View>}
          {rightElement && {rightElement}}
        </View>
        {children}
      </View>
    );
  };

  
export default Header;
