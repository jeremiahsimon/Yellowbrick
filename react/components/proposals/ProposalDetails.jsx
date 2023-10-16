import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import debug from "sabio-debug";
import clientService from "services/clientService";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import ProposalProduct from "./ProposalProduct";
const _logger = debug.extend("ProposalDetails");

function ProposalDetails() {
  const { clientId, proposalId } = useParams();
  const [proposalProductData, setProposalProductData] = useState({
    list: [],
    mappedList: [],
    pageSize: 10,
    totalCount: 0,
    currentPage: 1,
    clientId: clientId,
    proposalId: proposalId,
  });

  useEffect(() => {
    _logger("clientId: ", proposalProductData.clientId);
    _logger("proposalId: ", proposalProductData.proposalId);
    {
      clientService
        .getProposalById(
          proposalProductData.clientId,
          proposalProductData.proposalId,
          proposalProductData.currentPage - 1,
          proposalProductData.pageSize
        )
        .then(onGetSuccess)
        .catch(onGetError);
    }
  }, [
    proposalProductData.clientId,
    proposalProductData.proposalId,
    proposalProductData.currentPage,
    proposalProductData.pageSize,
  ]);

  const onGetSuccess = (response) => {
    const { totalCount, pagedItems } = response.item;
    setProposalProductData((prevState) => ({
      ...prevState,
      list: pagedItems,
      mappedList: pagedItems.map(proposalMap),
      totalCount: totalCount,
    }));
  };

  const onGetError = (error) => {
    _logger("Error fetching proposal data", error);
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      let newObj = { ...prevState };
      newObj.currentPage = page;
      return newObj;
    });
  };

  const proposalMap = (aProposal) => (
    <ProposalProduct proposal={aProposal} key={aProposal.id} />
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Proposal Details</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/proposals">Proposals</a>
                </li>
                <li className="breadcrumb-item active">Proposal Details</li>
              </ol>
            </div>
            <div>
              <a href="/proposals" className="btn btn-primary">
                Back
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row">{proposalProductData.mappedList}</div>

      <div className="active-page inactive-page carat-style hover-color pb-3 mt-2">
        <Pagination
          onChange={onPageChange}
          current={proposalProductData.currentPage}
          total={proposalProductData.totalCount}
          pageSize={proposalProductData.pageSize}
          locale={locale}
          className="text-center"
        />
      </div>
    </React.Fragment>
  );
}

export default ProposalDetails;
