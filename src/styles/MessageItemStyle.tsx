import styled from "styled-components";

export const ChatBoxRight = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
  justifyContent: "right",
});
export const ChatBoxLeft = styled.div({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
});
export const ChatBoxTimeStamp = styled.div({
  fontSize: "0.80rem",
});
export const ChatBoxMessage = styled.div({
  backgroundColor: "#fff",
  borderRadius: 4,
  padding: "0.4rem 1rem",
  whiteSpace: "pre-line",
  alignSelf: "flex-start",
  minHeight: 60,
  minWidth: 100,
});
export const ChatBoxUserInfo = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "flex-start",
});
export const ChatBoxUserName = styled.span({
  fontSize: ".75rem",
  color: "#999999",
});
export const ChatBoxPass = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: 2,
});
export const ChatBoxPassIcon = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#9ec94a",
  width: 20,
  height: 20,
  borderRadius: 10,
});
export const ChatBoxError = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  margin: 2,
});
export const ChatBoxErrorIcon = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#b71e3c",
  width: 20,
  height: 20,
  borderRadius: 10,
});
export const ChatBoxSentStatus = styled.span({
  fontSize: ".75rem",
  color: "#999999",
});

export const TriangleRight = styled.span`
  border-bottom: 0.77rem solid transparent;
  border-left: 0.77rem solid #fff;
  border-top: 0.77rem solid transparent;
  height: 0px;
  width: 0px;
  align-self: flex-start;
  margin-top: 8px;
`;

export const TriangleLeft = styled.span`
  border-bottom: 0.77rem solid transparent;
  border-right: 0.77rem solid #fff;
  border-top: 0.77rem solid transparent;
  height: 0px;
  width: 0px;
  align-self: flex-start;
  margin-top: 8px;
`;
