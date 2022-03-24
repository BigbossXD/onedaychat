import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Container } from "react-bootstrap";

import HeaderApp from "../src/compoments/HeaderApp";
import { Row, Col } from "react-bootstrap";

import { useQuery, gql } from "@apollo/client";
const EXCHANGE_RATES = gql`
  query {
    fetchLatestMessages(channelId: "1") {
      userId
      text
      messageId
      datetime
    }
  }
`;

function CallMessage() {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
    <div>
      <p>{JSON.stringify(data)}</p>
    </div>
  );
}

function App() {
  return (
    <Container>
      <HeaderApp />
    </Container>
  );
}

export default App;
