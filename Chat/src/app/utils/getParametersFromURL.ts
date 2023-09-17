// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 *
 * The threadId of the current thread is extracted from the url
 * using URLsearchparams.
 *
 * @returns The current threadId as String
 *
 */

export const getExistingThreadIdFromURL = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const threadId = urlParams.get('thread');
  return threadId ?? '';
};

/**
 *
 * The meetingUrl of the current meeting is extracted from the url
 * using URLsearchparams.
 *
 * @returns The current meetingUrl as String
 *
 */
export const getExistingMeetingLinkFromURL = (): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const meeting = urlParams.get('meeting');
  return meeting ?? '';
};
