import React, { useState, useEffect } from "react";
import proposalService from "services/proposalService";
import ProposalTable from "./ProposalTable";
import debug from "sabio-debug";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import { Field, Form, Formik } from "formik";
import lookUpService from "services/lookUpService";

const _logger = debug.extend("ProposalList");

function Proposals() {
  const [proposals, setProposalsData] = useState({
    list: [],
    mappedList: [],
    pageSize: 8,
    totalCount: 0,
    currentPage: 1,
    searchQuery: "",
  });

  const [lookUp, setLookUp] = useState({
    statusTypes: [],
    mappedStatusTypes: [],
  });

  useEffect(() => {
    if (proposals.searchQuery) {
      proposalService
        .searchByProposal(
          proposals.currentPage - 1,
          proposals.pageSize,
          proposals.searchQuery
        )
        .then(onGetSuccess)
        .catch(onGetAllError);
    } else {
      proposalService
        .getAll(proposals.currentPage - 1, proposals.pageSize)
        .then(onGetSuccess)
        .catch(onGetAllError);
    }
    lookUpService
      .lookUp(["statusTypes"])
      .then(lookUpSuccess)
      .catch(lookUpError);
  }, [proposals.currentPage, proposals.searchQuery]);

  const onGetSuccess = (response) => {
    const { totalCount, pagedItems } = response.item;
    setProposalsData((prevState) => {
      const pList = { ...prevState };
      pList.list = pagedItems;
      pList.mappedList = pagedItems.map(proposalMap);
      pList.totalCount = totalCount;
      return pList;
    });
  };

  const lookUpSuccess = (response) => {
    const { statusTypes } = response.item;
    setLookUp((prevState) => {
      const type = { ...prevState };
      type.statusTypes = statusTypes;
      type.mappedStatusTypes = statusTypes.map(statusMap);
      return type;
    });
  };

  const onGetAllError = (error) => {
    _logger("This isnt working!", error);
    toastr.warning("Input not found.");
    toastr.clear();
  };

  const lookUpError = (error) => {
    _logger("Could not find status", error);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setProposalsData((prevState) => {
      let newObj = { ...prevState };
      newObj.searchQuery = value;
      newObj.currentPage = 1;
      return newObj;
    });
  };

  const onPageChange = (page) => {
    setProposalsData((prevState) => {
      let newObj = { ...prevState };
      newObj.currentPage = page;
      return newObj;
    });
  };

  const proposalMap = (aProposal) => (
    <ProposalTable proposal={aProposal} key={aProposal.id} />
  );

  const statusMap = (status) => (
    <option value={status.name} key={`status_${status.id}`}>
      {status.name}
    </option>
  );

  return (
    <React.Fragment>
      <Formik>
        <Form>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="border-bottom mb-4 d-md-flex align-items-center justify-content-between">
                <div className="mb-3 mb-md-0">
                  <h1 className="mb-1 h2 fw-bold">Proposals</h1>
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item active">Proposals</li>
                  </ol>
                </div>

                <div className="form-group d-flex me-md-2 mb-md-0">
                  <Field
                    component="select"
                    name="status"
                    className="form-control"
                    onChange={handleSearch}
                  >
                    <option value="">--Choose Status--</option>
                    {lookUp.mappedStatusTypes}
                  </Field>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Proposals"
                    onChange={handleSearch}
                  />
                  <div>
                    <a href="/add-proposal" className="btn fe fe-plus-circle"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <table
                role="table"
                className="text-nowrap table text-center align-middle table-light maintain-cursor"
              >
                <thead className="table-primary">
                  <tr>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    >
                      NAME
                    </th>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    >
                      STATE
                    </th>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    >
                      PROPOSAL
                    </th>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    >
                      NOTES
                    </th>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    >
                      STATUS
                    </th>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    >
                      ADVISOR
                    </th>
                    <th
                      className="align-middle text-center pe-3 ps-3"
                      scope="col"
                    ></th>
                  </tr>
                </thead>
                <tbody role="rowgroup"> {proposals.mappedList}</tbody>
              </table>

              <div className="active-page inactive-page carat-style hover-color pb-3 text-center">
                <Pagination
                  onChange={onPageChange}
                  current={proposals.currentPage}
                  total={proposals.totalCount}
                  pageSize={proposals.pageSize}
                  locale={locale}
                />
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </React.Fragment>
  );
}

export default Proposals;
