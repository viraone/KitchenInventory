namespace RPI_Database.Models;

public class ItemInKitchenRefrigerator
{
    public int Id { get; set; }
    public string ItemName { get; set; } = "";
    public int Quantity { get; set; }
    public string Unit { get; set; } = "";
    public string SerialNumber { get; set; } = "";
    public DateTime ExpirationDate { get; set; }
    public string StorageTemperature { get; set; } = "";
    public string RefrigeratorZone { get; set; } = "";
    public DateTime DateReceived { get; set; }
    public string SupplierName { get; set; } = "";
    public string Status { get; set; } = "Available"; // default value

}
