$compress = @{
  Path = "v2\*"
  CompressionLevel = "NoCompression"
  DestinationPath = "output\SearchSwitch.zip"
}
Compress-Archive @compress -Force
Copy-Item -Path .\output\SearchSwitch.zip -Destination .\output\SearchSwitch.xpi -Force