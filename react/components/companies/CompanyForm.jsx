import React from "react";
import {Formik, Field, ErrorMessage, Form} from "formik";
import companySchema from "schemas/companySchema";
import SingleFileUpload from "components/fileupload/SingleFileUpload";
import companyService from "services/companyService";
import debug from "sabio-debug";
const _logger = debug.extend("CompaniesForm");
import toastr from "toastr";

function CompanyForm() {
  const initialValues = {
    name: "",
    headline: "",
    description: "",
    phone: "",
    siteUrl: "",
    logo: "",
  };

  const handleUpload = (response, setFieldValue) => {
    _logger("From handler:", response);
    setFieldValue("logo", response.item[0].url);
    toastr.success("Logo successfully uploaded.");
  };

  const handleSubmit = (values) => {
    companyService.add(values).then(onAddCompanySuccess).catch(onAddCompanyError);
  };

  const onAddCompanySuccess = (response) => {
    _logger("Company created", response);
    toastr.success("Company successfully created.");
  };

  const onAddCompanyError = (error) => {
    _logger("Error creating company:", error);
    toastr.error("Error creating company.");
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Add New Company</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/companies">Companies</a>
                </li>
                <li className="breadcrumb-item active">Add New Company</li>
              </ol>
            </div>
            <div>
              <a href="/companies" className="btn btn-primary">
                Back
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="col-xl-6 offset-xl-3 col-md-12 col-xs-12">
        <div className="card">
          <div className="card-body bg-white">
            <Formik
              initialValues={initialValues}
              validationSchema={companySchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}>
              {({values, setFieldValue}) => (
                <Form>
                  <div className="row">
                    <div className="col-xs-12 mb-3">
                      <div className="form-group">
                        <label>
                          Name <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="name"
                          className="form-control"
                          placeholder="Enter Company Name"
                        />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </div>
                    </div>

                    <div className="col-xs-12 mb-3">
                      <div className="form-group">
                        <label>
                          Headline <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="headline"
                          className="form-control"
                          placeholder="Headline"
                        />
                        <ErrorMessage name="headline" component="div" className="text-danger" />
                      </div>
                    </div>

                    <div className="col-xs-12 mb-3">
                      <div className="form-group">
                        <label>
                          Description <span className="text-danger">*</span>
                        </label>
                        <Field
                          as="textarea"
                          rows={3}
                          name="description"
                          className="form-control"
                          placeholder="Enter a brief description about the company..."
                        />
                        <ErrorMessage name="description" component="div" className="text-danger" />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>
                          Phone <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="Phone"
                        />
                        <ErrorMessage name="phone" component="div" className="text-danger" />
                      </div>
                    </div>

                    <div className="col-md-6 mb-3">
                      <div className="form-group">
                        <label>
                          Website <span className="text-danger">*</span>
                        </label>
                        <Field
                          type="text"
                          name="siteUrl"
                          className="form-control"
                          placeholder="Website"
                        />
                        <ErrorMessage name="siteUrl" component="div" className="text-danger" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 col-xs-12 mb-4">
                      <div className="form-group">
                        <label>
                          Company Logo <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="form-group">
                        {values.logo.length > 0 && (
                          <img
                            src={values.logo}
                            alt="Logo Preview"
                            className="img-fluid"
                            required
                          />
                        )}
                        <SingleFileUpload
                          handleUpload={(response) => handleUpload(response, setFieldValue)}
                        />
                        <ErrorMessage name="logo" component="div" className="text-danger" />
                      </div>
                    </div>
                  </div>

                  <div className="col-xs-12">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CompanyForm;
