/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import { Card, Container } from "react-bootstrap";
import { UserInterface } from "./interfaces/user.interface";
import { ChannelInterface } from "./interfaces/channel.interface";
import HeaderApp from "./compoments/HeaderApp";
import MessageMain from "./compoments/MessageMain";
import SettingMain from "./compoments/SettingMain";
import { Row, Col } from "react-bootstrap";
import { USERS, CHANNELS } from "./config/app.config";
import { THEME } from "./styles/theme";

import { gql, useLazyQuery } from "@apollo/client";

const FETCH_LAST_MESSAGE = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      userId
      text
      messageId
      datetime
    }
  }
`;

const FETCH_MORE_MESSAGE = gql`
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

function App() {
  const channelList: ChannelInterface["channelList"] = CHANNELS;
  const userList: UserInterface["usersList"] = USERS;
  const [userSelected, setUserSelected] = useState<string>(USERS[0].userId);
  const [channelSelected, setChannelSelected] = useState<string>(
    CHANNELS[0].name
  );
  const [channelIdSelected, setChannelIdSelected] = useState<string>(
    CHANNELS[0].channelId
  );
  const [messageList, setMessageList] = useState<any[]>([]);
  const [getMessage, { loading, data }] = useLazyQuery(FETCH_LAST_MESSAGE);
  const [getMoreMessage] = useLazyQuery(FETCH_MORE_MESSAGE, {
    onCompleted: (data) => {
      manageMessage(data.fetchMoreMessages);
    },
  });
  const [oldestMessageId, setOldestMessageId] = useState<string>("");
  const [newestMessageId, setNewestMessageId] = useState<string>("");
  const [intervalID, setIntervalID] = useState<any>(null);

  useEffect(() => {
    getMessage({ variables: { channelId: channelIdSelected } });
    if (data) {
      manageMessage(data.fetchLatestMessages);
    }
  }, [data, getMessage]);

  useEffect(() => {
    startIntervalChat(channelIdSelected, newestMessageId);
  }, [newestMessageId]);

  const changeChannelHandle = (channelId: string) => {
    setMessageList([]);
    getMessage({ variables: { channelId: channelId } });
  };

  const manageMessage = (messageComing: any) => {
    const items = [...messageList, ...messageComing];
    items.sort(
      (a, b) => new Date(a.datetime).valueOf() - new Date(b.datetime).valueOf()
    );
    if (items.length > 0) {
      setOldestMessageId(items[0].messageId);
      for (let i = items.length - 1; i > 0; i--) {
        if (items[i].status !== "erorr") {
          setNewestMessageId(items[i].messageId);
          break;
        }
      }
    }
    setMessageList(items);
  };

  const manageGetMoreMessage = (old: boolean, channelId: string) => {
    getMoreMessage({
      variables: {
        channelId: channelId,
        messageId: old ? oldestMessageId : newestMessageId,
        old: old,
      },
    });
  };

  const startIntervalChat = (channelId: string, newestMessageId: string) => {
    clearInterval(intervalID);
    const newIntervalId = setInterval(() => {
      getMoreMessage({
        variables: {
          channelId: channelId,
          messageId: newestMessageId,
          old: false,
        },
      });
    }, 5000);
    setIntervalID(newIntervalId);
  };

  return (
    <Container fluid>
      <div style={{ maxHeight: 100 }}>
        <HeaderApp />
      </div>
      <div className="content-wrapper mb-1">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card style={{ backgroundColor: THEME[1].MAIN_BG_COLOR }}>
              <Row>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <SettingMain
                    userList={userList}
                    channelList={channelList}
                    setUserSelected={setUserSelected}
                    channelIdSelected={channelIdSelected}
                    setChannelIdSelected={setChannelIdSelected}
                    setChannelSelected={setChannelSelected}
                    changeChannelHandle={changeChannelHandle}
                  />
                </Col>
                <Col xl={12} lg={12} md={12} sm={12} xs={12}>
                  <MessageMain
                    channelSelected={channelSelected}
                    channelIdSelected={channelIdSelected}
                    userSelected={userSelected}
                    messageList={messageList}
                    setMessageList={setMessageList}
                    manageGetMoreMessage={manageGetMoreMessage}
                    setNewestMessageId={setNewestMessageId}
                    messageLoading={loading}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default App;
