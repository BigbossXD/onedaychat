import { gql } from "@apollo/client";

export const FETCH_LAST_MESSAGE = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      userId
      text
      messageId
      datetime
    }
  }
`;

export const FETCH_MORE_MESSAGE = gql`
  query fetchMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      userId
      text
      messageId
      datetime
    }
  }
`;

export const POST_MESSAGE = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      userId
      text
      messageId
      datetime
    }
  }
`;
