using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yellowbrick.Models.Requests.Companies
{
    public class CompanyUpdateRequest : CompanyAddRequest, IModelIdentifier
    {
        public int Id { get; set; }

    }
}
