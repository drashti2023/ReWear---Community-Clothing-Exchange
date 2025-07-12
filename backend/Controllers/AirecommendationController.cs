using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AirecommendationController : ControllerBase
    {
        #region Configuration Fields
        private readonly ReWearContext _context;

        public AirecommendationController(ReWearContext context)
        {
            _context = context;
        }
        #endregion

        #region GetAllRecommendations
        [HttpGet]
        public IActionResult GetAllRecommendations()
        {
            try
            {
                var recommendations = _context.Airecommendations
                    .Include(r => r.Item)
                    .ToList();
                return Ok(recommendations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving recommendations: {ex.Message}");
            }
        }
        #endregion

        #region GetRecommendationById
        [HttpGet("{id}")]
        public IActionResult GetRecommendationById(int id)
        {
            try
            {
                var recommendation = _context.Airecommendations
                    .Include(r => r.Item)
                    .FirstOrDefault(r => r.RecommendationId == id);

                if (recommendation == null)
                    return NotFound();

                return Ok(recommendation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving recommendation: {ex.Message}");
            }
        }
        #endregion

        #region CreateRecommendation
        [HttpPost]
        public IActionResult CreateRecommendation(Airecommendation rec)
        {
            try
            {
                _context.Airecommendations.Add(rec);
                _context.SaveChanges();
                return Ok(rec);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating recommendation: {ex.Message}");
            }
        }
        #endregion

        #region UpdateRecommendation
        [HttpPut("{id}")]
        public IActionResult UpdateRecommendation(int id, Airecommendation rec)
        {
            try
            {
                if (id != rec.RecommendationId)
                    return BadRequest("ID mismatch.");

                var existing = _context.Airecommendations.Find(id);
                if (existing == null)
                    return NotFound();

                existing.ItemId = rec.ItemId;
                existing.Score = rec.Score;
                existing.Reason = rec.Reason;
                existing.StyleMatch = rec.StyleMatch;
                existing.ColorMatch = rec.ColorMatch;
                existing.OccasionMatch = rec.OccasionMatch;
                existing.CreatedDate = rec.CreatedDate;

                _context.Airecommendations.Update(existing);
                _context.SaveChanges();

                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating recommendation: {ex.Message}");
            }
        }
        #endregion

        #region DeleteRecommendation
        [HttpDelete("{id}")]
        public IActionResult DeleteRecommendation(int id)
        {
            try
            {
                var rec = _context.Airecommendations.Find(id);
                if (rec == null)
                    return NotFound();

                _context.Airecommendations.Remove(rec);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting recommendation: {ex.Message}");
            }
        }
        #endregion
    }
}
