import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { useNavigate } from "react-router-dom";
import "./proposaldetails.css";

function ProposalTable({ proposal }) {
  const _logger = debug.extend("ProposalTable");
  const navigate = useNavigate();

  const onProposalClick = () => {
    navigate(`/clients/${proposal.client.id}/proposals/${proposal.id}/`);
  };

  _logger("Table has rendered!");

  return (
    <tr onClick={onProposalClick} className="hovered-row">
      <td className="col-2 text-center bg-white">
        {proposal.client?.firstName} {proposal.client.mi}{" "}
        {proposal.client?.lastName}
      </td>
      <td className="col-2 text-center bg-white">
        {proposal.solicitationState?.name}
      </td>
      <td className="col-2 text-center bg-white">{proposal.name}</td>
      <td className="col-2 text-center bg-white">{proposal.notes}</td>
      <td className="col-2 text-center bg-white">{proposal.status?.name}</td>
      <td className="col-2 text-center bg-white">
        {proposal.createdBy?.firstName} {proposal.createdBy?.mi}{" "}
        {proposal.createdBy?.lastName}
      </td>
      <td>
        <img
          src={proposal.createdBy?.avatarUrl}
          className="avatar"
          alt="..."
        ></img>
      </td>
    </tr>
  );
}

ProposalTable.propTypes = {
  proposal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
    }),
    solicitationState: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    status: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string.isRequired,
    }),
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string,
    }),
  }).isRequired,
};

export default ProposalTable;
