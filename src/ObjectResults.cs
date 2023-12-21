namespace VL.MediaPipe.ObjectResults
{
    public class ObjectRoot
    {
        public Objectresults ObjectResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Objectresults
    {
        public Detection[] Detections { get; set; }
    }

    public class Detection
    {
        public Category[] Categories { get; set; }
        public object[] Keypoints { get; set; }
        public Boundingbox boundingBox { private get; init; }

        public Rectangle BoundingRect { get { return new Rectangle(boundingBox.originX, boundingBox.originY, boundingBox.width, boundingBox.height); } }
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
        public float Score { get; set; }
        public int Index { get; set; }
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }

    public class Resolution
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
