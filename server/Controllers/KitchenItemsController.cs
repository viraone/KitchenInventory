using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RPI_Database.Data;
using RPI_Database.Models;

namespace RPI_Database.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KitchenItemsController : ControllerBase
    {
        private readonly KitchenInventoryContext _context;

        public KitchenItemsController(KitchenInventoryContext context)
        {
            _context = context; // 🧑‍🍳 Line cook gets access to fridge
        }

        // GET: api/KitchenItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemInKitchenRefrigerator>>> GetKitchenItems()
        {
            return await _context.KitchenItems.ToListAsync();
        }

        // GET: api/KitchenItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemInKitchenRefrigerator>> GetItem(int id)
        {
            var item = await _context.KitchenItems.FindAsync(id);

            if (item == null)
                return NotFound();

            return item;
        }

        // POST: api/KitchenItems
        [HttpPost]
        public async Task<ActionResult<ItemInKitchenRefrigerator>> PostItem(ItemInKitchenRefrigerator item)
        {
            _context.KitchenItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        // PUT: api/KitchenItems/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, ItemInKitchenRefrigerator item)
        {
            if (id != item.Id)
                return BadRequest();

            _context.Entry(item).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.KitchenItems.Any(e => e.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // DELETE: api/KitchenItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.KitchenItems.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.KitchenItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/KitchenItems/{id}/mark-used
        [HttpPut("{id}/mark-used")]
        public async Task<IActionResult> MarkAsUsed(int id)
        {
            var item = await _context.KitchenItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.Quantity = 0; // simulate marking all used
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/KitchenItems/{id}/mark-expired
        [HttpPut("{id}/mark-expired")]
        public async Task<IActionResult> MarkAsExpired(int id)
        {
            var item = await _context.KitchenItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.Status = "Expired";
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/KitchenItems/{id}/reset-status
        [HttpPut("{id}/reset-status")]
        public async Task<IActionResult> ResetStatus(int id)
        {
            var item = await _context.KitchenItems.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            item.Status = "Available";
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
