
using System;
using System.Buffers.Binary;
using System.IO;
using System.IO.Compression;

public class SegmentationPacket
{
    public int Width { get; set; }
    public int Height { get; set; }
    public int Channels { get; set; }

    public byte DataType { get; set; }
    public byte OutputMode { get; set; }

    public uint SourceFrame { get; set; }
    public uint Sequence { get; set; }

    public double MediaTimeMs { get; set; }

    public byte[] PixelData { get; set; } = [];

    public static SegmentationPacket Parse(byte[] packet)
    {
        const int headerSize = 72;

        if (packet.Length < headerSize)
            throw new Exception("Invalid packet size");

        // Verify magic bytes: MPSG
        if (packet[0] != 0x4D ||
            packet[1] != 0x50 ||
            packet[2] != 0x53 ||
            packet[3] != 0x47)
            throw new Exception("Invalid segmentation packet");

        var version = packet[4];
        if (version != 2)
            throw new Exception("Unsupported protocol version");

        var dataType = packet[5];
        var outputMode = packet[7];

        int height = BinaryPrimitives
            .ReadUInt16LittleEndian(packet.AsSpan(8, 2));

        int width = BinaryPrimitives
            .ReadUInt16LittleEndian(packet.AsSpan(10, 2));

        int channels = packet[12];

        uint sourceFrame = BinaryPrimitives
            .ReadUInt32LittleEndian(packet.AsSpan(16, 4));

        uint sequence = BinaryPrimitives
            .ReadUInt32LittleEndian(packet.AsSpan(20, 4));

        double mediaTime = BitConverter.Int64BitsToDouble(
            BinaryPrimitives.ReadInt64LittleEndian(
                packet.AsSpan(24, 8)
            )
        );

        ushort flags = BinaryPrimitives
            .ReadUInt16LittleEndian(packet.AsSpan(14, 2));

        byte[] payload = packet.AsSpan(headerSize).ToArray();

        // Bit 0 indicates zlib compression.
        if ((flags & 0x0001) != 0)
        {
            using var input = new MemoryStream(payload);
            using var zlib = new ZLibStream(
                input,
                CompressionMode.Decompress
            );

            using var output = new MemoryStream();
            zlib.CopyTo(output);

            payload = output.ToArray();
        }

        return new SegmentationPacket
        {
            Width = width,
            Height = height,
            Channels = channels,
            DataType = dataType,
            OutputMode = outputMode,
            SourceFrame = sourceFrame,
            Sequence = sequence,
            MediaTimeMs = mediaTime,
            PixelData = payload
        };
    }
}
