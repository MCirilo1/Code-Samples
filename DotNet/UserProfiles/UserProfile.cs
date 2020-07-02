using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class UserProfile : BaseUserProfile
    {
        public int Id { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int StatusId { get; set; }

        public string Status { get; set; }


    }
}
