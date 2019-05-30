const core = {
  white: 'var(--color-p1-2)',
  gray: '#484848',
  grayLight: '#82888a',
  grayLighter: '#cacccd',
  grayLightest: '#f2f2f2',

  borderMedium: '#c4c4c4',
  border: 'var(--color-p1-5)',
  borderLight: 'var(--color-p1-5)',
  borderLighter: '#eceeee',
  borderBright: '#f4f5f5',

  blue_2: 'var(--color-p3-2)',
  blue_3: 'var(--color-p3-3)',
  blue_4: 'var(--color-p3-4)',
  blue_5: 'var(--color-p3-5)',
  blue_6: 'var(--color-p3-6)',
  blue_8: 'var(--color-p3-8)',

  gray_5: 'var(--color-p1-5)',
  gray_6: 'var(--color-p1-6)',
  gray_10: 'var(--color-p1-10)',

  primary: '#00a699',
  primaryShade_1: '#33dacd',
  primaryShade_2: '#66e2da',
  primaryShade_3: '#80e8e0',
  primaryShade_4: '#b2f1ec',
  primary_dark: '#008489',

  secondary: '#007a87',

  yellow: '#ffe8bc',
  yellow_dark: '#ffce71',
};

export default {
  reactDates: {
    zIndex: 0,
    border: {
      input: {
        border: 0,
        borderTop: 0,
        borderRight: 0,
        borderLeft: 0,
        outlineFocused: 0,
        borderFocused: 0,
        borderTopFocused: 0,
        borderLeftFocused: 0,
        borderRightFocused: 0,
        borderRadius: 0,
      },
      pickerInput: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 3,
      },
    },

    color: {
      core,
      disabled: core.grayLightest,
      background: core.white,
      backgroundDark: '#f2f2f2',
      backgroundFocused: core.white,
      border: 'rgb(219, 219, 219)',
      text: core.gray_10,
      textDisabled: core.border,
      textFocused: '#007a87',
      placeholderText: '#757575',

      outside: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        color: core.gray_5,
        color_active: core.gray_5,
        color_hover: core.gray_5,
      },

      highlighted: {
        backgroundColor: core.blue_3,
        backgroundColor_active: core.blue_3,
        backgroundColor_hover: core.blue_3,
        color: core.gray_10,
        color_active: core.gray_10,
        color_hover: core.gray_10,
      },

      minimumNights: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLighter,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
      },

      hoveredSpan: {
        backgroundColor: core.blue_3,
        backgroundColor_active: core.blue_3,
        backgroundColor_hover: core.blue_3,
        borderColor: core.blue_5,
        borderColor_active: core.blue_5,
        borderColor_hover: core.blue_5,
        color: core.gray_10,
        color_active: core.gray_10,
        color_hover: core.blue_6,
      },

      selectedSpan: {
        backgroundColor: core.blue_2,
        backgroundColor_active: core.blue_2,
        backgroundColor_hover: core.blue_2,
        borderColor: core.blue_4,
        borderColor_active: core.blue_4,
        borderColor_hover: core.blue_4,
        color: core.blue_8,
        color_active: core.blue_8,
        color_hover: core.blue_8,
      },

      selected: {
        backgroundColor: core.blue_6,
        backgroundColor_active: core.blue_6,
        backgroundColor_hover: core.blue_6,
        borderColor: core.blue_6,
        borderColor_active: core.blue_6,
        borderColor_hover: core.blue_6,
        color: core.white,
        color_active: core.white,
        color_hover: core.white,
      },

      blocked_calendar: {
        backgroundColor: core.grayLighter,
        backgroundColor_active: core.grayLighter,
        backgroundColor_hover: core.grayLighter,
        borderColor: core.grayLighter,
        borderColor_active: core.grayLighter,
        borderColor_hover: core.grayLighter,
        color: core.grayLight,
        color_active: core.grayLight,
        color_hover: core.grayLight,
      },

      blocked_out_of_range: {
        backgroundColor: core.white,
        backgroundColor_active: core.white,
        backgroundColor_hover: core.white,
        borderColor: core.borderLight,
        borderColor_active: core.borderLight,
        borderColor_hover: core.borderLight,
        color: core.grayLighter,
        color_active: core.grayLighter,
        color_hover: core.grayLighter,
      },
    },

    spacing: {
      dayPickerHorizontalPadding: 9,
      captionPaddingTop: 22,
      captionPaddingBottom: 43,
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

    noScrollBarOnVerticalScrollable: false,

    font: {
      size: 12,
      captionSize: 16,
      family: 'var(--marketing-font-family)',
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
