import { FC } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { APPCONSTANTS } from "../constants/app.constants";
import { THEME } from "../styles/theme";
import styled from "styled-components";

const Header = styled.div((props) => ({
  height: 70,
  backgroundColor: THEME[1].BG_COLOR_HEADER,
  color: "#fff",
  padding: 8,
}));

const HeaderApp: FC = () => {
  return (
    <div className="page-title mb-1 mt-1">
      <Row>
        <Col xl={12} lg={12} md={12} sm={12} xs={12}>
          <Card>
            <Header>
              <h5 className="title">
                <b>{APPCONSTANTS.APP_NAME}</b>
              </h5>
              {APPCONSTANTS.APP_DETAIL}
            </Header>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HeaderApp;
