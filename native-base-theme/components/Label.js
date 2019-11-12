import theme from "../../styles/theme.style";

// @flow

export default () => {
  const labelTheme = {
    '.focused': {
      width: 0
    },
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontFamily: theme.FONT_FAMILY_SEMIBOLD
  };

  return labelTheme;
};
