import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { companyUrl: `${API_HOST_PREFIX}/api/companies` };

const add = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.companyUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const selectAll = (idx, size) => {
  const config = {
    method: "GET",
    url: `${endpoint.companyUrl}/paginate/?pageIndex=${idx}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchByCompany = (idx, size, query) => {
  const config = {
    method: "GET",
    url: `${endpoint.companyUrl}/search/?pageIndex=${idx}&pageSize=${size}&query=${query}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const companyService = {
  add, selectAll, searchByCompany,
};

export default companyService;
