using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.VirtualEvents;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/virtualevents")]
    [ApiController]
    public class VirtualEventApiController : BaseApiController
    {
        private IVirtualEventsService _service = null;
        private IAuthenticationService<int> _authService = null;
        public VirtualEventApiController(IVirtualEventsService service, ILogger<VirtualEventApiController> logger
            , IAuthenticationService<int> authService) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<VirtualEvent>> Get(int id)
        {
            int iCode = 200;
            BaseResponse response = null;
            try
            {
                VirtualEvent virtualEvent = _service.Get(id);
                if (virtualEvent == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application Resource not Found");
                }
                else
                {
                    response = new ItemResponse<VirtualEvent> { Item = virtualEvent };
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

        [HttpGet]
        public ActionResult<ItemsResponse<Paged<VirtualEvent>>> GetAll(int pageIndex, int pageSize)
        {
            int responseCode = 200;
            BaseResponse responseData = null;

            try
            {
                Paged<VirtualEvent> paged = _service.GetAll(pageIndex, pageSize);

                if (paged == null)
                {
                    responseCode = 404;
                    responseData = new ErrorResponse("Item was not found");
                }
                else
                    responseData = new ItemResponse<Paged<VirtualEvent>> { Item = paged };
            }
            catch (Exception exception)
            {
                responseCode = 500;
                responseData = new ErrorResponse(exception.Message);
                base.Logger.LogError(exception.ToString());
            }

            return StatusCode(responseCode, responseData);
        }

        [HttpPut("virtualevent/{id:int}/status/{statusId:int}")]
        public ActionResult<SuccessResponse> ActivateEvent(int id, int statusId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                _service.ActivateEvent(id, statusId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }

        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(VirtualEventAddRequest model)
        {
            ObjectResult result = null;
            try
            {
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

        [HttpPost("wizard")]
        public ActionResult<ItemResponse<int>> WizardAdd(VirtualEventWizardAddRequest model)
        {
            int iCode = 201;
            BaseResponse response = null;
            try
            {
                int userId = _authService.GetCurrentUserId();
                int id = _service.WizardAdd(model, userId);
                response = new ItemResponse<int> { Item = id };
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Server Error {ex.Message}");
            }
            return StatusCode(iCode, response);
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(VirtualEventUpdateRequest model)
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