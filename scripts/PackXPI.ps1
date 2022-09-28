$compress = @{
  Path = "v2\*"
  CompressionLevel = "NoCompression"
  DestinationPath = "output\SearchSwitch.zip"
}
Compress-Archive @compress -Force