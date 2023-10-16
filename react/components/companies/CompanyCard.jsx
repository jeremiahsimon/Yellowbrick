import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import "./companylist.css";

function CompanyCard(props) {
  const _logger = debug.extend("CompanyCard");

  const company = props.company;
  const navigate = useNavigate();

  const onCompanyClick = () => {
    navigate(`/companies/${company.id}`);
  };

  _logger("Card rendered successfully");

  return (
    <div className="col-xl-3 col-lg-6 col-md-12 mb-4" onClick={onCompanyClick}>
      <div className="company card">
        <div className="company card-body">
          <div className="company-logo-container">
            <img
              src={company.logo}
              className="company-logo-image img-fluid"
              alt="Company Logo"
            />
          </div>
          <div className="company-text-container">
            <h2 className="card-title">{company.name}</h2>
            <h3 className="card-subtitle mb-2 text-muted">ID: {company.id}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

CompanyCard.propTypes = {
  company: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    logo: PropTypes.string.isRequired,
  }).isRequired,
};

export default CompanyCard;
