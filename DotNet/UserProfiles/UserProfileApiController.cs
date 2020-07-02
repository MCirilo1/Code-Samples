using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.UserProfiles;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/userprofiles")]
    [ApiController]
    public class UserProfileApiController : BaseApiController
    {
        private IUserProfilesService _service = null;
        private IAuthenticationService<int> _authService = null;
        public UserProfileApiController(IUserProfilesService service
            , ILogger<UserProfileApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("search")]
        public ActionResult<ItemsResponse<Paged<UserProfile>>> Search(int pageIndex, int pageSize, string searchString)
        {
            int code = 200;
            BaseResponse response = null;
            try
            {
                Paged<UserProfile> page = _service.Search(pageIndex, pageSize, searchString);
                if (page == null)
                {
                    code = 404;
                    response = new ErrorResponse("App Resource not Found.");
                }
                else
                {
                    response = new ItemResponse<Paged<UserProfile>> { Item = page };
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

        [HttpGet]
        public ActionResult<ItemsResponse<Paged<UserProfile>>> GetAll(int pageIndex, int pageSize)
        {
            int responseCode = 200;
            BaseResponse responseData = null;

            try
            {
                Paged<UserProfile> paged = _service.GetAll(pageIndex, pageSize);

                if (paged == null)
                {
                    responseCode = 404;
                    responseData = new ErrorResponse("Item was not found");
                }
                else
                    responseData = new ItemResponse<Paged<UserProfile>> { Item = paged };
            }
            catch (Exception exception)
            {
                responseCode = 500;
                responseData = new ErrorResponse(exception.Message);
                base.Logger.LogError(exception.ToString());
            }

            return StatusCode(responseCode, responseData);
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<UserProfile>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                UserProfile userProfile = _service.Get(id);
                if (userProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not Found");
                }
                else
                {
                    response = new ItemResponse<UserProfile> { Item = userProfile };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPut("user/{id:int}/status/{statusId:int}")]
        public ActionResult<SuccessResponse> ActivateUser(int id, int statusId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.ActivateUser(id, statusId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("createdby")]
        public ActionResult<ItemResponse<UserProfile>> GetByCreatedBy(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();

                UserProfile userProfile = _service.GetByCreatedBy(pageIndex, pageSize, userId);
                if (userProfile == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not Found");
                }
                else
                {
                    response = new ItemResponse<UserProfile> { Item = userProfile };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse($"Generic Error: {ex.Message}");
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(UserProfileAddRequest model)
        {
            ObjectResult result = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.Add(model);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };
                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);
                result = StatusCode(500, response);
            }
            return result;

        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(UserProfileUpdateRequest model)
        {
            _service.Update(model);
            SuccessResponse response = new SuccessResponse();
            return Ok(response);
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            _service.Delete(id);
            SuccessResponse response = new SuccessResponse();
            return Ok(response);
        }
    }
}