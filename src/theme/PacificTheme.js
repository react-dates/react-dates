const { colors } = require('./../styles/vars')

const core = {
  white: '#fff',
  gray: '#484848',
  grayLight: '#82888a',
  grayLighter: '#cacccd',
  grayLightest: '#f2f2f2',

  borderMedium: '#c4c4c4',
  border: 'transparent',
  borderLight: 'transparent',
  borderLighter: 'transparent',
  borderBright: 'transparent',

  primary: colors.colorLightningYellow,
  primaryShade_1: colors.colorLightningYellow,
  primaryShade_2: colors.colorLightningYellow,
  primaryShade_3: colors.colorA5,
  primaryShade_4: colors.colorA5,
  primary_dark: '#008489',
  transparent: 'transparent',

  secondary: '#007a87',

  yellow: '#ffe8bc',
  yellow_dark: '#ffce71',
  colorBlackPearl: colors.colorBlackPearl,
};

export default {
  reactDates: {
    zIndex: 0,
    border: {
      input: {
        border: 0,
        borderTop: 0,
        borderRight: 0,
        borderBottom: '2px solid transparent',
        borderLeft: 0,
        outlineFocused: 0,
        borderFocused: 0,
        borderTopFocused: 0,
        borderLeftFocused: 0,
        borderBottomFocused: `2px solid ${core.primary_dark}`,
        borderRightFocused: 0,
        borderRadius: 0,
      },
      pickerInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 2,
      },
    },

    color: {
      core,

      disabled: core.grayLightest,

      background: core.white,
      backgroundDark: '#f2f2f2',
      backgroundFocused: core.white,
      border: core.transparent,
      text: core.gray,
      caption: colors.colorBlackPearl,
      textDisabled: core.border,
      textFocused: '#007a87',
      placeholderText: '#757575',
      weekHeaderLi: colors.colorT3,
      calendarDay: colors.colorBlackPearl,

      outside: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray,
      },

      highlighted: {
        backgroundColor: core.yellow,
        backgroundColor_active: core.yellow_dark,
        backgroundColor_hover: core.yellow_dark,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray,
      },

      minimumNights: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.transparent,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
      },

      hoveredSpan: {
        backgroundColor: core.primaryShade_4,
        backgroundColor_active: core.primaryShade_3,
        backgroundColor_hover: core.primaryShade_4,
        borderColor: core.transparent,
        borderColor_active: core.transparent,
        borderColor_hover: core.transparent,
        color: core.gray,
        color_active: core.gray,
        color_hover: core.gray,
      },

      selectedSpan: {
        backgroundColor: core.primaryShade_2,
        backgroundColor_active: core.primaryShade_1,
        backgroundColor_hover: core.primaryShade_1,
        borderColor: core.transparent,
        borderColor_active: core.transparent,
        borderColor_hover: core.transparent,
        color: core.white,
        color_active: core.white,
        color_hover: core.white,
      },

      selected: {
        backgroundColor: core.primary,
        backgroundColor_active: core.primary,
        backgroundColor_hover: core.primary,
        borderColor: core.transparent,
        borderColor_active: core.transparent,
        borderColor_hover: core.transparent,
        color: core.white,
        color_active: core.white,
        color_hover: core.white,
      },

      blocked_calendar: {
        backgroundColor: core.grayLighter,
        backgroundColor_active: core.grayLighter,
        backgroundColor_hover: core.grayLighter,
        borderColor: core.transparent,
        borderColor_active: core.transparent,
        borderColor_hover: core.transparent,
        color: core.grayLight,
        color_active: core.grayLight,
        color_hover: core.grayLight,
      },

      blocked_out_of_range: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.transparent,
        borderColor_active: core.transparent,
        borderColor_hover: core.transparent,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
      },
    },

    spacing: {
      captionPaddingTop: 17,
      captionPaddingBottom: 37,
      inputPadding: 0,
      displayTextPaddingVertical: undefined,
      displayTextPaddingTop: 11,
      displayTextPaddingBottom: 9,
      displayTextPaddingHorizontal: undefined,
      displayTextPaddingLeft: 11,
      displayTextPaddingRight: 11,
      displayTextPaddingVertical_small: undefined,
      displayTextPaddingTop_small: 7,
      displayTextPaddingBottom_small: 5,
      displayTextPaddingHorizontal_small: undefined,
      displayTextPaddingLeft_small: 7,
      displayTextPaddingRight_small: 7,
    },

    sizing: {
      inputWidth: 130,
      inputWidth_small: 97,
      arrowWidth: 24,
    },

    font: {
      size: 9,
      captionSize: 13,
      captionFont: 'AvenirNextLTPro-Regular',
      weekHeaderLiFont: 'AvenirNextLTPro-Regular',
      calendarDayFont: 'AvenirNextLTPro-Regular',
      input: {
        size: 19,
        lineHeight: '24px',
        size_small: 15,
        lineHeight_small: '18px',
        letterSpacing_small: '0.2px',
        styleDisabled: 'italic',
      },
    },
  },
};
