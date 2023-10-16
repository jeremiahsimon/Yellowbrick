using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yellowbrick.Models.Requests.Proposals
{
    public class ProposalUpdateRequest : ProposalAddRequest , IModelIdentifier
    {
        public int Id { get; set; }
    }
}
