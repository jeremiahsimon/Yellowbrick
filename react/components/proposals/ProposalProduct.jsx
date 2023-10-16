import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import "./proposaldetails.css";

function ProposalProduct(props) {
  const _logger = debug.extend("ProposalProduct");
  const proposal = props.proposal;

  _logger("Proposal product recommendations rendered successfully");

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12 col-sm-12">
          {proposal.products.map((product) => (
            <div key={product.id} className="col-lg-12 col-md-8 col-sm-6">
              <div className="card bg-white">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt="Product"
                />
                <div className="card-body">
                  <div className="card-title">
                    <span className="larger-text black-text sans-serif-font">
                      {product.productInfo.name}
                    </span>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  ></div>
                  <p>
                    <strong className="text-primary">Product Type:</strong>{" "}
                    {product.productType?.name}
                  </p>
                  <p>
                    <strong className="text-primary">Company Name:</strong>{" "}
                    {product.companyName}
                  </p>
                  <p>
                    <strong className="text-primary">SKU:</strong> {product.sku}
                  </p>
                  <p>
                    <strong className="text-primary">Amount:</strong>{" "}
                    {product.amount}
                  </p>
                  <p>
                    <strong className="text-primary">Term In Years:</strong>{" "}
                    {product.termInYears}
                  </p>
                  <p>
                    <strong className="text-primary">Specifications:</strong>
                    {product.specifications &&
                      product.specifications
                        .split("\n")
                        .filter((item) => item.trim() !== "")
                        .map((item, index) => (
                          <p
                            key={index}
                            dangerouslySetInnerHTML={{ __html: item }}
                          />
                        ))}
                  </p>

                  <p>
                    <strong className="text-primary">Is Active:</strong>{" "}
                    {product.isActive ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong className="text-primary">Date Created:</strong>{" "}
                    {product.dateCreated}
                  </p>
                  <p>
                    <strong className="text-primary">Date Modified:</strong>{" "}
                    {product.dateModified}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-3 col-md-6 col-sm-10">
          <div className="proposal card">
            <div className="card-header bg-primary">
              <h3 className="card-title">
                {proposal.client?.firstName} {proposal.client?.mi} {""}
                {proposal.client?.lastName}
              </h3>
            </div>
            <div className="card-body">
              <p>
                <strong>PROPOSAL NAME</strong>
                <div>{proposal.name}</div>
              </p>
              <p>
                <strong>SOLICITATION STATE</strong>
                <div>{proposal.solicitationState.name}</div>
              </p>
              <p>
                <strong>NOTES</strong>
                <div>{proposal.notes}</div>
              </p>
              <p>
                <strong>STATUS</strong>
                <div>{proposal.status?.name}</div>
              </p>
              <p>
                <strong>DATE CREATED</strong>
                <div>{proposal.dateCreated}</div>
              </p>
              <p>
                <strong>DATE MODIFIED</strong>
                <div>{proposal.dateModified}</div>
              </p>
              <p>
                <strong>AGENT</strong>
                <div>
                  {`${proposal.createdBy?.firstName} ${
                    proposal.createdBy?.mi ? proposal.createdBy?.mi + " " : ""
                  }${proposal.createdBy?.lastName}`}
                  <img
                    src={
                      proposal.createdBy?.avatarUrl
                        ? proposal.createdBy?.avatarUrl
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5GfGomQwUzWsCqesYfd0TNe6MAg0cnsfiQ&usqp=CAU"
                    }
                    alt="Agent"
                    className="rounded-circle avatar ms-2"
                  />
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProposalProduct.propTypes = {
  proposal: PropTypes.shape({
    id: PropTypes.number.isRequired,
    client: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
    }),
    solicitationState: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    name: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
    status: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }),
    modifiedBy: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(
      PropTypes.shape({
        productInfo: PropTypes.number,
        productType: PropTypes.string,
        companyName: PropTypes.string,
        sku: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        termInYears: PropTypes.number,
        specifications: PropTypes.string,
        description: PropTypes.string.isRequired,
        isActive: PropTypes.bool.isRequired,
        image: PropTypes.string.isRequired,
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
        createdBy: PropTypes.number,
        modifiedBy: PropTypes.number,
      })
    ).isRequired,
  }).isRequired,
};

export default ProposalProduct;
