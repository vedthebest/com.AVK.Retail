using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class Organization:AuditableEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }

        public int VillageId { get; set; }
        public Village Village { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public ICollection<Loan> Loans { get; set; }
        public ICollection<Order> Orders { get; set; }
    }
}