import React from 'react';
import { storiesOf } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import DirectionProvider, { DIRECTIONS } from 'react-with-direction/dist/DirectionProvider';

import {
  VERTICAL_ORIENTATION,
  ANCHOR_RIGHT,
} from '../src/constants';

import SingleDatePickerWrapper from '../examples/SingleDatePickerWrapper';

const TestInput = props => (
  <div style={{ marginTop: 16 }}>
    <input
      {...props}
      type="text"
      style={{
        height: 48,
        width: 284,
        fontSize: 18,
        fontWeight: 200,
        padding: '12px 16px',
      }}
    />
  </div>
);

storiesOf('SingleDatePicker (SDP)', module)
  .add('default', withInfo()(() => (
    <SingleDatePickerWrapper />
  )))
  .add('as part of a form', withInfo()(() => (
    <div>
      <SingleDatePickerWrapper />
      <TestInput placeholder="Input 1" />
      <TestInput placeholder="Input 2" />
      <TestInput placeholder="Input 3" />
    </div>
  )))
  .add('non-english locale (Chinese)', withInfo()(() => (
    <SingleDatePickerWrapper
      placeholder="入住日期"
      monthFormat="yyyy[年]MMMM"
      phrases={{
        closeDatePicker: '关闭',
        clearDate: '清除日期',
      }}
      locale="zh-CN"
    />
  )))
  .add('non-english locale (Brazilian Portuguese)', withInfo()(() => (
    <SingleDatePickerWrapper
      placeholder="Data"
      monthFormat="MMMM yyyy"
      locale="pt-BR"
    />
  )))
  .add('with DirectionProvider', withInfo()(() => (
    <DirectionProvider direction={DIRECTIONS.RTL}>
      <SingleDatePickerWrapper
        placeholder="تاریخ شروع"
        anchorDirection={ANCHOR_RIGHT}
        showDefaultInputIcon
        showClearDate
        isRTL
      />
    </DirectionProvider>
  )))
  .add('vertical with custom height', withInfo()(() => (
    <SingleDatePickerWrapper
      orientation={VERTICAL_ORIENTATION}
      verticalHeight={568}
    />
  )));
