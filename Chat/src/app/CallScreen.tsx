import { CallWithChatAdapter, CallWithChatComposite } from '@azure/communication-react';
import React from 'react';

interface CallScreenProps {
  adapter: CallWithChatAdapter;
  invitationUrl: string;
}

export default (props: CallScreenProps): JSX.Element => {
  const { adapter, invitationUrl } = props;
  return <CallWithChatComposite adapter={adapter as CallWithChatAdapter} joinInvitationURL={invitationUrl} />;
};
