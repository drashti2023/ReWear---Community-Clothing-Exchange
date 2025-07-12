using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        #region Configuration Fields
        private readonly ReWearContext _context;

        public ItemController(ReWearContext context)
        {
            _context = context;
        }
        #endregion

        #region GetAllItems
        [HttpGet]
        public IActionResult GetAllItems()
        {
            try
            {
                var items = _context.Items
                    .Include(i => i.User)
                    .Include(i => i.Airecommendations)
                    .Include(i => i.SwapRequests)
                    .ToList();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving items: {ex.Message}");
            }
        }
        #endregion

        #region GetItemById
        [HttpGet("{id}")]
        public IActionResult GetItemById(int id)
        {
            try
            {
                var item = _context.Items
                    .Include(i => i.User)
                    .Include(i => i.Airecommendations)
                    .Include(i => i.SwapRequests)
                    .FirstOrDefault(i => i.ItemId == id);

                if (item == null)
                    return NotFound();

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving item: {ex.Message}");
            }
        }
        #endregion

        #region CreateItem
        [HttpPost]
        public IActionResult CreateItem(Item item)
        {
            try
            {
                _context.Items.Add(item);
                _context.SaveChanges();
                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating item: {ex.Message}");
            }
        }
        #endregion

        #region UpdateItem
        [HttpPut("{id}")]
        public IActionResult UpdateItem(int id, Item item)
        {
            try
            {
                if (id != item.ItemId)
                    return BadRequest("Item ID mismatch.");

                var existingItem = _context.Items.Find(id);
                if (existingItem == null)
                    return NotFound();

                existingItem.Title = item.Title;
                existingItem.Description = item.Description;
                existingItem.Images = item.Images;
                existingItem.Category = item.Category;
                existingItem.Size = item.Size;
                existingItem.Condition = item.Condition;
                existingItem.Color = item.Color;
                existingItem.Brand = item.Brand;
                existingItem.Tags = item.Tags;
                existingItem.Points = item.Points;
                existingItem.UserId = item.UserId;
                existingItem.UserName = item.UserName;
                existingItem.UserAvatar = item.UserAvatar;
                existingItem.Location = item.Location;
                existingItem.Rating = item.Rating;
                existingItem.Views = item.Views;
                existingItem.Likes = item.Likes;
                existingItem.IsAirecommended = item.IsAirecommended;
                existingItem.Status = item.Status;
                existingItem.CreatedAt = item.CreatedAt;
                existingItem.UpdatedAt = item.UpdatedAt;

                _context.Items.Update(existingItem);
                _context.SaveChanges();
                return Ok(existingItem);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating item: {ex.Message}");
            }
        }
        #endregion

        #region DeleteItem
        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id)
        {
            try
            {
                var item = _context.Items.Find(id);
                if (item == null)
                    return NotFound();

                _context.Items.Remove(item);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting item: {ex.Message}");
            }
        }
        #endregion
    }
}
