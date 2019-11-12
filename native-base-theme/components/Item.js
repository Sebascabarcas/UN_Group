// @flow

import { Platform } from 'react-native';

import variable from './../variables/platform';
import theme from './../../styles/theme.style.js';
import { PLATFORM } from './../variables/commonColor';

export default (variables /* : * */ = variable) => {
  const itemTheme = {
    '.floatingLabel': {
      'NativeBase.Input': {
        height: 50,
        top: 8,
        paddingTop: 3,
        paddingBottom: 1,
        '.multiline': {
          minHeight: variables.inputHeightBase,
          paddingTop: Platform.OS === PLATFORM.IOS ? 10 : 3,
          paddingBottom: Platform.OS === PLATFORM.IOS ? 14 : 10
        }
      },
      'NativeBase.Label': {
        paddingTop: 8
      },
      'NativeBase.Icon': {
        top: 6,
        paddingTop: 8
      },
      'NativeBase.IconNB': {
        top: 6,
        paddingTop: 8
      }
    },
    '.fixedLabel': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        flex: 1,
        height: null,
        width: null,
        fontSize: variables.inputFontSize
      },
      'NativeBase.Input': {
        flex: 2,
        fontSize: variables.inputFontSize
      }
    },
    '.stackedLabel': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        paddingTop: 5,
        alignSelf: 'flex-start',
        color: theme.GRAY_COLOR2,
        fontSize: variables.inputFontSize - 2
      },
      'NativeBase.Icon': {
        marginTop: 36
      },
      'NativeBase.Input': {
        alignSelf: Platform.OS === PLATFORM.IOS ? 'stretch' : 'flex-start',
        flex: 1,
        width: Platform.OS === PLATFORM.IOS ? null : variables.deviceWidth - 25,
        fontSize: variables.inputFontSize,
        lineHeight: variables.inputLineHeight - 6,
        '.secureTextEntry': {
          fontSize: variables.inputFontSize - 4
        },
        '.multiline': {
          paddingTop: Platform.OS === PLATFORM.IOS ? 9 : undefined,
          paddingBottom: Platform.OS === PLATFORM.IOS ? 9 : undefined
        }
      },
      flexDirection: null,
      minHeight: variables.inputHeightBase + 15,
      borderColor: theme.GRAY_COLOR2
    },
    '.stackedLabelRoundedInput': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        paddingTop: 5,
        marginBottom: 5,
        alignSelf: 'flex-start',
        fontFamily: theme.FONT_FAMILY_SEMIBOLD,
        fontSize: variables.inputFontSize - 2
      },
      'NativeBase.Icon': {
        marginTop: 36
      },
      'NativeBase.Input': {
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#EFEFF4',
        alignSelf: Platform.OS === PLATFORM.IOS ? 'stretch' : 'flex-start',
        flex: 1,
        width: Platform.OS === PLATFORM.IOS ? null : variables.deviceWidth - 25,
        fontFamily: theme.FONT_FAMILY_SEMIBOLD,
        fontSize: variables.inputFontSize,
        paddingVertical: 10,
        paddingLeft: 10,
        // lineHeight: variables.inputLineHeight - 6,
        '.secureTextEntry': {
          fontSize: variables.inputFontSize - 4
        },
        '.multiline': {
          paddingTop: Platform.OS === PLATFORM.IOS ? 9 : undefined,
          paddingBottom: Platform.OS === PLATFORM.IOS ? 9 : undefined
        }
      },
      flexDirection: null,
      minHeight: variables.inputHeightBase + 40,
      marginVertical: 5,
      borderRadius: 0,
      borderBottomWidth: 0
    },
    '.inlineLabel': {
      'NativeBase.Label': {
        position: null,
        top: null,
        left: null,
        right: null,
        paddingRight: 20,
        height: null,
        width: null,
        fontSize: variables.inputFontSize
      },
      'NativeBase.Input': {
        paddingLeft: 5,
        fontSize: variables.inputFontSize
      },
      flexDirection: 'row'
    },
    'NativeBase.Label': {
      fontSize: variables.inputFontSize,
      color: variables.inputColorPlaceholder,
      paddingRight: 5
    },
    'NativeBase.Icon': {
      fontSize: 24,
      paddingRight: 8
    },
    'NativeBase.IconNB': {
      fontSize: 24,
      paddingRight: 8
    },
    'NativeBase.Input': {
      '.multiline': {
        height: null
      },
      height: variables.inputHeightBase,
      color: variables.inputColor,
      flex: 1,
      top: Platform.OS === PLATFORM.IOS ? 1.5 : undefined,
      fontSize: variables.inputFontSize
    },
    '.underline': {
      'NativeBase.Input': {
        paddingLeft: 15
      },
      '.success': {
        borderColor: variables.inputSuccessBorderColor
      },
      '.white': {
        borderColor: variables.inputWhiteBorderColor
      },
      '.gray': {
        borderColor: variables.inputGrayBorderColor
      },
      '.error': {
        borderColor: variables.inputErrorBorderColor
      },
      borderWidth: variables.borderWidth * 2,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: variables.inputBorderColor
    },
    '.thick': {
      '.success': {
        borderColor: variables.inputSuccessBorderColor
      },
      '.white': {
        borderColor: variables.inputWhiteBorderColor
      },
      '.gray': {
        borderColor: variables.inputGrayBorderColor
      },
      '.error': {
        borderColor: variables.inputErrorBorderColor
      },
      borderWidth: variables.borderWidth * 5,
      borderTopWidth: 0,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: variables.inputBorderColor
    },
    '.regular': {
      'NativeBase.Input': {
        paddingLeft: 8
      },
      'NativeBase.Icon': {
        paddingLeft: 10
      },
      '.success': {
        borderColor: variables.inputSuccessBorderColor
      },
      '.white': {
        borderColor: variables.inputWhiteBorderColor
      },
      '.gray': {
        borderColor: variables.inputGrayBorderColor
      },
      '.error': {
        borderColor: variables.inputErrorBorderColor
      },
      borderWidth: variables.borderWidth * 2,
      borderColor: variables.inputBorderColor
    },
    '.rounded': {
      'NativeBase.Label': {
        fontSize: variables.inputFontSize,
        color: variables.inputGrayPlaceholderColor,
        paddingRight: 5
      },
      'NativeBase.Input': {
        paddingLeft: 8
      },
      'NativeBase.Icon': {
        paddingLeft: 10
      },
      '.success': {
        borderColor: variables.inputSuccessBorderColor
      },
      '.white': {
        borderColor: variables.inputWhiteBorderColor
      },
      '.gray': {
        borderColor: variables.inputGrayBorderColor
      },
      '.error': {
        borderColor: variables.inputErrorBorderColor
      },
      borderWidth: variables.borderWidth * 2,
      borderRadius: 30,
      borderColor: variables.inputBorderColor
    },

    '.white': {
      'NativeBase.Label': {
        fontSize: variables.inputFontSize,
        color: variables.inputWhiteBorderColor,
        paddingRight: 5
      },
      'NativeBase.Input': {
        color: variables.inputWhiteBorderColor
      },
      'NativeBase.Icon': {
        color: variables.inputWhiteBorderColor
      },
      'NativeBase.IconNB': {
        color: variables.inputWhiteBorderColor
      },
      '.rounded': {
        borderRadius: 30,
        borderColor: variables.inputWhiteBorderColor
      },
      '.regular': {
        borderColor: variables.inputWhiteBorderColor
      },
      '.underline': {
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: variables.inputWhiteBorderColor
      },
      borderColor: variables.inputWhiteBorderColor
    },

    '.gray': {
      'NativeBase.Input': {
        color: variables.inputBlackTextColor
      },
      'NativeBase.Icon': {
        color: variables.inputGrayBorderColor
      },
      'NativeBase.IconNB': {
        color: variables.inputGrayBorderColor
      },
      '.rounded': {
        borderRadius: 30,
        borderColor: variables.inputGrayBorderColor
      },
      '.regular': {
        borderColor: variables.inputGrayBorderColor
      },
      '.underline': {
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: variables.inputGrayBorderColor
      },
      borderColor: variables.inputGrayBorderColor
    },

    '.success': {
      'NativeBase.Icon': {
        color: variables.inputSuccessBorderColor
      },
      'NativeBase.IconNB': {
        color: variables.inputSuccessBorderColor
      },
      '.rounded': {
        borderRadius: 30,
        borderColor: variables.inputSuccessBorderColor
      },
      '.regular': {
        borderColor: variables.inputSuccessBorderColor
      },
      '.underline': {
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: variables.inputSuccessBorderColor
      },
      borderColor: variables.inputSuccessBorderColor
    },

    '.error': {
      'NativeBase.Icon': {
        color: variables.inputErrorBorderColor
      },
      'NativeBase.IconNB': {
        color: variables.inputErrorBorderColor
      },
      '.rounded': {
        borderRadius: 30,
        borderColor: variables.inputErrorBorderColor
      },
      '.regular': {
        borderColor: variables.inputErrorBorderColor
      },
      '.underline': {
        borderWidth: variables.borderWidth * 2,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: variables.inputErrorBorderColor
      },
      borderColor: variables.inputErrorBorderColor
    },
    '.disabled': {
      'NativeBase.Icon': {
        color: '#384850'
      },
      'NativeBase.IconNB': {
        color: '#384850'
      }
    },
    '.picker': {
      marginLeft: 0
    },

    borderWidth: variables.borderWidth * 2,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderColor: variables.inputBorderColor,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 2
  };

  return itemTheme;
};
