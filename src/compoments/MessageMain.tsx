import React, {
  FC,
  ChangeEvent,
  MouseEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { Button, Form } from "react-bootstrap";
import MessageItems from "./MessageItems";
import { useMutation, gql } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { MessageListBox, MessageMainBox } from "../styles/MessageMainStyle";

const POST_MESSAGE = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      userId
      text
      messageId
      datetime
    }
  }
`;

interface Message {
  message: {
    userId: string;
    text: string;
    messageId: string;
    datetime: string;
    status: string | null;
  }[];
}

interface Props {
  channelSelected: string;
  userSelected: string;
  messageList: Message["message"];
  setMessageList: Dispatch<SetStateAction<any[]>>;
  setNewestMessageId: Dispatch<SetStateAction<string>>;
  manageGetMoreMessage: Function;
}

const MessageMain: FC<Props> = ({
  channelSelected,
  messageList,
  userSelected,
  setMessageList,
  manageGetMoreMessage,
  setNewestMessageId,
}) => {
  const divRef = useRef<any>(null);
  const [postMessage, { loading, error, data }] = useMutation(POST_MESSAGE);
  const [messageSending, setMessageSending] = useState<string>("");
  const [copyMessageSending, setCopyMessageSending] = useState<string>("");

  const goToButtom = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  };

  useEffect(() => {
    goToButtom();
  }, [messageList]);

  useEffect(() => {
    if (error) {
      errorMessageHandle();
    }
    if (data) {
      successMessageHandle(data);
    }
  }, [error, data]);

  const successMessageHandle = (data: any) => {
    let successMessage: object = {
      userId: data.postMessage.userId,
      text: data.postMessage.text,
      messageId: data.postMessage.messageId,
      datetime: data.postMessage.datetime,
      status: "success",
    };
    setMessageList([...messageList, successMessage]);
    setNewestMessageId(data.postMessage.messageId);
    setMessageSending("");
    setCopyMessageSending("");
  };
  const errorMessageHandle = () => {
    let errorMessage: object = {
      userId: userSelected,
      text: copyMessageSending,
      messageId: "erorr_" + Math.random().toString(),
      datetime: new Date(),
      status: "erorr",
    };
    setMessageList([...messageList, errorMessage]);
    setMessageSending("");
    setCopyMessageSending("");
  };

  const messageSendingHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageSending(e.target.value);
    setCopyMessageSending(e.target.value);
  };

  const postMessageHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postMessage({
      variables: {
        channelId: channelSelected,
        text: messageSending,
        userId: userSelected,
      },
    });
    setMessageSending("");
  };
  return (
    <MessageMainBox>
      <h4>{channelSelected} Channel</h4>
      <MessageListBox ref={divRef}>
        <Button
          className="w-100"
          onClick={() => manageGetMoreMessage(true)}
          variant="outline-info"
          style={{ marginBottom: 10 }}
        >
          Read More Top <FontAwesomeIcon icon={faArrowUp} />
        </Button>
        {messageList.map(({ userId, text, messageId, datetime, status }) => (
          <MessageItems
            key={messageId}
            userId={userId}
            text={text}
            messageId={messageId}
            datetime={datetime}
            status={status}
            userIdActive={userSelected}
          />
        ))}
        <Button
          className="w-100"
          onClick={() => manageGetMoreMessage(false)}
          variant="outline-info"
        >
          Read More Down <FontAwesomeIcon icon={faArrowDown} />
        </Button>
      </MessageListBox>

      <Form.Group
        className="mb-0 mt-1"
        controlId="exampleForm.ControlTextarea1"
      >
        {error && <p>{error.message}</p>}
        <Form.Control
          as="textarea"
          rows={3}
          value={messageSending}
          placeholder="Type your message here..."
          onChange={messageSendingHandle}
        />
        <Button
          className="w-100 mt-1"
          onClick={postMessageHandle}
          variant="info"
          style={{ color: "#fff" }}
        >
          Send Message <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Form.Group>
    </MessageMainBox>
  );
};

export default MessageMain;
