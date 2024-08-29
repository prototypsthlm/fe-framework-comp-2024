namespace backend_htmx.Models;

public class HomeViewModel
{
  public required List<ToDoListItem> Items { get; set; }

  public int Progress { get; set; }
}
