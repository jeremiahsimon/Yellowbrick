import React, {useEffect, useState} from 'react';
import { Col, Row, Card, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StatRightIcon from 'components/admin/stats/StatRightIcon';
import PropTypes from "prop-types";
import Proposals from "./Proposals.jsx";
import Clients from "./Clients.jsx";
import UserService from "../../services/userService.js";
import debug from "sabio-debug";
const _logger = debug.extend("Overview");

const ChartActionMenu = () => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Menu align="end">
          <Dropdown.Header>SETTINGS</Dropdown.Header>
          <Dropdown.Item eventKey="1">
            <i className="fe fe-external-link dropdown-item-icon "></i> Export
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <i className="fe fe-mail dropdown-item-icon "></i> Email Report
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">
            <i className="fe fe-download dropdown-item-icon "></i> Download
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const ClientDashboard = (props) => {
  const [data, setData] = useState({
    totalClients: 0,
    totalAgents: 0,
  });

  useEffect(() => {
    UserService.getAllDashboard().then(getAllSuccess).catch(getAllError);
  }, []);

  const getAllSuccess = (res) => {
    _logger(res.item);
    setData((prevState) => {
      let data = { ...prevState };
      data.totalClients = res.item[0].count;
      data.totalAgents = res.item[1].count;
      return data;
    });
  };

  const getAllError = (err) => {
    _logger(err);
  };

  return (
    <div>
      <Row>
        <Col
          lg={12}
          md={12}
          sm={12}
        >
          <div className="border-bottom pb-4 mb-4 d-lg-flex justify-content-between align-items-center">
            <div className="mb-3 mb-lg-0">
              <h1 className="mb-0 h2 fw-bold">Client Dashboard</h1>
            </div>
            <div className="d-flex">
              <div className="input-group me-3  ">
                <span
                  className="input-group-text text-muted"
                  id="basic-addon2"
                >
                  <i className="fe fe-calendar"></i>
                </span>
              </div>
              <Link
                to="#"
                className="btn btn-primary"
              >
                Setting
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Total Assets"
            value="$10,800"
            summary="Number of sales"
            summaryValue="+20.9$"
            summaryIcon="up"
            isShowSummaryIcon={false}
            iconName="shopping-bag"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>

        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Total Liabilities"
            value="22,786"
            summary="Instructor"
            summaryValue="+200"
            summaryIcon="up"
            isShowSummaryIcon={true}
            iconName="user-check"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>

        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Total Properties"
            value={data.totalClients.toString()}
            summary="Number of pending"
            summaryValue="120+"
            summaryIcon="down"
            isShowSummaryIcon={true}
            iconName="book-open"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>

        <Col
          xl={3}
          lg={6}
          md={12}
          sm={12}
        >
          <StatRightIcon
            title="Total Policies"
            value={data.totalAgents.toString()}
            summary="Students"
            summaryValue="+1200"
            summaryIcon="up"
            isShowSummaryIcon={true}
            iconName="users"
            iconColorVariant="primary"
            classValue="mb-4"
          />
        </Col>
      </Row>

      <Row>
        <Col
          xl={6}
          lg={12}
          md={12}
          className="mb-4"
        >
          <Card>
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Net Gains</h4>
              </div>
              <div>
                <ChartActionMenu />
              </div>
            </Card.Header>
            <Card.Body className="py-lg-7">
              <div id="chart">
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xl={6}
          lg={12}
          md={12}
          className="mb-4"
        >
          <Card>
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Net Losses</h4>
              </div>
              <div>
                <ChartActionMenu />
              </div>
            </Card.Header>
            <Card.Body className="py-lg-7">
              <div id="chart">
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col
          xl={6}
          lg={6}
          md={12}
          className="mb-4"
        >
          <Proposals title="Proposals" />
        </Col>

        <Col
          xl={6}
          lg={6}
          md={12}
          className="mb-4"
        >
          <Clients
            title="Clients"
            currentUser={props.currentUser}
          />
        </Col>
      </Row>
    </div>
  );
};

ClientDashboard.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
};

export default ClientDashboard;