using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Yellowbrick.Models.Requests.Companies
{
    public class CompanyAddRequest
    {
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Name { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Headline { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Description { get; set; }
        [Required]
        [StringLength(200, MinimumLength = 2)]
        public string Logo { get; set; }
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string Phone { get; set; }
        [Required]
        [Url, StringLength(255, MinimumLength = 2)]
        public string SiteUrl { get; set; }
    }
}
