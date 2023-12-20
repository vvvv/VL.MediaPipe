namespace VL.MediaPipe.PoseResults
{
    public class PoseRoot
    {
        public Poseresults PoseResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Poseresults
    {
        public Landmark[][] Landmarks { get; set; }
        public Worldlandmark[][] WorldLandmarks { get; set; }
    }

    public class Landmark
    {
        public float x { private get; init; }
        public float y { private get; init; }
        public float z { private get; init; }

        public Vector3 Position { get { return new Vector3(x, y, z); } }
    }

    public class Worldlandmark
    {
        public float x { private get; init; }
        public float y { private get; init; }
        public float z { private get; init; }

        public Vector3 Position { get { return new Vector3(x, y, z); } }
    }

    public class Resolution
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}
