using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public class TimeRecordRepository : ITimeRecordRepository
{
    private readonly IMongoCollection<TimeRecord> _timeRecords;

    public TimeRecordRepository(MongoDbContext context)
    {
        _timeRecords = context.TimeRecords;
    }

    public async Task<TimeRecord> AddTimeRecordAsync(TimeRecord record)
    {
        if (record.Id == Guid.Empty)
            record.Id = Guid.NewGuid();

        await _timeRecords.InsertOneAsync(record);
        return record;
    }

    public async Task<bool> DeleteTimeRecordAsync(Guid id)
    {
        var deleteResult = await _timeRecords.DeleteOneAsync(tr => tr.Id == id);
        return deleteResult.DeletedCount > 0;
    }

    public async Task<IEnumerable<TimeRecord>> GetAllTimeRecordsAsync()
    {
        return await _timeRecords.Find(_ => true).ToListAsync();
    }

    public async Task<TimeRecord> GetTimeRecordAsync(Guid id)
    {
        return await _timeRecords.Find(tr => tr.Id == id).FirstOrDefaultAsync();
    }

    public async Task<TimeRecord> UpdateTimeRecordAsync(TimeRecord record)
    {
        var replaceResult = await _timeRecords.ReplaceOneAsync(tr => tr.Id == record.Id, record);
        if (replaceResult.IsAcknowledged && replaceResult.ModifiedCount > 0)
            return record;
        return null;
    }
}
