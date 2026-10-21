namespace MediaPipe.ImageResults
{
    public class ImageRoot
    {
        public Imageresults ImageResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Imageresults
    {
        public Classification[] Classifications { get; set; }
        public int TimestampMs { get; set; }
    }

    public class Classification
    {
        public object[] Categories { get; set; }
        public int HeadIndex { get; set; }
        public string HeadName { get; set; }
    }
}
