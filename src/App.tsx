/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import { Card, Container } from "react-bootstrap";
import { UserInterface } from "./interfaces/user.interface";
import { ChannelInterface } from "./interfaces/channel.interface";
import HeaderApp from "./components/HeaderApp";
import MessageMain from "./components/MessageMain";
import SettingMain from "./components/SettingMain";
import { Row, Col } from "react-bootstrap";
import { USERS, CHANNELS } from "./config/app.config";
import { THEME } from "./styles/theme";

import { useLazyQuery } from "@apollo/client";
import {
  FETCH_LAST_MESSAGE,
  FETCH_MORE_MESSAGE,
} from "./services/graphql.service";

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
  const [fistLoad, setFistLoad] = useState<boolean>(true);

  useEffect(() => {
    if (fistLoad) {
      getData();
      setFistLoad(false);
    }
    getMessage({ variables: { channelId: channelIdSelected } });
    if (data) {
      manageMessage(data.fetchLatestMessages);
    }
  }, [data, getMessage, fistLoad]);

  useEffect(() => {
    startIntervalChat(channelIdSelected, newestMessageId);
  }, [newestMessageId]);

  const changeChannelHandle = (channelId: string) => {
    setMessageList([]);
    getMessage({ variables: { channelId: channelId } });
  };

  const getData = async () => {
    try {
      const assUserName = await localStorage.getItem("@user_Name");
      const assChannelId = await localStorage.getItem("@channel_Id");
      const assChannelName = await localStorage.getItem("@channel_Name");
      setUserSelected(assUserName !== null ? assUserName : USERS[0].userId);
      setChannelIdSelected(
        assChannelId !== null ? assChannelId : CHANNELS[0].channelId
      );
      setChannelSelected(
        assChannelName !== null ? assChannelName : CHANNELS[0].name
      );
      getMessage({ variables: { channelId: assChannelId } });
    } catch (e) {
      console.log("error");
      // error reading value
    }
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
                    channelSelecte={channelSelected}
                    setChannelIdSelected={setChannelIdSelected}
                    setChannelSelected={setChannelSelected}
                    changeChannelHandle={changeChannelHandle}
                    userSelected={userSelected}
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
