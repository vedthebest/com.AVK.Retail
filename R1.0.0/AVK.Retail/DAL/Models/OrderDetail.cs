namespace DAL.Models
{
    public class OrderDetail : AuditableEntity
    {
        public int Id { get; set; }
        public decimal UnitPrice { get; set; }
        public Unit Unit { get; set; }
        public decimal Quantity { get; set; }
        public decimal Discount { get; set; }


        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int OrderId { get; set; }
        public Order Order { get; set; }
    }


    public enum Unit
    {
        MG = 0,
        G = 1,
        KG = 2
    }
}
