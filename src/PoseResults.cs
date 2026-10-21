namespace MediaPipe.PoseResults
{
    public enum PoseJoints { 
        Nose, 
        LeftEyeInner,
        LeftEye, 
        LeftEyeOuter,
        RightEyeInner, 
        RightEye, 
        RightEyeOuter,
        LeftEar, 
        RightEar, 
        MouthLeft,
        MouthRright,
        LeftShoulder,
        RightShoulder,
        LeftElbow,
        RightElbow,
        LeftWrist,
        RightWrist,
        LeftPinky, 
        RightPinky,
        LeftIndex,
        RightIndex,
        LeftThumb,
        RightThumb,
        LeftHip,
        RightHip,
        LeftKnee,
        RightKnee,
        LeftAnkle,
        RightAnkle,
        LeftHeel, 
        RightHeel,
        LeftFootIndex,
        RightFootIndex
    }

    public class PoseRoot
    {
        public Poseresults PoseResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Poseresults
    {
        public Landmark[][] Landmarks { get; set; }
        public Landmark[][] WorldLandmarks { get; set; }
    }
}
