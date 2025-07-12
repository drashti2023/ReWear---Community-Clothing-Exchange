using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReWear.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? Avatar { get; set; }

    public string? Bio { get; set; }

    public int? Points { get; set; }

    public int? Level { get; set; }

    public int? SwapCount { get; set; }

    public decimal? EcoScore { get; set; }

    public string? Location { get; set; }

    public DateTime? JoinedAt { get; set; }

    public string? Preferences { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }
    [JsonIgnore]
    public virtual ICollection<Badge> Badges { get; set; } = new List<Badge>();
    [JsonIgnore]
    public virtual ICollection<Item> Items { get; set; } = new List<Item>();
    [JsonIgnore]
    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();
    [JsonIgnore]
    public virtual ICollection<SwapRequest> SwapRequestFromUsers { get; set; } = new List<SwapRequest>();
    [JsonIgnore]
    public virtual ICollection<SwapRequest> SwapRequestToUsers { get; set; } = new List<SwapRequest>();
}
