using Yellowbrick.Models.Domain;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yellowbrick.Models.Requests.Proposals
{
    public class ProposalAddRequest
    {
        [Required]
        [Range(1, Int32.MaxValue)]
        public int ClientId { get; set; }
        [Required]
        [Range(1, Int32.MaxValue)]
        public int SolicitationStateId { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Notes { get; set; }
    }
}
