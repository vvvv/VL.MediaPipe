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
        public Landmark[][] WorldLandmarks { get; set; }
        public Handedness[][] Handednesses { get; set; }
        public Handedness[][] Handedness { get; set; }
    }

    public class Resolution
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}