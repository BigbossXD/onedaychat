import React, { useState, useEffect } from "react";
import "./App.css";
import { Card, Container } from "react-bootstrap";
import { UserInterface } from "./interfaces/user.interface";
import { ChannelInterface } from "./interfaces/channel.interface";
import HeaderApp from "./compoments/HeaderApp";
import MessageMain from "./compoments/MessageMain";
import SettingMain from "./compoments/SettingMain";
import { Row, Col } from "react-bootstrap";
import { USERS, CHANNELS } from "./config/app.config";

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
  const [userSelected, setUserSelected] = useState<string>(USERS[0].userId);
  const [channelSelected, setChannelSelected] = useState<string>(
    CHANNELS[0].name
  );
  const [channelIdSelected, setChannelIdSelected] = useState<string>(
    CHANNELS[0].channelId
  );
  const [channelList, setChannelList] =
    useState<ChannelInterface["channelList"]>(CHANNELS);
  const [userList, setUserList] = useState<UserInterface["usersList"]>(USERS);
  const [messageList, setMessageList] = useState<any[]>([]);
  const [getMessage, { loading, data }] = useLazyQuery(FETCH_LAST_MESSAGE);
  const [getMoreMessage] = useLazyQuery(FETCH_MORE_MESSAGE, {
    onCompleted: (data) => {
      console.log(data);
      manageMessage(data.fetchMoreMessages);
    },
  });
  const [oldestMessageId, setOldestMessageId] = useState<string>("");
  const [newestMessageId, setNewestMessageId] = useState<string>("");
  useEffect(() => {
    getMessage({ variables: { channelId: channelIdSelected } });
    if (data) {
      manageMessage(data.fetchLatestMessages);
    }
  }, [channelIdSelected, data, getMessage]);

  const manageMessage = (messageComing: any) => {
    const items = [...messageList, ...messageComing];
    items.sort(
      (a, b) => new Date(a.datetime).valueOf() - new Date(b.datetime).valueOf()
    );
    if (items.length > 0) {
      setOldestMessageId(items[0].messageId);
      setNewestMessageId(items[items.length - 1].messageId);
    }
    setMessageList(items);
  };

  const manageGetMoreMessage = (old: boolean) => {
    console.log("call manageGetMoreMessage");
    getMoreMessage({
      variables: {
        channelId: channelIdSelected,
        messageId: old ? oldestMessageId : newestMessageId,
        old: old,
      },
    });
  };

  return (
    <Container fluid>
      <div style={{ maxHeight: 100 }}>
        <HeaderApp />
      </div>
      <div className="content-wrapper">
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card style={{ backgroundColor: "#f4f5fb" }}>
              <Row>
                <Col xl={4} lg={4} md={4} sm={3} xs={3}>
                  <SettingMain
                    userList={userList}
                    channelList={channelList}
                    setUserSelected={setUserSelected}
                    setChannelIdSelected={setChannelIdSelected}
                    setChannelSelected={setChannelSelected}
                  />
                </Col>
                <Col xl={8} lg={8} md={8} sm={9} xs={9}>
                  <MessageMain
                    channelSelected={channelSelected}
                    userSelected={userSelected}
                    messageList={messageList}
                    setMessageList={setMessageList}
                    manageGetMoreMessage={manageGetMoreMessage}
                    setNewestMessageId={setNewestMessageId}
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
