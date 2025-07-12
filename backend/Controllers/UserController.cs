using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReWear.Models;

namespace ReWear.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ReWearContext _context;

        public UserController(ReWearContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public IActionResult GetUsers()
        {
            try
            {
                var users = _context.Users.ToList();
                return Ok(users);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while retrieving users.");
            }
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            try
            {
                var user = _context.Users.Find(id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }
                return Ok(user);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while retrieving the user.");
            }
        }

        // POST: api/User
        [HttpPost]
        public IActionResult InsertUser(User user)
        {
            try
            {
                user.CreatedDate = DateTime.Now;
                user.ModifiedDate = DateTime.Now;
                _context.Users.Add(user);
                _context.SaveChanges();
                return CreatedAtAction(nameof(GetUserById), new { id = user.UserId }, user);
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while adding the user.");
            }
        }

        // PUT: api/User/5
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest("User ID mismatch.");
            }

            try
            {
                var existingUser = _context.Users.Find(id);
                if (existingUser == null)
                {
                    return NotFound("User not found.");
                }

                existingUser.Username = user.Username;
                existingUser.Email = user.Email;
                existingUser.Avatar = user.Avatar;
                existingUser.Bio = user.Bio;
                existingUser.Points = user.Points;
                existingUser.Level = user.Level;
                existingUser.SwapCount = user.SwapCount;
                existingUser.EcoScore = user.EcoScore;
                existingUser.Location = user.Location;
                existingUser.JoinedAt = user.JoinedAt;
                existingUser.Preferences = user.Preferences;
                existingUser.ModifiedDate = DateTime.Now;

                _context.Users.Update(existingUser);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while updating the user.");
            }
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUserById(int id)
        {
            try
            {
                var user = _context.Users.Find(id);
                if (user == null)
                {
                    return NotFound("User not found.");
                }

                _context.Users.Remove(user);
                _context.SaveChanges();

                return NoContent();
            }
            catch (Exception)
            {
                return StatusCode(500, "An error occurred while deleting the user.");
            }
        }
    }
}
