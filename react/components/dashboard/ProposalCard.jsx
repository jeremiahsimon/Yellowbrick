import React from "react";
import { Col, Row, ListGroup, Image } from "react-bootstrap";
import Avatar1 from "assets/images/avatar/avatar-1.jpg";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("ProposalCard");

const ProposalCard = ({ client }) => {
  _logger("Props Value", client);
  return (
    <ListGroup.Item
      className="px-0 pt-0 border-0 mb-2 bg-white border-bottom"
      key={client?.id}
    >
      <Row>
        <Col xs={3} className="col-auto">
          <Image
            alt="avatar"
            src={
              client?.createdBy?.avatarUrl
                ? client?.createdBy?.avatarUrl
                : Avatar1
            }
            className="rounded-circle avatar"
          />
        </Col>
        <Col xs={9} className="col-auto">
          <Row className="align-items-center">
            <Col className="text-start fs-6">
              <h6 className="mb-1">
                {client?.createdBy?.firstName} {client?.createdBy?.lastName}
              </h6>
              <span className="text-end fs-6">
                <span className="badge bg-info text-white mb-1 align-items-center">
                  {client?.name}
                </span>
              </span>
            </Col>

            <Col className="text-start fs-6">
              <Col>
                <h6>Client:</h6>
              </Col>
              <Col>
                {client?.client?.firstName} {client?.client?.lastName}
              </Col>
            </Col>
          </Row>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

ProposalCard.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    dateModified: PropTypes.string,
    client: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
    }),
    createdBy: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }),
};

export default ProposalCard;
