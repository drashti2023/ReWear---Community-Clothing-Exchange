using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReWear.Models;

public partial class Airecommendation
{
    public int RecommendationId { get; set; }

    public int? ItemId { get; set; }

    public decimal? Score { get; set; }

    public string? Reason { get; set; }

    public decimal? StyleMatch { get; set; }

    public decimal? ColorMatch { get; set; }

    public decimal? OccasionMatch { get; set; }

    public DateTime? CreatedDate { get; set; }
    [JsonIgnore]
    public virtual Item? Item { get; set; }
}
