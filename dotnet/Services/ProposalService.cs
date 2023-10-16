using Microsoft.AspNetCore.Authentication.OAuth.Claims;
using Newtonsoft.Json;
using Yellowbrick.Data;
using Yellowbrick.Data.Providers;
using Yellowbrick.Models;
using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Domain.Product;
using Yellowbrick.Models.Proposals;
using Yellowbrick.Models.Requests.Proposals;
using Yellowbrick.Services.ClientServices;
using Yellowbrick.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace Yellowbrick.Services
{
    public class ProposalService : IProposalService
    {
        private readonly IDataProvider _data = null;
        private readonly IMapBaseUser _user = null;
        private readonly IClientService _client = null;
        private readonly ILookUpService _lookUp = null;
        public ProposalService(IDataProvider data, IMapBaseUser user, IClientService client, ILookUpService lookUp)
        {
            _data = data;
            _user = user;
            _client = client;
            _lookUp = lookUp;
        }

        public int Add(ProposalAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Proposals_Insert]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", System.Data.SqlDbType.Int);
                idOut.Direction = System.Data.ParameterDirection.Output;

                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }
        public void Update(ProposalUpdateRequest model, int userId)
        {

            string procName = "[dbo].[Proposals_Update]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
                AddCommonParams(model, col);

            }, returnParameters: null);
        }
        public void UpdateStatus(int id, int statusId)
        {
            string procName = "[dbo].[Proposals_UpdateStatus]";
            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@StatusId", statusId);

            }, returnParameters: null);
        }
        public Paged<Proposal> Get(int pageIndex, int pageSize, int clientId)
        {
            Paged<Proposal> pagedList = null;
            List<Proposal> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Proposals_Select_ByClientId]",
                (paramCollection) =>
                {
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                    paramCollection.AddWithValue("@clientId", clientId);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Proposal proposal = MapSingleProposal(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }

                    if (list == null)
                    {
                        list = new List<Proposal>();
                    }
                    list.Add(proposal);
                });
            if (list != null)
            {
                pagedList = new Paged<Proposal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Proposal> GetByClientId(int clientId, int proposalId, int pageIndex, int pageSize)
        {
            Paged<Proposal> pagedList = null;
            List<Proposal> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Proposals_Select_ByClientIdV2]",
                (paramCollection) =>
                {
                    paramCollection.AddWithValue("@clientId", clientId);
                    paramCollection.AddWithValue("@proposalId", proposalId);
                    paramCollection.AddWithValue("@PageIndex", pageIndex);
                    paramCollection.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Proposal proposal = MapSingleProposal(reader, ref startingIndex);
                   
                    string productsJson = reader.GetSafeString(startingIndex++);
                    List<Product> products = JsonConvert.DeserializeObject<List<Product>>(productsJson);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);

                    }
                    proposal.Products = products;

                    if (list == null)
                    {
                        list = new List<Proposal>();
                    }
                    list.Add(proposal);
                });
            if (list != null)
            {
                pagedList = new Paged<Proposal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Proposal> GetAll(int pageIndex, int pageSize)
        {
            Paged<Proposal> pagedList = null;
            List<Proposal> list = null;
            int totalCount = 0;

            _data.ExecuteCmd(
                "[dbo].[Proposals_SelectAll_Paginate]",
                (param) =>
                {
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                },
                (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Proposal proposal = MapSingleProposal(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }

                    if (list == null)
                    {
                        list = new List<Proposal>();
                    }

                    list.Add(proposal);
                }
                );
            if (list != null)
            {
                pagedList = new Paged<Proposal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public Paged<Proposal> Search(int pageIndex, int pageSize, string query)
        {
            Paged<Proposal> pagedList = null;
            List<Proposal> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Proposals_Paginated_Search]"
                , (col) =>
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                }, (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;
                    Proposal proposal = MapSingleProposal(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Proposal>();
                    }
                    list.Add(proposal);
                });
            if (list != null)
            {
                pagedList = new Paged<Proposal>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        private Proposal MapSingleProposal(IDataReader reader, ref int startingIndex)
        {
            Proposal proposal = new Proposal();

            proposal.Id = reader.GetSafeInt32(startingIndex++);
            proposal.Client = _client.MapClientBase(reader, ref startingIndex);
            proposal.SolicitationState = _lookUp.MapSingleLookUp(reader, ref startingIndex);
            proposal.Name = reader.GetSafeString(startingIndex++);
            proposal.Notes = reader.GetSafeString(startingIndex++);
            proposal.Status = _lookUp.MapSingleLookUp(reader, ref startingIndex);
            proposal.CreatedBy = _user.MapBaseUser(reader, ref startingIndex);
            proposal.ModifiedBy = reader.GetSafeInt32(startingIndex++);
            proposal.DateCreated = reader.GetSafeDateTime(startingIndex++);
            proposal.DateModified = reader.GetSafeDateTime(startingIndex++);

            return proposal;
        }
        private static void AddCommonParams(ProposalAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@ClientId", model.ClientId);
            col.AddWithValue("@SolicitationStateId", model.SolicitationStateId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Notes", model.Notes);
        }
    }
}