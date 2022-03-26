import { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { UserInterface } from "../interfaces/user.interface";
import { ChannelInterface } from "../interfaces/channel.interface";
import styled from "styled-components";
import { APPCONSTANTS } from "../constants/app.constants";
export const SittingtBox = styled.div({
  padding: 10,
});

interface Props {
  userList: UserInterface["usersList"];
  channelList: ChannelInterface["channelList"];
  setUserSelected: Dispatch<SetStateAction<string>>;
  setChannelIdSelected: Dispatch<SetStateAction<string>>;
  setChannelSelected: Dispatch<SetStateAction<string>>;
  channelIdSelected: string;
  changeChannelHandle: Function;
}

const SettingMain: FC<Props> = ({
  userList,
  channelList,
  setUserSelected,
  setChannelIdSelected,
  setChannelSelected,
  changeChannelHandle,
  channelIdSelected,
}) => {
  const setUserSelectedHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(e.target.value);
  };

  const setChannelHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    const val = JSON.parse(e.target.value);
    if (val.channelId !== channelIdSelected) {
      setChannelIdSelected(val.channelId);
      setChannelSelected(val.channelName);
      changeChannelHandle(val.channelId);
    }
  };

  return (
    <SittingtBox>
      <Row>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <Form.Group controlId="formGridState">
            <Form.Label>
              <b>{APPCONSTANTS.APP_SELECT_USER}</b>
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
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} xs={6}>
          <Form.Group controlId="formGridState">
            <Form.Label>
              <b>{APPCONSTANTS.APP_SELECT_CHANNEL}</b>
            </Form.Label>
            <Form.Select
              defaultValue={userList[0].userId}
              onChange={setChannelHandler}
            >
              {channelList.map(({ name, channelId }) => {
                let toValue = { channelId: channelId, channelName: name };
                return (
                  <option
                    id={name}
                    value={JSON.stringify(toValue)}
                    key={channelId}
                  >
                    {name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </SittingtBox>
  );
};

export default SettingMain;
