using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;
using Yellowbrick.Models;
using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Proposals;
using Yellowbrick.Models.Requests.Proposals;
using Yellowbrick.Services;
using Yellowbrick.Services.Interfaces;
using Yellowbrick.Web.Controllers;
using Yellowbrick.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Drawing.Printing;

namespace Yellowbrick.Web.Api.Controllers
{
    [Route("api/proposals")]
    [ApiController]
    public class ProposalApiController : BaseApiController
    {
        private IProposalService _service = null;
        private IAuthenticationService<int> _authService = null;

        public ProposalApiController(IProposalService service, ILogger<ProposalApiController> logger, IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ProposalAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }
        [HttpPut("{id:int}")]
        public ActionResult<SuccessResponse> Update(ProposalUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }
        [HttpPut("updateStatus/{id:int}/{statusId:int}")]
        public ActionResult<SuccessResponse> UpdateStatus(int id, int statusId)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.UpdateStatus(id, statusId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }
        [HttpGet("{clientId:int}/paginate")]
        public ActionResult<ItemResponse<Paged<Proposal>>> GetByClientId(int pageIndex, int pageSize, int clientId)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                Paged<Proposal> paged = _service.Get(pageIndex, pageSize, clientId);

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
        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Proposal>>> GetAll(int pageIndex, int pageSize)
        {
            ActionResult result = null;

            try
            {
                Paged<Proposal> paged = _service.GetAll(pageIndex, pageSize);

                if (paged == null)
                {
                    result = NotFound404(new ErrorResponse("Records Not Found"));
                }
                else
                {
                    ItemResponse<Paged<Proposal>> response = new ItemResponse<Paged<Proposal>>();
                    response.Item = paged;
                    result = Ok200(response);
                }
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                result = StatusCode(500, new ErrorResponse(ex.Message.ToString()));
            }

            return result;
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Proposal>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Proposal> paged = _service.Search(pageIndex, pageSize, query);

                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Proposal>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.ToString());
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}