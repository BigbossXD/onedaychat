import styled from "styled-components";

export const MessageMainBox = styled.div({
  display: "flex",
  height: "calc(100vh - 96px)",
  flexDirection: "column",
  padding: 10,
});

export const MessageListBox = styled.div({
  display: "flex",
  flex: 1,
  overflow: "auto",
  overflowY: "scroll",
  flexDirection: "column",
});
