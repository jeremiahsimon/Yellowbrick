using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Protocols.OpenIdConnect;
using NuGet.Protocol.Core.Types;
using Yellowbrick.Models;
using Yellowbrick.Models.Domain;
using Yellowbrick.Models.Requests.Companies;
using Yellowbrick.Models.Requests.Locations;
using Yellowbrick.Services;
using Yellowbrick.Services.Interfaces;
using Yellowbrick.Web.Controllers;
using Yellowbrick.Web.Models.Responses;
using System;
using System.Collections.Generic;
using System.Data;

namespace Yellowbrick.Web.Api.Controllers
{
    [Route("api/companies")]
    [ApiController]
    public class CompanyApiController : BaseApiController
    {
        private ICompanyService _CompanyService = null;
        private IAuthenticationService<int> _AuthService = null;

        public CompanyApiController(
             ICompanyService service
            , IAuthenticationService<int> authService
            , ILogger<CompanyApiController> logger
            ) : base(logger)
        {
            _CompanyService = service;
            _AuthService = authService;
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Insert(CompanyAddRequest model)
        {
            ObjectResult result = null;

            try

            {
                int userId = _AuthService.GetCurrentUserId();
                int id = _CompanyService.Insert(model, userId);
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
        public ActionResult<ItemResponse<int>> Update(CompanyUpdateRequest model)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                int userId = _AuthService.GetCurrentUserId();
                _CompanyService.Update(model, userId);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(code, response);
        }

        [HttpGet]
        public ActionResult<ItemsResponse<Company>> SelectAll()
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                List<Company> list = _CompanyService.SelectAll();

                if (list == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemsResponse<Company> { Items = list };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Company>>> SelectPaginate(int pageIndex, int pageSize)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Paged<Company> paged = _CompanyService.SelectPaginate(pageIndex, pageSize);

                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Company>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete_ById(int id)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                _CompanyService.Delete_ById(id);
                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message);
            }
            return StatusCode(code, response);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Company>> Select_ById(int id)
        {
            int code = 200;
            BaseResponse response = null;

            try
            {
                Company company = _CompanyService.Select_ById(id);

                if (company == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Company> { Item = company };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }
            return StatusCode(code, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Company>>> Search(int pageIndex, int pageSize, string query)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<Company> paged = _CompanyService.Search(pageIndex, pageSize, query);

                if (paged == null)
                {
                    code = 404;
                    response = new ErrorResponse("Application resource not found");
                }
                else
                {
                    response = new ItemResponse<Paged<Company>> { Item = paged };
                }
            }
            catch (Exception ex)
            {
                code = 500;
                response = new ErrorResponse(ex.Message.ToString());
                base.Logger.LogError(ex.ToString());
            }
            return StatusCode(code, response);
        }
    }
}
