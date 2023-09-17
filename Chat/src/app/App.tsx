import React, { useEffect, useState } from 'react';
import { createThread } from './utils/createThread';
import { UserToken, getToken } from './utils/getToken';
import { getEndpointUrl } from './utils/getEndpointUrl';
import {
  CallAndChatLocator,
  CallWithChatAdapter,
  createAzureCommunicationCallWithChatAdapter
} from '@azure/communication-react';
import { TeamsMeetingLinkLocator } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { joinThread } from './utils/joinThread';
import { getExistingMeetingLinkFromURL, getExistingThreadIdFromURL } from './utils/getParametersFromURL';
import CallScreen from './CallScreen';
import ErrorScreen from './ErrorScreen';
import LoadingScreen from './LoadingScreen';
import ConfigurationScreen from './ConfigurationScreen';

enum AppState {
  CONFIG,
  LOADING,
  CALL,
  ERROR
}

export default (): JSX.Element => {
  const spinnerLabel = 'Getting ready';

  const [displayState, setDisplayState] = useState<AppState>(AppState.CONFIG);
  const [adapter, setAdapter] = useState<CallWithChatAdapter>();
  const [meetingUrl, setMeetingUrl] = useState('');
  const [name, setName] = useState('');
  const [threadId, setThreadId] = useState('');
  const [invitationUrl, setInvitationUrl] = useState('');

  useEffect(() => {
    const thread = getExistingThreadIdFromURL();
    const meetingLink = getExistingMeetingLinkFromURL();

    if (!!thread) {
      setThreadId(thread);
    }
    if (!!meetingLink) {
      setMeetingUrl(meetingLink);
    }
  }, []);

  const getOrCreateThread = async (): Promise<string> => {
    const existingThread = getExistingThreadIdFromURL();
    return !existingThread ? await createThread() : existingThread;
  };

  const onCreateOrJoinCall = async (): Promise<void> => {
    setDisplayState(AppState.LOADING);
    try {
      const [thread, token, endpointUrl] = await Promise.all([getOrCreateThread(), getToken(), getEndpointUrl()]);
      const locator = { callLocator: { groupId: thread as string }, chatThreadId: thread };
      const adpt = await generateAdapter(token, endpointUrl, locator);
      const success = await joinThread(thread, token.user.communicationUserId, name);

      if (!success || !thread || !token || !endpointUrl) {
        throw new Error(`FAIL TO JOIN CALL With threadId =${thread}`);
      }

      setAdapter(adpt);
      setThreadId(thread);
      setInvitationUrl(`${window.location.origin}?thread=${thread}`);
      setDisplayState(AppState.CALL);
    } catch (error) {
      console.error('ERROR: ', error);
      setDisplayState(AppState.ERROR);
    }
  };

  const onJoinTeamsMeeting = async (): Promise<void> => {
    setDisplayState(AppState.LOADING);
    try {
      const [token, endpointUrl] = await Promise.all([getToken(), getEndpointUrl()]);
      const locator = { meetingLink: meetingUrl };
      const adpt = await generateAdapter(token, endpointUrl, locator);
      if (!token || !endpointUrl) {
        throw new Error(`FAIL TO JOIN TEAMS MEETING With url =${meetingUrl}`);
      }
      setAdapter(adpt);
      setInvitationUrl(`${window.location.origin}?meeting=${meetingUrl}`);
      setDisplayState(AppState.CALL);
    } catch (error) {
      console.error('ERROR: ', error);
      setDisplayState(AppState.ERROR);
    }
  };

  const generateAdapter = async (
    tkn: UserToken,
    endpointUrl: string,
    locator: CallAndChatLocator | TeamsMeetingLinkLocator
  ) => {
    const adpt: CallWithChatAdapter = await createAzureCommunicationCallWithChatAdapter({
      userId: tkn.user,
      displayName: name,
      credential: new AzureCommunicationTokenCredential(tkn.token),
      locator: locator,
      endpoint: endpointUrl
    });
    return adpt;
  };

  const screenComponent = (): JSX.Element => {
    switch (displayState) {
      case AppState.LOADING:
        return <LoadingScreen spinnerLabel={spinnerLabel} />;
      case AppState.CONFIG:
        return (
          <ConfigurationScreen
            threadId={threadId}
            name={name}
            setName={setName}
            meetingUrl={meetingUrl}
            setMeetingUrl={setMeetingUrl}
            createOrJoinCallClicked={onCreateOrJoinCall}
            joinTeamsMeetingClicked={onJoinTeamsMeeting}
          />
        );
      case AppState.CALL:
        return <CallScreen adapter={adapter as CallWithChatAdapter} invitationUrl={invitationUrl} />;
      default:
        return <ErrorScreen />;
    }
  };

  return screenComponent();
};
