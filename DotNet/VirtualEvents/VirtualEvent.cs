using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class VirtualEvent
    {
        public int Id { get; set; }
        public int EventTypeId { get; set; }
        public string EventTypeName { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public string Description { get; set; }
        public int VirtualTypeId { get; set; }
        public string VirtualTypeName { get; set; }
        public string ImageUrl { get; set; }
        public string ExternalSiteUrl { get; set; }
        public bool IsFree { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public DateTime? DateStart { get; set; }
        public DateTime? DateEnd { get; set; }
        public int EventStatusId { get; set; }
       
    }
}
