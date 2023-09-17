import { DefaultButton, Stack, Text } from '@fluentui/react';
import React from 'react';
import {
  buttonStyle,
  buttonWithIconStyles,
  errorChatContainerStyle,
  errorChatTitleStyle,
  infoContainerStackTokens
} from './styles/Common.styles';

interface ErrorScreenProps {}

export default (props: ErrorScreenProps): JSX.Element => {
  const goHomeLabel = 'Go to homepage';
  const errorLabel = 'Oops, sometimes bad happens!';

  return (
    <Stack
      horizontal
      wrap
      horizontalAlign="center"
      verticalAlign="center"
      tokens={infoContainerStackTokens}
      className={errorChatContainerStyle}
    >
      <Stack tokens={infoContainerStackTokens}>
        <Text role={'heading'} aria-level={1} className={errorChatTitleStyle}>
          {errorLabel}
        </Text>
        <Stack>
          <DefaultButton
            className={buttonStyle}
            styles={buttonWithIconStyles}
            text={goHomeLabel}
            onClick={() => (window.location.href = window.location.origin)}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};
