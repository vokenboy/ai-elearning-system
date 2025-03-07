using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

public class TimeRecord
{
    [BsonId]
    public Guid Id { get; set; }
    public DateTime Time { get; set; }
}
