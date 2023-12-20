namespace VL.MediaPipe.TimerResult
{
    public class TimerRoot
    {
        public Timers Timers { get; set; }
    }

    public class Timers
    {
        public int DetectTime { get; set; }
        public int DrawTime { get; set; }
        public int SourceFrameRate { get; set; }
    }

}
