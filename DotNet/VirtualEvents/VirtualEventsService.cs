using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests;
using Sabio.Models.Requests.VirtualEvents;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class VirtualEventsService : IVirtualEventsService
    {
        IDataProvider _data = null;

        public VirtualEventsService(IDataProvider data)
        {
            _data = data;
        }

        public VirtualEvent Get(int id)
        {
            string procname = "[dbo].[VirtualEvents_SelectById]";
            VirtualEvent vEvent = null;

            _data.ExecuteCmd(procname, delegate (SqlParameterCollection parameterCollection)
            {
                parameterCollection.AddWithValue("@Id", id);
            }, delegate (IDataReader reader, short set)
            {
                vEvent = VirtualEventMapper(reader);

            }
            );
            return vEvent;
        }

        public Paged<VirtualEvent> GetAll(int pageIndex, int pageSize)
        {
            Paged<VirtualEvent> pagedList = null;
            List<VirtualEvent> list = null;
            int totalCount = 0;
            _data.ExecuteCmd(
                "[dbo].[VirtualEvents_SelectAllDetails]",
                (param) =>
                {
                    param.AddWithValue("@pageIndex", pageIndex);
                    param.AddWithValue("@pageSize", pageSize);
                },
            (reader, recordSetIndex) =>
            {
                VirtualEvent vEvent = VirtualEventMapper(reader);
                if (totalCount == 0)
                {
                    totalCount = reader.GetSafeInt32(16);

                }

                if (list == null)
                {
                    list = new List<VirtualEvent>();
                }
                list.Add(vEvent);
            });
            if (list != null)
            {
                pagedList = new Paged<VirtualEvent>(list, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public void ActivateEvent(int id, int statusId)
        {
            string procName = "[dbo].[VirtualEvents_UpdateStatus]";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@EventStatusId", statusId);
            }, returnParameters: null);
        }

        public int Add(VirtualEventAddRequest model)
        {
            int id = 0;

            string procName = "[dbo].[VirtualEvents_Insert]";

            _data.ExecuteNonQuery(procName,
               inputParamMapper: delegate (SqlParameterCollection col)
               {
                   VirtualEventParams(model, col);

                   SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                   idOut.Direction = ParameterDirection.Output;

                   col.Add(idOut);

               },
               returnParameters: delegate (SqlParameterCollection returnCol)
               {

                   object oId = returnCol["@Id"].Value;

                   int.TryParse(oId.ToString(), out id);

               });

            return id;
        }

        public int WizardAdd(VirtualEventWizardAddRequest model, int userId)
        {
            int id = 0;
            string procName = "[dbo].[VirtualEventWizard_Insert]";
            _data.ExecuteNonQuery(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    VirtualEventWizardParamMapper(model, col, userId);

                    SqlParameter idOut = new SqlParameter("@OutputId", SqlDbType.Int);
                    idOut.Direction = ParameterDirection.Output;

                    col.Add(idOut);

                }, returnParameters: delegate (SqlParameterCollection returnCollection)
                {
                    object oId = returnCollection["@OutputId"].Value;
                    int.TryParse(oId.ToString(), out id);

                });
            return id;
        }

        public void Update(VirtualEventUpdateRequest model)
        {
            string procName = "[dbo].[VirtualEvents_Update]";

            _data.ExecuteNonQuery(procName,
               inputParamMapper: delegate (SqlParameterCollection col)
               {

                   VirtualEventParams(model, col);
                   col.AddWithValue("@Id", model.Id);

               },
               returnParameters: null);
        }

        public VirtualEvent Delete(int Id)
        {
            string procName = "[dbo].[VirtualEvents_Delete]";


            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {

                col.AddWithValue("@Id", Id);

            });
            return null;
        }





        private static void VirtualEventParams(VirtualEventAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@EventTypeId", model.EventTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@VirtualTypeId", model.VirtualTypeId);
            col.AddWithValue("@EventStatusId", model.EventStatusId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@ExternalSiteUrl", model.ExternalSiteUrl);
            col.AddWithValue("@IsFree", model.IsFree);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
        }

        private static VirtualEvent VirtualEventMapper(IDataReader reader)
        {
            VirtualEvent vEvent = new VirtualEvent();
            int startingIndex = 0;
            vEvent.Id = reader.GetSafeInt32(startingIndex++);
            vEvent.EventTypeId = reader.GetSafeInt32(startingIndex++);
            vEvent.EventTypeName = reader.GetSafeString(startingIndex++);
            vEvent.Name = reader.GetSafeString(startingIndex++);
            vEvent.Summary = reader.GetSafeString(startingIndex++);
            vEvent.Description = reader.GetSafeString(startingIndex++);
            vEvent.VirtualTypeId = reader.GetSafeInt32(startingIndex++);
            vEvent.VirtualTypeName = reader.GetSafeString(startingIndex++);
            vEvent.ImageUrl = reader.GetSafeString(startingIndex++);
            vEvent.ExternalSiteUrl = reader.GetSafeString(startingIndex++);
            vEvent.IsFree = reader.GetSafeBool(startingIndex++);
            vEvent.DateCreated = reader.GetSafeDateTime(startingIndex++);
            vEvent.DateModified = reader.GetSafeDateTime(startingIndex++);
            vEvent.DateStart = reader.GetSafeDateTime(startingIndex++);
            vEvent.DateEnd = reader.GetSafeDateTime(startingIndex++);
            vEvent.EventStatusId = reader.GetSafeInt32(startingIndex);

            return vEvent;
        }

        private static void VirtualEventWizardParamMapper(VirtualEventWizardAddRequest model, SqlParameterCollection col, int userId)
        {
            //Event
            col.AddWithValue("@EventTypeId", model.EventTypeId);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Summary", model.Summary);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@VirtualTypeId", model.VirtualTypeId);
            col.AddWithValue("@EventStatusId", model.EventStatusId);
            col.AddWithValue("@ImageUrl", model.ImageUrl);
            col.AddWithValue("@ExternalSiteUrl", model.ExternalSiteUrl);
            col.AddWithValue("@IsFree", model.IsFree);
            col.AddWithValue("@DateStart", model.DateStart);
            col.AddWithValue("@DateEnd", model.DateEnd);
            //User
            col.AddWithValue("@UserId", userId);

        }
    }
}
