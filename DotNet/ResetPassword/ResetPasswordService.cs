using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class ResetPasswordService : IResetPasswordService
    {
        private IAuthenticationService<int> _authenticationService;
        private IDataProvider _dataProvider;

        public ResetPasswordService(IAuthenticationService<int> authService, IDataProvider dataProvider)
        {
            _authenticationService = authService;
            _dataProvider = dataProvider;
        }

        public bool ResetPassword(ResetPassword model, int userId)
        {
            bool result = false;
            string passwordFromDb = null;
            string procName = "[dbo].[Users_UpdatePassword]";
            string procName2 = "[dbo].[Users_SelectPasswordById]";
            string password = model.Password;
            string salt = BCrypt.BCryptHelper.GenerateSalt();
            string hashedPassword = BCrypt.BCryptHelper.HashPassword(password, salt);

            // retrieve hashed password from the DB by userID -> passwordFromDb 
            _dataProvider.ExecuteCmd(procName2, inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@UserId", userId);

            }, delegate (IDataReader reader, short set)
            {
                passwordFromDb = reader.GetSafeString(0);
            });
            bool isValidCredentials = BCrypt.BCryptHelper.CheckPassword(model.OldPassword, passwordFromDb);
                if( isValidCredentials == true )
                {
                    _dataProvider.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
                    {
                        col.AddWithValue("@UserId", userId);
                        col.AddWithValue("@Password", hashedPassword);

                    }, returnParameters: null);
                    result = true;
                }
                return result;
        }
    }
}
