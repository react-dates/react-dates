import { withInfo } from '@storybook/addon-info';

import { isHappoRun } from 'happo-plugin-storybook/register';

// In the happo run, we don't want the extra info as it adds unnecessary noise
// to screenshots.
export default isHappoRun() ? () => c => c : withInfo;
