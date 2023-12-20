namespace VL.MediaPipe.ImageResults
{
    public class Rootobject
    {
        public Imageresults imageResults { get; set; }
        public Resolution resolution { get; set; }
    }

    public class Imageresults
    {
        public Classification[] classifications { get; set; }
        public int timestampMs { get; set; }
    }

    public class Classification
    {
        public object[] categories { get; set; }
        public int headIndex { get; set; }
        public string headName { get; set; }
    }

    public class Resolution
    {
        public int width { get; set; }
        public int height { get; set; }
    }
}
