using DAL.Core;
using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class Customer : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public int VillageId { get; set; }
        public Village Village { get; set; }
        public Gender Gender { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }


        public ICollection<Order> Orders { get; set; }
    }

    public class Village : AuditableEntity {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CityId { get; set; }
        public City City { get; set; }

        public ICollection<Customer> Customers { get; set; }
        public ICollection<Organization> Organizations { get; set; }        
    }

    public class City : AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string State { get; set; }

        public ICollection<Village> Villages { get; set; }
    }
}
