using Microsoft.EntityFrameworkCore;
using RPI_Database.Models;

namespace RPI_Database.Data
{
    public class KitchenInventoryContext : DbContext
    {
        public KitchenInventoryContext(DbContextOptions<KitchenInventoryContext> options) : base(options) { }

        public DbSet<ItemInKitchenRefrigerator> KitchenItems { get; set; }
    }
}
