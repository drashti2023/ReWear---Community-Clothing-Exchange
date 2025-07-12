using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReWear.Models;

public partial class SwapRequest
{
    public int SwapRequestId { get; set; }

    public int? FromUserId { get; set; }

    public int? ToUserId { get; set; }

    public int? ItemId { get; set; }

    public string? Message { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? RespondedAt { get; set; }
    [JsonIgnore]
    public virtual User? FromUser { get; set; }
    [JsonIgnore]
    public virtual Item? Item { get; set; }
    [JsonIgnore]
    public virtual User? ToUser { get; set; }
}
