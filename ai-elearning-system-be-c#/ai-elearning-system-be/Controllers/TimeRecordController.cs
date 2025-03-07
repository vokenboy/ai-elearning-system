using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class TimeRecordController : ControllerBase
{
    private readonly ITimeRecordRepository _repository;

    public TimeRecordController(ITimeRecordRepository repository)
    {
        _repository = repository;
    }

    // GET: api/TimeRecord/{id}
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var record = await _repository.GetTimeRecordAsync(id);
        if (record == null)
            return NotFound();

        var dto = new TimeRecordDto
        {
            Id = record.Id.ToString(),
            Time = record.Time.ToString("o")
        };

        return Ok(dto);
    }

    // GET: api/TimeRecord
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var records = await _repository.GetAllTimeRecordsAsync();
        var dtos = records.Select(record => new TimeRecordDto
        {
            Id = record.Id.ToString(),
            Time = record.Time.ToString("o")
        });
        return Ok(dtos);
    }

    // POST: api/TimeRecord
    [HttpPost]
    public async Task<IActionResult> Create(TimeRecordDto dto)
    {
        var record = new TimeRecord
        {
            // Id will be generated in the repository if empty.
            Id = Guid.Empty,
            Time = DateTime.Parse(dto.Time)
        };

        var createdRecord = await _repository.AddTimeRecordAsync(record);
        dto.Id = createdRecord.Id.ToString();

        // Pass the Guid directly; the route expects a Guid.
        return CreatedAtAction(nameof(Get), new { id = createdRecord.Id }, dto);
    }

    // PUT: api/TimeRecord/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, TimeRecordDto dto)
    {
        var existingRecord = await _repository.GetTimeRecordAsync(id);
        if (existingRecord == null)
            return NotFound();

        existingRecord.Time = DateTime.Parse(dto.Time);
        var updatedRecord = await _repository.UpdateTimeRecordAsync(existingRecord);

        if (updatedRecord == null)
            return BadRequest();

        return NoContent();
    }

    // DELETE: api/TimeRecord/{id}
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await _repository.DeleteTimeRecordAsync(id);
        if (!result)
            return NotFound();

        return NoContent();
    }
}
