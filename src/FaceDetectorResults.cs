using System.Text.Json;
using System.Text.Json.Serialization;

namespace MediaPipe.FaceDetectorResults
{
    public class faceDetectorRoot
    {
        public Facedetectorresults faceDetectorResults { get; init; }
        public Resolution resolution { get; }
    }

    public class Facedetectorresults
    {
        [JsonPropertyName("detections")]
        public FaceDescription[] Faces { get; init; }
    }

    public class FaceDescription
    {
        public Category[] Categories { get; init; }
        public Keypoint[] Keypoints { get; init; }

        //with .NET8 we'll be able to set the below to private and then jsoninclude
        //[JsonInclude]
        public Boundingbox boundingBox { private get; init; }

        public Rectangle BoundingRect { get { return new Rectangle(boundingBox.originX, boundingBox.originY, boundingBox.width, boundingBox.height); } }
    }

    public class Boundingbox
    {
        public int originX { get; set; }
        public int originY { get; set; }
        public int width { get; set; }
        public int height { get; set; }
        public int angle { get; set; }
    }

    public class Category
    {
        public float Score { get; set; }
        public int Index { get; set; }
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }

    public class Keypoint
    {
        public float x { private get; init; }
        public float y { private get; init; }
        public Vector2 Position { get {  return new Vector2(x, y); } }
        public int Score { get; set; }
        public string Label { get; set; }
    }

    public class Resolution
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}