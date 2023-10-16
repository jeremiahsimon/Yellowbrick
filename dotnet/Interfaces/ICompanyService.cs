using Yellowbrick.Models;
using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Requests.Companies;
using System.Collections.Generic;

namespace Yellowbrick.Services.Interfaces
{
    public interface ICompanyService
    {
        int Insert(CompanyAddRequest model, int userId);
        void Update(CompanyUpdateRequest model, int userId);
        List<Company> SelectAll();
        Paged<Company> SelectPaginate(int pageIndex, int pageSize);
        void Delete_ById(int id);
        Company Select_ById(int id);
        Paged<Company> Search(int pageIndex, int pageSize, string query);
    }
}