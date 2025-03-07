var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Register MongoDbContext as a singleton.
builder.Services.AddSingleton<MongoDbContext>();

// Register the TimeRecord repository.
builder.Services.AddScoped<ITimeRecordRepository, TimeRecordRepository>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

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
