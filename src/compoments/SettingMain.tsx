import React, {
  FC,
  ChangeEvent,
  MouseEvent,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Form, ListGroup } from "react-bootstrap";
import { UserInterface } from "../interfaces/user.interface";
import { ChannelInterface } from "../interfaces/channel.interface";
import styled from "styled-components";

export const SittingtBox = styled.div({
  padding: 10,
});

interface Props {
  userList: UserInterface["usersList"];
  channelList: ChannelInterface["channelList"];
  setUserSelected: Dispatch<SetStateAction<string>>;
  setChannelIdSelected: Dispatch<SetStateAction<string>>;
  setChannelSelected: Dispatch<SetStateAction<string>>;
}

const SettingMain: FC<Props> = ({
  userList,
  channelList,
  setUserSelected,
  setChannelIdSelected,
  setChannelSelected,
}) => {
  const setUserSelectedHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(e.target.value);
  };

  const setChannelHandler = (channelId: string, name: string) => {
    setChannelIdSelected(channelId);
    setChannelSelected(name);
  };

  return (
    <SittingtBox>
      <Form.Group controlId="formGridState">
        <Form.Label>
          <b>1. Choose your user</b>
        </Form.Label>
        <Form.Select
          defaultValue={userList[0].userId}
          onChange={setUserSelectedHandler}
        >
          {userList.map(({ userId }: UserInterface["user"]) => (
            <option value={userId} key={userId}>
              {userId}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <br />
      <Form.Group controlId="formGridState">
        <Form.Label>
          <b>2. Choose your Channel</b>
        </Form.Label>
        <ListGroup defaultActiveKey={`#${channelList[0].name}`}>
          {channelList.map(({ name, channelId }) => (
            <ListGroup.Item
              action
              href={`#${name}`}
              key={channelId}
              onClick={() => setChannelHandler(channelId, name)}
            >
              {name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Form.Group>
    </SittingtBox>
  );
};

export default SettingMain;
