using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly ReWearContext _context;

        public NotificationController(ReWearContext context)
        {
            _context = context;
        }

        #region GetAllNotifications
        [HttpGet]
        public IActionResult GetAllNotifications()
        {
            try
            {
                var notifications = _context.Notifications
                    .Include(n => n.User)
                    .ToList();
                return Ok(notifications);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving notifications: {ex.Message}");
            }
        }
        #endregion

        #region GetNotificationById
        [HttpGet("{id}")]
        public IActionResult GetNotificationById(int id)
        {
            try
            {
                var notification = _context.Notifications
                    .Include(n => n.User)
                    .FirstOrDefault(n => n.NotificationId == id);

                if (notification == null)
                    return NotFound();

                return Ok(notification);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving notification: {ex.Message}");
            }
        }
        #endregion

        #region AddNotification
        [HttpPost]
        public IActionResult AddNotification(Notification notification)
        {
            try
            {
                _context.Notifications.Add(notification);
                _context.SaveChanges();
                return Ok(notification);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error adding notification: {ex.Message}");
            }
        }
        #endregion

        #region UpdateNotification
        [HttpPut("{id}")]
        public IActionResult UpdateNotification(int id, Notification notification)
        {
            try
            {
                if (id != notification.NotificationId)
                    return BadRequest("Notification ID mismatch.");

                var existingNotification = _context.Notifications.Find(id);
                if (existingNotification == null)
                    return NotFound();

                existingNotification.UserId = notification.UserId;
                existingNotification.Type = notification.Type;
                existingNotification.Message = notification.Message;
                existingNotification.Timestamp = notification.Timestamp;
                existingNotification.Read = notification.Read;
                existingNotification.ActionUrl = notification.ActionUrl;

                _context.Notifications.Update(existingNotification);
                _context.SaveChanges();
                return Ok(existingNotification);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error updating notification: {ex.Message}");
            }
        }
        #endregion

        #region DeleteNotification
        [HttpDelete("{id}")]
        public IActionResult DeleteNotification(int id)
        {
            try
            {
                var notification = _context.Notifications.Find(id);
                if (notification == null)
                    return NotFound();

                _context.Notifications.Remove(notification);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error deleting notification: {ex.Message}");
            }
        }
        #endregion
    }
}
