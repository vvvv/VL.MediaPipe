using System.Text.Json.Serialization;

namespace MediaPipe.FaceLandmarkResults
{
    public class FaceLandmarkRoot
    {
        public Facelandmarkresults FaceLandmarkResults { get; set; }
        public Resolution Resolution { get; set; }
    }

    public class Facelandmarkresults
    {
        public Facelandmark[][] FaceLandmarks { get; set; }
        public Faceblendshape[] FaceBlendshapes { get; set; }
        public Facialtransformationmatrix[] FacialTransformationMatrixes { get; set; }
    }

    public class Facelandmark
    {
        public float x { private get; init; }
        public float y { private get; init; }
        public float z { private get; init; }

        public Vector3 Position { get { return new Vector3(x, y, z); } }
    }

    public class Faceblendshape
    {
        public Category[] Categories { get; set; }
        public int HeadIndex { get; set; }
        public string HeadName { get; set; }
    }

    public class Category
    {
        public int Index { get; set; }
        public float Score { get; set; }
        public string CategoryName { get; set; }
        public string DisplayName { get; set; }
    }

    public class Facialtransformationmatrix
    {
        public int Rows { get; set; }
        public int Columns { get; set; }
        public float[] Data { get; set; }
    }

    public class Resolution
    {
        public int Width { get; set; }
        public int Height { get; set; }
    }
}