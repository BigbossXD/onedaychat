/* eslint-disable react-hooks/exhaustive-deps */
import {
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
import { APPCONSTANTS } from "../constants/app.constants";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import { MessageListBox, MessageMainBox } from "../styles/MessageMainStyle";
import { POST_MESSAGE } from "../services/graphql.service";

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
  channelIdSelected: string;
  userSelected: string;
  messageList: Message["message"];
  setMessageList: Dispatch<SetStateAction<any[]>>;
  setNewestMessageId: Dispatch<SetStateAction<string>>;
  manageGetMoreMessage: Function;
  messageLoading: boolean;
}

const MessageMain: FC<Props> = ({
  channelSelected,
  channelIdSelected,
  messageList,
  userSelected,
  setMessageList,
  manageGetMoreMessage,
  setNewestMessageId,
  messageLoading,
}) => {
  const divRef = useRef<any>(null);
  const [postMessage, { error, data }] = useMutation(POST_MESSAGE);
  const [messageSending, setMessageSending] = useState<string>("");
  const [copyMessageSending, setCopyMessageSending] = useState<string>("");
  const [firstLoad, setfirstLoad] = useState<boolean>(true);

  const goToButtom = () => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  };

  useEffect(() => {
    if (firstLoad) {
      getData();
      setfirstLoad(false);
    }
    if (error) {
      errorMessageHandle();
    }
    if (data) {
      successMessageHandle(data);
    }
  }, [error, data, firstLoad]);

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
    goToButtom();
    storeDataMessage("");
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
    goToButtom();
    storeDataMessage("");
  };

  const storeDataMessage = async (message: string) => {
    try {
      await localStorage.setItem("@last_Hold_Msg", message);
    } catch (e) {
      console.log(JSON.stringify(e));
      // saving error
    }
  };

  const getData = async () => {
    try {
      const assLastHoldingMsg = await localStorage.getItem("@last_Hold_Msg");
      setMessageSending(assLastHoldingMsg !== null ? assLastHoldingMsg : "");
      setCopyMessageSending(
        assLastHoldingMsg !== null ? assLastHoldingMsg : ""
      );
    } catch (e) {
      console.log("error");
      // error reading value
    }
  };

  const messageSendingHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setMessageSending(e.target.value);
    setCopyMessageSending(e.target.value);
    storeDataMessage(e.target.value);
  };

  const postMessageHandle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    postMessage({
      variables: {
        channelId: channelIdSelected,
        text: messageSending,
        userId: userSelected,
      },
    });
  };
  return (
    <MessageMainBox>
      <h4>
        <b>{channelSelected} Channel</b>
      </h4>
      {messageLoading && (
        <MessageListBox>{APPCONSTANTS.APP_LOADING}</MessageListBox>
      )}
      {!messageLoading && messageList.length <= 0 && (
        <MessageListBox>{APPCONSTANTS.APP_NO_MESSAGE}</MessageListBox>
      )}
      {!messageLoading && messageList.length > 0 && (
        <MessageListBox ref={divRef}>
          <Button
            className="w-100"
            onClick={() => manageGetMoreMessage(true, channelIdSelected)}
            variant="outline-info"
            style={{ marginBottom: 10 }}
          >
            {APPCONSTANTS.APP_READ_MORE} <FontAwesomeIcon icon={faArrowUp} />
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
            onClick={() => manageGetMoreMessage(false, channelIdSelected)}
            variant="outline-info"
          >
            {APPCONSTANTS.APP_READ_MORE} <FontAwesomeIcon icon={faArrowDown} />
          </Button>
        </MessageListBox>
      )}

      <Form.Group
        className="mb-0 mt-1"
        controlId="exampleForm.ControlTextarea1"
      >
        <Form.Control
          as="textarea"
          rows={3}
          value={messageSending}
          placeholder={APPCONSTANTS.APP_MESSAGE_PLACEHOLDER}
          onChange={messageSendingHandle}
        />
        <Button
          className="w-100 mt-1"
          onClick={postMessageHandle}
          variant="info"
          style={{ color: "#fff" }}
          disabled={messageLoading}
        >
          {APPCONSTANTS.APP_SENT_MESSAGE}{" "}
          <FontAwesomeIcon icon={faPaperPlane} />
        </Button>
      </Form.Group>
    </MessageMainBox>
  );
};

export default MessageMain;
