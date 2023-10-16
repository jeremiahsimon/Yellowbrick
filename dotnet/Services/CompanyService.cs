using Yellowbrick.Data.Providers;
using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Requests.Mortgages;
using Yellowbrick.Services.ClientServices;
using Yellowbrick.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Yellowbrick.Models.Requests.Companies;
using Yellowbrick.Data;
using Yellowbrick.Models;
using System.Reflection;
using sib_api_v3_sdk.Model;
using Company = Yellowbrick.Models.Domain.Company;

namespace Yellowbrick.Services
{
    public class CompanyService : ICompanyService
    {
        IDataProvider _data = null;
        IMapBaseUser _mapUser = null;
        ILookUpService _lookUpService = null;
        public CompanyService(IDataProvider data
            , IMapBaseUser mapUser, ILookUpService lookUpService)
        {
            _data = data;
            _mapUser = mapUser;
            _lookUpService = lookUpService;
        }
        public int Insert(CompanyAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[Companies_Insert]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                SqlParameter output = new SqlParameter("@Id", SqlDbType.Int);
                output.Direction = ParameterDirection.Output;
                col.Add(output);

            }, delegate (SqlParameterCollection returnCol)
            {
                object insertedCompanyId = returnCol["@Id"].Value;
                int.TryParse(insertedCompanyId.ToString(), out id);
            });
            return id;
        }
        public void Update(CompanyUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Companies_Update]";
            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@Id", model.Id);
                col.AddWithValue("@UserId", userId);
            }, null);
        }
        public List<Company> SelectAll()
        {
            List<Company> list = null;
            string procName = "[dbo].[Companies_SelectAll]";
            _data.ExecuteCmd(procName, inputParamMapper: null, singleRecordMapper: delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;

                Company company = MapSingleCompany(reader, ref startingIndex);

                if (list == null)
                {
                    list = new List<Company>();
                }
                list.Add(company);
            });
            return list;
        }
        public Paged<Company> SelectPaginate(int pageIndex, int pageSize)
        {
            Paged<Company> pagedList = null;
            List<Company> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Companies_SelectPaginate]"
                , (col) =>
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                }, (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;

                    Company company = MapSingleCompany(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex);
                    }
                    if (list == null)
                    {
                        list = new List<Company>();
                    }
                    list.Add(company);
                });

            if (list != null)
            {
                pagedList = new Paged<Company>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        public void Delete_ById(int id)
        {
            string procName = "[dbo].[Companies_Delete_ById]";

            _data.ExecuteNonQuery(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, null);
        }
        public Company Select_ById(int id)
        {
            string procName = "[dbo].[Companies_Select_ById]";
            Company company = null;

            _data.ExecuteCmd(procName, delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                int startingIndex = 0;
                
                company = MapSingleCompany(reader, ref startingIndex);
            });
            return company;
        }
        public Paged<Company> Search(int pageIndex, int pageSize, string query)
        {
            Paged<Company> pagedList = null;
            List<Company> list = null;
            int totalCount = 0;
            _data.ExecuteCmd("[dbo].[Companies_Search]"
                , (col) =>
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@Query", query);
                }, (reader, recordSetIndex) =>
                {
                    int startingIndex = 0;

                    Company company = MapSingleCompany (reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (list == null)
                    {
                        list = new List<Company>();
                    }
                    list.Add(company);
                });

            if (list != null)
            {
                pagedList = new Paged<Company>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        private Company MapSingleCompany(IDataReader reader, ref int startingIndex)
        {
            Company company = new Company();

            company.Id = reader.GetSafeInt32(startingIndex++);
            company.Name = reader.GetSafeString(startingIndex++);
            company.Headline = reader.GetSafeString(startingIndex++);
            company.Description = reader.GetSafeString(startingIndex++);
            company.Logo = reader.GetSafeString(startingIndex++);
            company.Phone = reader.GetSafeString(startingIndex++);
            company.SiteUrl = reader.GetSafeString(startingIndex++);
            company.Status = _lookUpService.MapSingleLookUp(reader, ref startingIndex);
            company.DateCreated = reader.GetSafeDateTime(startingIndex++);
            company.DateModified = reader.GetSafeDateTime(startingIndex++);
            company.CreatedBy = _mapUser.MapBaseUser(reader, ref startingIndex);

            return company;
        }
        private static void AddCommonParams(CompanyAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Headline", model.Headline);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Logo", model.Logo);
            col.AddWithValue("@Phone", model.Phone);
            col.AddWithValue("@SiteUrl", model.SiteUrl);
        }

    }
}
