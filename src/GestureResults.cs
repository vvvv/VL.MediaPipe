namespace MediaPipe.GestureResults
{
    public class GestureRoot
    {
        public Gestureresults GestureResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Gestureresults
    {
        public Gesture[][] Gestures { get; set; }
        public Landmark[][] Landmarks { get; set; }
        public Worldlandmark[][] WorldLandmarks { get; set; }
        public Handedness[][] Handedness { get; set; }
        public Handedness[][] Handednesses { get; set; }
    }

    public class Gesture
    {
        public float Score { get; set; }
        public int Index { get; set; }
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
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

    public class Handedness
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