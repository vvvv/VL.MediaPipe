namespace VL.MediaPipe.WebcamResult
{
    public class WebcamRoot
    {
        public string Type { get; set; }
        public Device[] Devices { get; set; }
    }

    public class Device
    {
        public string Label { get; set; }
    }

}
