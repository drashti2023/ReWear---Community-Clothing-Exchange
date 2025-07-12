using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BadgeController : ControllerBase
    {
        #region Configuration Fields
        private readonly ReWearContext _context;
        public BadgeController(ReWearContext context)
        {
            _context = context;
        }
        #endregion

        #region GetAllBadges
        [HttpGet]
        public async Task<IActionResult> GetAllBadges()
        {
            try
            {
                var badges = await _context.Badges
                    .Include(b => b.User)
                    .ToListAsync();
                return Ok(badges);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving badges: {ex.Message}");
            }
        }
        #endregion

        #region GetBadgeById
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBadgeById(int id)
        {
            try
            {
                var badge = await _context.Badges
                    .Include(b => b.User)
                    .FirstOrDefaultAsync(b => b.BadgeId == id);

                if (badge == null)
                    return NotFound();

                return Ok(badge);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving badge: {ex.Message}");
            }
        }
        #endregion

        #region CreateBadge
        [HttpPost]
        public async Task<IActionResult> CreateBadge(Badge badge)
        {
            try
            {
                _context.Badges.Add(badge);
                await _context.SaveChangesAsync();
                return Ok(badge);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating badge: {ex.Message}");
            }
        }
        #endregion

        #region UpdateBadge
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBadge(int id, Badge updatedBadge)
        {
            try
            {
                if (id != updatedBadge.BadgeId)
                    return BadRequest("ID mismatch");

                var existingBadge = await _context.Badges.FindAsync(id);
                if (existingBadge == null)
                    return NotFound();

                existingBadge.UserId = updatedBadge.UserId;
                existingBadge.Name = updatedBadge.Name;
                existingBadge.Description = updatedBadge.Description;
                existingBadge.Icon = updatedBadge.Icon;
                existingBadge.EarnedAt = updatedBadge.EarnedAt;
                existingBadge.CreatedDate = updatedBadge.CreatedDate;
                existingBadge.ModifiedDate = updatedBadge.ModifiedDate;

                _context.Badges.Update(existingBadge);
                await _context.SaveChangesAsync();

                return Ok(existingBadge);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating badge: {ex.Message}");
            }
        }
        #endregion

        #region DeleteBadge
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBadge(int id)
        {
            try
            {
                var badge = await _context.Badges.FindAsync(id);
                if (badge == null)
                    return NotFound();

                _context.Badges.Remove(badge);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting badge: {ex.Message}");
            }
        }
        #endregion
    }
}
