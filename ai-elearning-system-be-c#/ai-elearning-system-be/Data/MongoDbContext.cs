using System;
using MongoDB.Driver;
using DotNetEnv;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext()
    {
        // Load environment variables from the .env file.
        Env.Load();

        // Retrieve connection settings from environment variables.
        var connectionString = Environment.GetEnvironmentVariable("MONGO_DB_CONNECTION");
        var databaseName = Environment.GetEnvironmentVariable("DATABASE_NAME");

        // Debug output to ensure variables are loaded (remove in production).
        Console.WriteLine($"MONGO_DB_CONNECTION: {connectionString}");
        Console.WriteLine($"DATABASE_NAME: {databaseName}");

        if (string.IsNullOrEmpty(connectionString) || string.IsNullOrEmpty(databaseName))
        {
            throw new Exception("MongoDB connection settings are not configured properly in the .env file.");
        }

        var client = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }


    public IMongoCollection<TimeRecord> TimeRecords => _database.GetCollection<TimeRecord>("TimeRecords");
}
