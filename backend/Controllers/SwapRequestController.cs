using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SwapRequestController : ControllerBase
    {
        private readonly ReWearContext _context;

        public SwapRequestController(ReWearContext context)
        {
            _context = context;
        }

        #region GetAllSwapRequests
        [HttpGet]
        public IActionResult GetAllSwapRequests()
        {
            try
            {
                var swapRequests = _context.SwapRequests
                    .Include(s => s.FromUser)
                    .Include(s => s.ToUser)
                    .Include(s => s.Item)
                    .ToList();

                return Ok(swapRequests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving swap requests: {ex.Message}");
            }
        }
        #endregion

        #region GetSwapRequestById
        [HttpGet("{id}")]
        public IActionResult GetSwapRequestById(int id)
        {
            try
            {
                var swapRequest = _context.SwapRequests
                    .Include(s => s.FromUser)
                    .Include(s => s.ToUser)
                    .Include(s => s.Item)
                    .FirstOrDefault(s => s.SwapRequestId == id);

                if (swapRequest == null)
                    return NotFound();

                return Ok(swapRequest);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving swap request: {ex.Message}");
            }
        }
        #endregion

        #region AddSwapRequest
        [HttpPost]
        public IActionResult AddSwapRequest(SwapRequest request)
        {
            try
            {
                request.CreatedAt = DateTime.Now;
                _context.SwapRequests.Add(request);
                _context.SaveChanges();
                return Ok(request);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding swap request: {ex.Message}");
            }
        }
        #endregion

        #region UpdateSwapRequest
        [HttpPut("{id}")]
        public IActionResult UpdateSwapRequest(int id, SwapRequest request)
        {
            try
            {
                if (id != request.SwapRequestId)
                    return BadRequest("ID mismatch.");

                var existing = _context.SwapRequests.Find(id);
                if (existing == null)
                    return NotFound();

                existing.FromUserId = request.FromUserId;
                existing.ToUserId = request.ToUserId;
                existing.ItemId = request.ItemId;
                existing.Message = request.Message;
                existing.Status = request.Status;
                existing.CreatedAt = request.CreatedAt;
                existing.RespondedAt = request.RespondedAt;

                _context.SwapRequests.Update(existing);
                _context.SaveChanges();
                return Ok(existing);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating swap request: {ex.Message}");
            }
        }
        #endregion

        #region DeleteSwapRequest
        [HttpDelete("{id}")]
        public IActionResult DeleteSwapRequest(int id)
        {
            try
            {
                var swapRequest = _context.SwapRequests.Find(id);
                if (swapRequest == null)
                    return NotFound();

                _context.SwapRequests.Remove(swapRequest);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting swap request: {ex.Message}");
            }
        }
        #endregion
    }
}
