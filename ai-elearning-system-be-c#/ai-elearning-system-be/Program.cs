using MongoDB.Driver; // Ensure this using directive is at the top.

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register MongoDbContext as a singleton.
builder.Services.AddSingleton<MongoDbContext>();

// Register the TimeRecord repository.
builder.Services.AddScoped<ITimeRecordRepository, TimeRecordRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Test endpoint to verify MongoDB connection.
app.MapGet("/test-connection", async (MongoDbContext dbContext) =>
{
    try
    {
        // Use an empty filter to count all documents.
        var filter = Builders<TimeRecord>.Filter.Empty;
        var count = await dbContext.TimeRecords.CountDocumentsAsync(filter);
        return Results.Ok($"MongoDB connection is successful. TimeRecords count: {count}");
    }
    catch (Exception ex)
    {
        return Results.Problem($"MongoDB connection failed: {ex.Message}");
    }
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
