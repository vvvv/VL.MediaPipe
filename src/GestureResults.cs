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
        public Landmark[][] WorldLandmarks { get; set; }
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
}