import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import ProposalCard from "./ProposalCard";
import proposalService from "services/proposalService";
import PropTypes from "prop-types";
import debug from "sabio-debug";
const _logger = debug.extend("Proposals");

const Proposals = () => {
  const [data, setData] = useState({
    proposalCardComponent: [],
  });

  useEffect(() => {
    proposalService
      .getAll(0, 5)
      .then(getProposalSuccess)
      .catch(getProposalError);
  }, []);

  const getProposalSuccess = (result) => {
    setData((prevState) => {
      let proposalData = { ...prevState };
      proposalData.proposalCardComponent =
        result.item.pagedItems.map(mapProposal);
      return proposalData;
    });
  };

  const getProposalError = (error) => {
    _logger("Error", error);
  };

  const mapProposal = (client, index) => {
    return <ProposalCard client={client} key={index} />;
  };

  return (
    <Card className="h-100 bg-white border border-bottom-1">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height bg-primary">
        <h4 className="mb-0">Proposals</h4>
        <Link to="/proposals" className="btn btn-outline-white btn-sm bg-white">
          View all
        </Link>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush" className="list-timeline-activity">
          {data.proposalCardComponent}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

Proposals.prototype = {
  id: PropTypes.number.isRequired,
};

export default Proposals;
