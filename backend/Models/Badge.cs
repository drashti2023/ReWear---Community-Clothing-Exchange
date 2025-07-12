using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReWear.Models;

public partial class Badge
{
    public int BadgeId { get; set; }

    public int? UserId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Icon { get; set; }

    public DateTime? EarnedAt { get; set; }

    public DateTime? CreatedDate { get; set; }

    public DateTime? ModifiedDate { get; set; }
    [JsonIgnore]
    public virtual User? User { get; set; }
}
