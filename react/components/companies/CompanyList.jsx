import React, { useState, useEffect } from "react";
import CompanyCard from "./CompanyCard";
import debug from "sabio-debug";
import companyService from "services/companyService";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "./companylist.css";
const _logger = debug.extend("CompanyList");

function CompanyList() {
  const [pageData, setPageData] = useState({
    list: [],
    mappedList: [],
    pageSize: 8,
    totalCount: 0,
    currentPage: 1,
    searchQuery: "",
  });

  useEffect(() => {
    if (pageData.searchQuery) {
      companyService
        .searchByCompany(
          pageData.currentPage - 1,
          pageData.pageSize,
          pageData.searchQuery
        )
        .then(onGetSuccess)
        .catch(onSearchError);
    } else {
      companyService
        .selectAll(pageData.currentPage - 1, pageData.pageSize)
        .then(onGetSuccess)
        .catch(onSelectAllError);
    }
  }, [pageData.currentPage, pageData.searchQuery]);

  const onGetSuccess = (response) => {
    const { totalCount, pagedItems } = response.item;
    setPageData((prevState) => {
      const cList = { ...prevState };
      cList.list = pagedItems;
      cList.mappedList = pagedItems.map(companyMap);
      cList.totalCount = totalCount;

      return cList;
    });
  };

  const onSelectAllError = (error) => {
    _logger("Pagination error:", error);
  };

  const onSearchError = (error) => {
    _logger("Search error:", error);
  };

  const handleSearch = (evt) => {
    const { value } = evt.target;

    setPageData((prevState) => {
      let newObj = { ...prevState };
      newObj.searchQuery = value;
      newObj.currentPage = 1;
      return newObj;
    });
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      let newObj = { ...prevState };
      newObj.currentPage = page;
      return newObj;
    });
  };

  const companyMap = (aCompany) => (
    <CompanyCard company={aCompany} key={aCompany.id} />
  );

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Companies</h1>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item active">Companies</li>
              </ol>
            </div>

            <div className="search-bar">
              <div className="input-group">
                <span className="input-group-text text-muted">
                  <i className="fe fe-search" />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by Company Name"
                  onChange={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">{pageData.mappedList}</div>
      </div>

      <div className="active-page inactive-page carat-style hover-color pb-3 mt-2">
        <Pagination
          onChange={onPageChange}
          current={pageData.currentPage}
          total={pageData.totalCount}
          pageSize={pageData.pageSize}
          locale={locale}
          className="text-center"
        />
      </div>
    </React.Fragment>
  );
}

export default CompanyList;
