namespace backend_htmx.Models;

public class ToDoListItem
{
  public int Id { get; set; }
  public required string Description { get; set; }
  public bool IsDone { get; set; }
}
