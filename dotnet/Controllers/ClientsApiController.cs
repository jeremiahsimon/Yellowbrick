
using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Logging;
using Yellowbrick.Models;
using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Proposals;
using Yellowbrick.Models.Requests.ClientRequests;
using Yellowbrick.Services;
using Yellowbrick.Services.ClientServices;
using Yellowbrick.Services.Interfaces;
using Yellowbrick.Web.Controllers;
using Yellowbrick.Web.Models.Responses;
using System;

namespace Yellowbrick.Web.Api.Controllers.ClientControllers
{
    [Route("api/clients")]
    [ApiController]
    public class ClientsApiController : BaseApiController
    {
        private IClientService _service = null;
        private IProposalService _proposalService = null;
        private IAuthenticationService<int> _authService = null;
        public ClientsApiController(IClientService service,
            IProposalService proposalService,
            IAuthenticationService<int> authService,
            ILogger<ClientsApiController> logger) : base(logger)
        {
            _authService = authService;
            _service = service;
            _proposalService = proposalService;
        }

        [HttpGet("{id:int}/proposals/{proposalId:int}")]
        public ActionResult<ItemResponse<Paged<Proposal>>> GetProposalByClientId(int id, int proposalId, int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<Proposal> paged = _proposalService.GetByClientId(id, proposalId, pageIndex, pageSize);

                if (paged == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource Not Found");
                }
                else
                {
                    response = new ItemResponse<Paged<Proposal>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

    }
}