using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace ReWear.Models;

public partial class Notification
{
    public int NotificationId { get; set; }

    public int? UserId { get; set; }

    public string? Type { get; set; }

    public string? Message { get; set; }

    public DateTime? Timestamp { get; set; }

    public bool? Read { get; set; }

    public string? ActionUrl { get; set; }
    [JsonIgnore]
    public virtual User? User { get; set; }
}
