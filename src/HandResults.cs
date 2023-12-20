namespace MediaPipe.HandResults
{
    public class Rootobject
    {
        public Handresults handResults { get; set; }
        public Resolution resolution { get; set; }
    }

    public class Handresults
    {
        public Landmark[][] landmarks { get; set; }
        public Worldlandmark[][] worldLandmarks { get; set; }
        public Handedness[][] handednesses { get; set; }
        public Handedness1[][] handedness { get; set; }
    }

    public class Landmark
    {
        public float x { get; set; }
        public float y { get; set; }
        public float z { get; set; }
    }

    public class Worldlandmark
    {
        public float x { get; set; }
        public float y { get; set; }
        public float z { get; set; }
    }

    public class Handedness
    {
        public float score { get; set; }
        public int index { get; set; }
        public string categoryName { get; set; }
        public string displayName { get; set; }
    }

    public class Handedness1
    {
        public float score { get; set; }
        public int index { get; set; }
        public string categoryName { get; set; }
        public string displayName { get; set; }
    }

    public class Resolution
    {
        public int width { get; set; }
        public int height { get; set; }
    }
}