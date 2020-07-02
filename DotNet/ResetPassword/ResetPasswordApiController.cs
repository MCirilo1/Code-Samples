using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models.Domain;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/resetpassword")]
    [ApiController]
    public class ResetPasswordApiController : BaseApiController
    {
        private IResetPasswordService _service = null;
        private IAuthenticationService<int> _authService = null;
        
        public ResetPasswordApiController(IResetPasswordService service
        , ILogger<ResetPasswordApiController> logger
        , IAuthenticationService<int> authService): base(logger)
        {
            _service = service;
            _authService = authService;
        }


        [HttpPut]
        public async Task<ActionResult<ItemResponse<int>>> ResetPassword(ResetPassword model)
        {
            int iCode = 200;
            BaseResponse response = null;
            int userId = 0;
            bool isSuccessful = false;
            

            try
            {
                userId = _authService.GetCurrentUserId();
                isSuccessful = _service.ResetPassword(model, userId);
                if (isSuccessful == true)
                {
                    try
                    {
                        await _authService.LogOutAsync();
                    }
                    catch (Exception ex)
                    {
                        iCode = 500;
                        base.Logger.LogError(ex.ToString());
                        response = new ErrorResponse($"Logout Error: {ex.Message}");
                    }
                    response = new SuccessResponse();

                } else
                {
                    iCode = 404;
                    response = new ErrorResponse("Resource Not Found");
                }
                                 
            }
            catch (Exception ex1)
            {
                iCode = 500;
                base.Logger.LogError(ex1.ToString());
                response = new ErrorResponse($"Server Error: {ex1.Message}");
            }

            return StatusCode(iCode, response);
        }

    }

}

    