// Data/MongoDbContext.cs
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        // Read connection string and database name from configuration
        var connectionString = configuration.GetConnectionString("MongoDb");
        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(configuration["DatabaseName"]);
    }

    // Expose the TimeRecords collection
    public IMongoCollection<TimeRecord> TimeRecords => _database.GetCollection<TimeRecord>("TimeRecords");
}
