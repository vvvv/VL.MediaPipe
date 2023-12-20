namespace VL.MediaPipe.ObjectResults
{
    public class Rootobject
    {
        public Objectresults objectResults { get; set; }
        public Resolution resolution { get; set; }
    }

    public class Objectresults
    {
        public Detection[] detections { get; set; }
    }

    public class Detection
    {
        public Category[] categories { get; set; }
        public object[] keypoints { get; set; }
        public Boundingbox boundingBox { get; set; }
    }

    public class Boundingbox
    {
        public int originX { get; set; }
        public int originY { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public int angle { get; set; }
    }

    public class Category
    {
        public float score { get; set; }
        public int index { get; set; }
        public string categoryName { get; set; }
        public string displayName { get; set; }
    }

    public class Resolution
    {
        public int width { get; set; }
        public int height { get; set; }
    }
}
