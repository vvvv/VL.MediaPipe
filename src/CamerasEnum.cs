// Steps to implement your own enum based on this template:
// 1) Rename "CamerasEnum" to what your enum should be named
// 2) Rename "CamerasEnumDefinition" accordingly
// 3) Implement the definitions GetEntries() 
// 
// For more details regarding the template, see:
// https://thegraybook.vvvv.org/reference/extending/writing-nodes.html#dynamic-enums

using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Xml.Linq;
using VL.Core.CompilerServices;

namespace MediaPipe;

[Serializable]
public class CamerasEnum : DynamicEnumBase<CamerasEnum, CamerasEnumDefinition>
{
    public CamerasEnum(string value) : base(value)
    {
    }

    [CreateDefault]
    public static CamerasEnum CreateDefault()
    {
        return CreateDefaultBase();
    }
}

public class CamerasEnumDefinition : DynamicEnumDefinitionBase<CamerasEnumDefinition>
{
    Dictionary<string, object> entries = new Dictionary<string, object>();
    Subject<object> trigger = new Subject<object>();

    public void ClearEntries() 
    { 
        entries.Clear();
        trigger.OnNext("");
    }

    public void AddEntry(string name)
    { 
        entries[name] = null;
        trigger.OnNext(name);
    }

    //Return the current enum entries
    protected override IReadOnlyDictionary<string, object> GetEntries()
    {
        return entries;
    }

    protected override IObservable<object> GetEntriesChangedObservable()
    {
        return trigger;
    }
}