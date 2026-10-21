namespace MediaPipe
{
    public class Landmark
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

    public class Category
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