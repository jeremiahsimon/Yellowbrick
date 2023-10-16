using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Domain.Lookups;
using Yellowbrick.Models.Domain.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yellowbrick.Models.Proposals
{
    public class Proposal
    {
        public int Id { get; set; }
        public ClientBase Client { get; set; }
        public LookUp SolicitationState { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public LookUp Status { get; set; }
        public BaseUser CreatedBy { get; set; }
        public int ModifiedBy { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public List<Product> Products { get; set; }
    }
}
