using Yellowbrick.Models;
using Yellowbrick.Models.Proposals;
using Yellowbrick.Models.Requests.Proposals;
using System.Collections.Generic;

namespace Yellowbrick.Services.Interfaces
{
    public interface IProposalService
    {
        int Add(ProposalAddRequest model, int userId);
        void Update(ProposalUpdateRequest model, int userId);
        void UpdateStatus(int id, int statusId);
        Paged<Proposal> Get(int pageIndex, int pageSize, int clientId);
        Paged<Proposal> GetByClientId(int clientId, int proposalId, int pageIndex, int pageSize);
        Paged<Proposal> GetAll(int pageIndex, int pageSize);
        Paged<Proposal> Search(int pageIndex, int pageSize, string query);
    }
}