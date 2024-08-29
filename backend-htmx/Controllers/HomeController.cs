using Microsoft.AspNetCore.Mvc;
using backend_htmx.Models;

namespace backend_htmx.Controllers;

public class HomeController() : Controller
{
    private static readonly List<ToDoListItem> _items = [
        new ToDoListItem { Id = 0, Description = "Buy milk" },
        new ToDoListItem { Id = 1, Description = "Walk the dog" },
        new ToDoListItem { Id = 2, Description = "Do the laundry" }
    ];
    private static int _itemIdCounter = 3;

    public IActionResult Index()
    {
        return View(new HomeViewModel { Items = _items, Progress = CalculateProgress() });
    }

    // the list items endpoint is only needed by React and Svelte, not Htmx, because the
    // items are rendered server-side on load when using Htmx
    public IActionResult ListItems()
    {
        return Json(_items);
    }

    public IActionResult AddItem(string item, string output)
    {
        if (!string.IsNullOrWhiteSpace(item))
        {
            _items.Add(new ToDoListItem { Id = _itemIdCounter, Description = item });
            _itemIdCounter += 1;
        }

        // json output is used by React and Svelte
        if (output == "json")
        {
            return Json(_items);
        }

        // this header triggers Htmx to re-fetch progress and needs to be included
        // wherever we manipulate the items list
        Response.Headers.Append("HX-Trigger", "items-changed");

        // html output is used by Htmx
        return PartialView("_Items", _items);
    }

    public IActionResult DeleteItem(int id, string output)
    {
        var item = _items.FirstOrDefault(x => x.Id == id);
        if (item != null)
        {
            _items.Remove(item);
        }

        if (output == "json")
        {
            return Json(_items);
        }

        Response.Headers.Append("HX-Trigger", "items-changed");
        return PartialView("_Items", _items);
    }

    public IActionResult ToggleItem(int id, string done, string output)
    {
        var item = _items.FirstOrDefault(x => x.Id == id);
        if (item != null)
        {
            item.IsDone = done == "on";
        }

        if (output == "json")
        {
            return Json(item);
        }

        Response.Headers.Append("HX-Trigger", "items-changed");
        return PartialView("_Item", item);
    }

    // progress endpoint only used by Htmx, the other frameworks calculate progress client-side
    public IActionResult Progress()
    {
        return PartialView("_Progress", CalculateProgress());
    }

    private static int CalculateProgress()
    {
        if (_items.Count == 0)
        {
            return 0;
        }
        var done = _items.Count(x => x.IsDone);
        var total = _items.Count;
        return (int)Math.Round(done / (decimal)total * 100, MidpointRounding.AwayFromZero);
    }
}
