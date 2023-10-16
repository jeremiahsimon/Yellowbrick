import axios from "axios";
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { clientUrl: `${API_HOST_PREFIX}/api/clients` };

const getProposalById = (clientId, proposalId, idx, size) => {
  const config = {
    method: "GET",
    url: `${endpoint.clientUrl}/${clientId}/proposals/${proposalId}/?pageIndex=${idx}&pageSize=${size}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
5
const clientService = {
  getProposalById,
};

export default clientService;
