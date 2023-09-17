import { Icon, PrimaryButton, Stack, Text } from '@fluentui/react';
import React, { useEffect, useState } from 'react';
import {
  buttonStyle,
  buttonWithIconStyles,
  configContainerStackTokens,
  configContainerStyle,
  containerStyle,
  containerTokens,
  elevatedCardContainerStyle,
  headerStyle,
  infoContainerStackTokens,
  infoContainerStyle,
  videoCameraIconStyle
} from './styles/Common.styles';
import { InputField } from './InputField';

interface CardLabels {
  headerTitle: string;
  buttonText: string;
}

interface InputFieldLabels {
  label: string;
  placeholder: string;
  errorMessage: string;
}
interface ConfigurationScreenProps {
  threadId: string;
  name: string;
  meetingUrl: string;
  setName: (name: string) => void;
  setMeetingUrl: (meetingUrl: string) => void;
  createOrJoinCallClicked: () => void;
  joinTeamsMeetingClicked: () => void;
}

export default (props: ConfigurationScreenProps): JSX.Element => {
  const { threadId, name, setName, meetingUrl, setMeetingUrl, createOrJoinCallClicked, joinTeamsMeetingClicked } =
    props;
  const startCallLabels: CardLabels = {
    headerTitle: 'Create a Call',
    buttonText: 'Create'
  };
  const joinCallLabels: CardLabels = {
    headerTitle: 'Join the Call',
    buttonText: 'Join'
  };

  const JoinTeamsMeetingLabels: CardLabels = {
    headerTitle: 'Join a Teams meeting',
    buttonText: 'Join'
  };

  const displayNameInputFieldLabels: InputFieldLabels = {
    label: 'Display Name',
    placeholder: 'Enter your name',
    errorMessage: 'Name cannot be empty'
  };

  const meetingUrlInputFieldLabels: InputFieldLabels = {
    label: 'Meeting Url',
    placeholder: 'Enter a Meeting Url',
    errorMessage: 'Meeting Url cannot be empty'
  };

  const [callLabels, setCallLabels] = useState<CardLabels>(!!threadId ? joinCallLabels : startCallLabels);

  useEffect(() => {
    !!threadId ? setCallLabels(joinCallLabels) : setCallLabels(startCallLabels);
  }, [threadId]);

  return (
    <Stack tokens={{ childrenGap: 20 }}>
      <Stack.Item grow disableShrink align="center" className={elevatedCardContainerStyle}>
        <Stack
          horizontal
          wrap
          horizontalAlign="center"
          verticalAlign="center"
          tokens={containerTokens}
          className={containerStyle}
        >
          <Stack className={infoContainerStyle} tokens={infoContainerStackTokens}>
            <Text role={'heading'} aria-level={1} className={headerStyle}>
              {callLabels.headerTitle}
            </Text>
            <Stack className={configContainerStyle} tokens={configContainerStackTokens}>
              <InputField
                setValue={setName}
                value={name}
                label={displayNameInputFieldLabels.label}
                placeholder={displayNameInputFieldLabels.placeholder}
                errorMessage={displayNameInputFieldLabels.errorMessage}
                required={true}
              />

              <PrimaryButton
                id="startChat"
                aria-label="Start chat"
                text={callLabels.buttonText}
                className={buttonStyle}
                styles={buttonWithIconStyles}
                onClick={() => {
                  createOrJoinCallClicked();
                }}
                onRenderIcon={() => <Icon iconName="Headset" className={videoCameraIconStyle} />}
                disabled={!name}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack.Item>
      <Stack.Item grow disableShrink align="center" className={elevatedCardContainerStyle}>
        <Stack
          horizontal
          wrap
          horizontalAlign="center"
          verticalAlign="center"
          tokens={containerTokens}
          className={containerStyle}
        >
          <Stack className={infoContainerStyle} tokens={infoContainerStackTokens}>
            <Text role={'heading'} aria-level={1} className={headerStyle}>
              {JoinTeamsMeetingLabels.headerTitle}
            </Text>
            <Stack className={configContainerStyle} tokens={configContainerStackTokens}>
              <InputField
                setValue={setName}
                value={name}
                label={displayNameInputFieldLabels.label}
                placeholder={displayNameInputFieldLabels.placeholder}
                errorMessage={displayNameInputFieldLabels.errorMessage}
                required={true}
              />

              <InputField
                setValue={setMeetingUrl}
                value={meetingUrl}
                label={meetingUrlInputFieldLabels.label}
                placeholder={meetingUrlInputFieldLabels.placeholder}
                errorMessage={meetingUrlInputFieldLabels.errorMessage}
                required={true}
              />
              <PrimaryButton
                id="joinChat"
                aria-label="Join teams meeting"
                text={JoinTeamsMeetingLabels.buttonText}
                className={buttonStyle}
                styles={buttonWithIconStyles}
                onClick={() => {
                  joinTeamsMeetingClicked();
                }}
                onRenderIcon={() => <Icon iconName="TeamsLogo16" className={videoCameraIconStyle} />}
                disabled={!meetingUrl || !name}
              />
            </Stack>
          </Stack>
        </Stack>
      </Stack.Item>
    </Stack>
  );
};
