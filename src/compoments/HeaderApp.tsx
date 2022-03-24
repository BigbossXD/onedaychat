import React from "react";
import { Row, Col } from "react-bootstrap";
export default function HeaderApp() {
  return (
    <div className="page-title">
      <Row>
        <Col xl={6} lg={6} md={6} sm={6} xs={12}>
          <h5 className="title">1 day chat App</h5>
          <p>All messages will be deleted at every 00:00 UTC</p>
        </Col>
      </Row>
    </div>
  );
}
