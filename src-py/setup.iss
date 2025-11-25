[Setup]
AppName=JustOpen
AppVersion=0.1.0
DefaultDirName={userappdata}\JustOpen
DefaultGroupName=JustOpen
OutputBaseFilename=JustOpenInstaller
Compression=lzma
SolidCompression=yes
PrivilegesRequired=admin
DisableDirPage=yes
;SignTool=signtool
;SignParameters=sign /a /tr http://timestamp.digicert.com /td sha256 /fd sha256 $f

[Files]
; onefile exe
Source: "dist\just-open.exe"; DestDir: "{app}"; Flags: ignoreversion
; venv
Source: ".venv\*"; DestDir: "{app}\.venv"; Flags: recursesubdirs ignoreversion
; scripts
Source: "scripts\*"; DestDir: "{app}"; Flags: recursesubdirs ignoreversion

[Run]
Filename: "{app}\just-open.exe"; Description: "Launch JustOpen"; Flags: nowait postinstall skipifsilent

[Icons]
; link
Name: "{userdesktop}\JustOpen"; Filename: "{app}\just-open.exe"; WorkingDir: "{app}"; IconFilename: "{app}\just-open.exe"; Comment: "Launch JustOpen"

; start menu
;Name: "{group}\JustOpen"; Filename: "{app}\just-open.exe"; WorkingDir: "{app}"; IconFilename: "{app}\just-open.exe"; Comment: "Launch JustOpen"
