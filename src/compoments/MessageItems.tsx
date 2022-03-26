import React, { FC } from "react";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { USERS } from "../config/app.config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faWarning } from "@fortawesome/free-solid-svg-icons";
import {
  ChatBoxLeft,
  ChatBoxRight,
  ChatBoxTimeStamp,
  ChatBoxMessage,
  ChatBoxUserInfo,
  ChatBoxUserName,
  TriangleRight,
  TriangleLeft,
  ChatBoxPassIcon,
  ChatBoxSentStatus,
  ChatBoxErrorIcon,
  ChatBoxPass,
  ChatBoxError,
} from "../styles/MessageItemStyle";

const FORMATTIME = "HH:mm";

interface Props {
  userId: string;
  userIdActive: string;
  text: string;
  messageId: string;
  datetime: string;
  status: string | null;
}

const MessageItems: FC<Props> = ({
  userId,
  userIdActive,
  text,
  messageId,
  datetime,
  status,
}) => {
  const getUserImage = (userId: String) => {
    const userInfo = USERS.find((user) => user.userId === userId);
    return userInfo?.avatar;
  };

  if (userId === userIdActive) {
    return (
      <ChatBoxRight>
        <ChatBoxTimeStamp>
          {moment(datetime).format(FORMATTIME)}
        </ChatBoxTimeStamp>
        {status !== "erorr" && (
          <ChatBoxPass>
            <ChatBoxPassIcon>
              <FontAwesomeIcon icon={faCheck} fontSize={10} color={"#fff"} />
            </ChatBoxPassIcon>
            <ChatBoxSentStatus>Sent</ChatBoxSentStatus>
          </ChatBoxPass>
        )}
        {status === "erorr" && (
          <ChatBoxError>
            <ChatBoxErrorIcon>
              <FontAwesomeIcon icon={faWarning} fontSize={10} color={"#fff"} />
            </ChatBoxErrorIcon>
            <ChatBoxSentStatus>Error</ChatBoxSentStatus>
          </ChatBoxError>
        )}
        <ChatBoxMessage>{text}</ChatBoxMessage>
        <TriangleRight />
        <ChatBoxUserInfo>
          <Image width={40} rounded src={getUserImage(userId)}></Image>
          <ChatBoxUserName>{userId}</ChatBoxUserName>
        </ChatBoxUserInfo>
      </ChatBoxRight>
    );
  }
  return (
    <ChatBoxLeft>
      <ChatBoxUserInfo>
        <Image width={40} rounded src={getUserImage(userId)}></Image>
        <ChatBoxUserName>{userId}</ChatBoxUserName>
      </ChatBoxUserInfo>
      <TriangleLeft />
      <ChatBoxMessage>{text}</ChatBoxMessage>
      <ChatBoxTimeStamp>{moment(datetime).format(FORMATTIME)}</ChatBoxTimeStamp>
    </ChatBoxLeft>
  );
};

export default MessageItems;
