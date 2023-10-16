import React, { useState, useEffect } from "react";
import { Form, ErrorMessage, Field, Formik } from "formik";
import proposalService from "services/proposalService";
import lookUpService from "services/lookUpService";
import debug from "sabio-debug";
import addProposalSchema from "../../schemas/addProposalSchema";
import toastr from "toastr";
import clientService from "services/clientService";

const _logger = debug.extend("AddProposal");

function ProposalForm() {
  const initialValues = {
    clientId: "",
    solicitationStateId: 0,
    name: "",
    notes: "",
  };

  const [clients, setClientsData] = useState({
    clients: [],
    mappedClients: [],
    pageSize: 100000,
    totalCount: 0,
    currentPage: 1,
  })
  _logger(clients)

  const [lookUp, setLookUp] = useState({
    states: [],
    mappedStates: [],
  });

  useEffect(() => {
    lookUpService.lookUp(["states"]).then(lookUpSuccess).catch(lookUpError);
    clientService.selectAll(clients.currentPage - 1, clients.pageSize).then(onGetClientsSuccess).catch(onGetClientsError);
  }, [clients.currentPage]);

  const handleSubmit = (values) => {
    proposalService
      .addProposal(values)
      .then(onAddProposalSuccess)
      .catch(onAddProposalError);
  };

  const onAddProposalSuccess = (response) => {
    _logger("Proposal added", response);
    toastr.success("Proposal added successfully.");
  };

  const onAddProposalError = (error) => {
    _logger("Proposal was not added", error);
    toastr.warning("Did NOT add proposal.");
  };

  const lookUpSuccess = (response) => {
    const { states } = response.item;
    setLookUp((prevState) => {
      const state = { ...prevState };
      state.states = states;
      state.mappedStates = states.map(stateMap);
      return state;
    });
  };

  const lookUpError = (error) => {
    _logger("Could not find state", error);
  };

  const stateMap = (state) => (
    <option value={state.id} key={`state_${state.id}`}>
      {state.name}
    </option>
  );

  const onGetClientsSuccess = (response) => {
    const { totalCount, pagedItems } = response.item;
    setClientsData((prevState) => {
      const cList = { ...prevState };
      cList.clients = pagedItems;
      cList.mappedClients = pagedItems.map(clientMap);
      cList.totalCount = totalCount;
      return cList;
    });
  };

  const onGetClientsError = (error) => {
    _logger("Could not find client", error);
  };

  const clientMap = (client) => (
    <option value={client.id} key={`client_${client.id}`}>
      {client.firstName} {client.lastName}
    </option>
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Add New Proposal</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/proposals">Proposals</a>
                </li>
                <li className="breadcrumb-item active">Add New Proposal</li>
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
      <div className="py-6">
        <div className="col-xl-6 offset-xl-3 col-md-12 col-xs-12">
          <div className="card-body bg-white p-lg-6">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              enableReinitialize={true}
              validationSchema={addProposalSchema}
            >
              <Form>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">
                      Client <span className="text-danger">*</span>
                    </label>
                    <Field
                      component="select"
                      name="clientId"
                      id="clientId"
                      className="form-control"
                    >
                      <option value="">--Select Client--</option>
                      {clients.mappedClients}
                    </Field>
                    <ErrorMessage
                      name="clientId"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-6">
                    <label className="form-label">
                      State <span className="text-danger">*</span>
                    </label>
                    <Field
                      component="select"
                      name="solicitationStateId"
                      id="solicitationStateId"
                      className="form-control"
                    >
                      <option value="">--Select State--</option>
                      {lookUp.mappedStates}
                    </Field>
                    <ErrorMessage
                      name="solicitationStateId"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">
                      Proposal Name <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="name"
                      type="text"
                      id="name"
                      className="form-control"
                      placeholder="Enter Proposal Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-12">
                    <label className="form-label">
                      Notes <span className="text-danger">*</span>
                    </label>
                    <Field
                      name="notes"
                      type="text"
                      id="notes"
                      className="form-control"
                      placeholder="Enter Notes"
                    />
                    <ErrorMessage
                      name="notes"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                </div>
                <div className="col-xs-12">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProposalForm;