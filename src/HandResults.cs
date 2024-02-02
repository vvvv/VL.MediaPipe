namespace MediaPipe.HandResults
{
    public enum Hand { Any, Left, Right }

    public enum FingerJoints { 
        Wrist, 
        Thumb_CMC, 
        Thumb_MCP, 
        Thumb_IP, 
        Thumb_TIP, 
        IndexFinger_MCP, 
        IndexFinger_PIP, 
        IndexFinger_DIP, 
        IndexFinger_TIP, 
        MiddleFinger_MCP, 
        MiddleFinger_PIP, 
        MiddleFinger_DIP, 
        MiddleFinger_TIP, 
        RingFinger_MCP, 
        RingFinger_PIP, 
        RingFinger_DIP, 
        RingFinger_TIP, 
        Pinky_MCP, 
        Pinky_PIP, 
        Pinky_DIP, 
        Pinky_TIP 
    }
    
    public class HandRoot
    {
        public Handresults HandResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Handresults
    {
        public Landmark[][] Landmarks { get; set; }
        public Worldlandmark[][] WorldLandmarks { get; set; }
        public Handedness[][] Handednesses { get; set; }
        public Handedness[][] Handedness { get; set; }
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