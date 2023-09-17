import { Spinner, SpinnerSize } from '@fluentui/react';
import React from 'react';
import { loadingLabelStyles } from './styles/Common.styles';

interface LoadingScreenProps {
  spinnerLabel: string;
}

export default (props: LoadingScreenProps): JSX.Element => {
  const { spinnerLabel } = props;
  return (
    <Spinner
      label={spinnerLabel}
      size={SpinnerSize.large}
      labelPosition="bottom"
      styles={{ label: loadingLabelStyles }}
    />
  );
};
