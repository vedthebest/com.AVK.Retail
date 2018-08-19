using System;
using System.Collections.Generic;

namespace DAL.Models
{
    public class Loan : AuditableEntity
    {
        public int Id { get; set; }

        public string Comments { get; set; }

        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }

        public decimal UnpaidAmount { get; set; }
        public decimal PaidAmount { get; set; }

        public Decimal Interest { get; set; }

        public DateTime LoanStartDate { get; set; }
        public DateTime LoanEndDate { get; set; }

        public DateTime MaxLoanPeriod { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        public string CashierId { get; set; }
        public ApplicationUser Cashier { get; set; }

        public int CustomerId { get; set; }
        public Customer Customer { get; set; }

        public int OrganizationId { get; set; }
        public Organization Organization { get; set; }

        public ICollection<OrderDetail> OrderDetails { get; set; }
    }
}