using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReWear.Models;

public partial class Item
{
    public int ItemId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public string? Images { get; set; }

    public string? Category { get; set; }

    public string? Size { get; set; }

    public string? Condition { get; set; }

    public string? Color { get; set; }

    public string? Brand { get; set; }

    public string? Tags { get; set; }

    public int? Points { get; set; }

    public int? UserId { get; set; }

    public string? UserName { get; set; }

    public string? UserAvatar { get; set; }

    public string? Location { get; set; }

    public decimal? Rating { get; set; }

    public int? Views { get; set; }

    public int? Likes { get; set; }

    public bool? IsAirecommended { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }
    [JsonIgnore]
    public virtual ICollection<Airecommendation> Airecommendations { get; set; } = new List<Airecommendation>();
    [JsonIgnore]
    public virtual ICollection<SwapRequest> SwapRequests { get; set; } = new List<SwapRequest>();
    [JsonIgnore]
    public virtual User? User { get; set; }
}
