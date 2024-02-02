namespace VL.MediaPipe.ImageEmbedderResults
{
    public class ImageembedderRoot
    {
        public Imageembedderresults ImageEmbedderResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Imageembedderresults
    {
        public Embedding[] Embeddings { get; set; }
        public int TimestampMs { get; set; }
    }

    public class Embedding
    {
        public int hHadIndex { get; set; }
        public string HeadName { get; set; }
        public float[] FloatEmbedding { get; set; }
    }

    public class Resolution
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}