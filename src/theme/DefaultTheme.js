const core = {
  white: '#fff',
  gray: '#565a5c',
  grayLight: '#82888a',
  grayLighter: '#cacccd',
  grayLightest: '#f2f2f2',

  borderMedium: '#c4c4c4',
  border: '#dbdbdb',
  borderLight: '#e4e7e7',
  borderLighter: '#eceeee',

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
  color: {
    zIndex: 0,
    core,

    background: core.white,
    backgroundDark: '#f2f2f2',
    text: core.gray,
    placeholderText: '#757575',

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
      borderColor: core.borderLighter,
      color: core.grayLighter,
      color_active: core.grayLighter,
      color_hover: core.grayLighter,
    },

    hoveredSpan: {
      backgroundColor: core.primaryShade_4,
      backgroundColor_active: core.primaryShade_3,
      backgroundColor_hover: core.primaryShade_3,
      borderColor: core.primaryShade_3,
      borderColor_active: core.primaryShade_3,
      borderColor_hover: core.primaryShade_3,
      color: core.secondary,
      color_active: core.secondary,
      color_hover: core.secondary,
    },

    selectedSpan: {
      backgroundColor: core.primaryShade_2,
      backgroundColor_active: core.primaryShade_1,
      backgroundColor_hover: core.primaryShade_1,
      borderColor: core.primaryShade_1,
      borderColor_active: core.primary,
      borderColor_hover: core.primary,
      color: core.white,
      color_active: core.white,
      color_hover: core.white,
    },

    selected: {
      backgroundColor: core.primary,
      backgroundColor_active: core.primary,
      backgroundColor_hover: core.primary,
      borderColor: core.primary,
      borderColor_active: core.primary,
      borderColor_hover: core.primary,
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
};
