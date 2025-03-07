using System;
using System.Collections.Generic;
using System.Threading.Tasks;

public interface ITimeRecordRepository
{
    Task<TimeRecord> GetTimeRecordAsync(Guid id);
    Task<IEnumerable<TimeRecord>> GetAllTimeRecordsAsync();
    Task<TimeRecord> AddTimeRecordAsync(TimeRecord record);
    Task<TimeRecord> UpdateTimeRecordAsync(TimeRecord record);
    Task<bool> DeleteTimeRecordAsync(Guid id);
}
