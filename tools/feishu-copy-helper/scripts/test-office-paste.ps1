param(
    [Parameter(Mandatory=$true)][ValidateSet('word','wps')][string]$Application,
    [Parameter(Mandatory=$true)][string]$CaseName,
    [string]$ExpectedClipboardSha256,
    [string]$OutputDirectory = 'output/office-paste'
)
# Run with Windows PowerShell -STA after a real browser Ctrl+C.
$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Windows.Forms
$target = [IO.Path]::GetFullPath((Join-Path $PWD $OutputDirectory))
[void][IO.Directory]::CreateDirectory($target)
$base = Join-Path $target ($CaseName + '-' + $Application)
if (Test-Path -LiteralPath ($base + '.docx')) { throw 'Use a new case name; existing evidence is preserved.' }
$clipboard = [System.Windows.Forms.Clipboard]::GetDataObject()
$formats = @($clipboard.GetFormats($false))
if (-not ($formats -contains 'HTML Format')) { throw 'No native HTML clipboard format; browser-only clipboard is insufficient.' }
$html = [string]$clipboard.GetData('HTML Format')
function Get-TextHash([string]$Value) {
    $normalized = $Value -replace '[\s\x01\x07\ufffc\u200b-\u200d\ufeff]', ''
    $sha = [Security.Cryptography.SHA256]::Create()
    try { return ([BitConverter]::ToString($sha.ComputeHash([Text.Encoding]::UTF8.GetBytes($normalized)))).Replace('-','').ToLowerInvariant() }
    finally { $sha.Dispose() }
}
$clipboardHash = Get-TextHash ([string]$clipboard.GetData('UnicodeText'))
if ($ExpectedClipboardSha256 -and $clipboardHash -ne $ExpectedClipboardSha256) { throw 'Clipboard does not match the selected source; refusing stale clipboard evidence.' }
[IO.File]::WriteAllText($base + '-clipboard.html', $html, [Text.UTF8Encoding]::new($false))
$app = $null; $doc = $null; $initialDocuments = 0
try {
    $progId = if ($Application -eq 'word') { 'Word.Application' } else { 'kwps.Application' }
    $app = New-Object -ComObject $progId
    $initialDocuments = $app.Documents.Count
    $version = $app.Version
    $doc = $app.Documents.Add()
    # Native default paste, with no HTML conversion or OOXML rewriting by the test.
    $doc.Range(0, 0).Paste()
    $paragraphs = @()
    foreach ($paragraph in $doc.Paragraphs) {
        $text = [string]$paragraph.Range.Text
        $paragraphs += [PSCustomObject]@{
            text = $text
            listType = $paragraph.Range.ListFormat.ListType
            listLabel = $paragraph.Range.ListFormat.ListString
            before = $paragraph.Format.SpaceBefore
            after = $paragraph.Format.SpaceAfter
            lineSpacing = $paragraph.Format.LineSpacing
            leftIndent = $paragraph.Format.LeftIndent
            firstLineIndent = $paragraph.Format.FirstLineIndent
            inTable = [bool]$paragraph.Range.Information(12)
            inlineObjects = $paragraph.Range.InlineShapes.Count
            finalTerminator = $paragraph.Range.End -ge $doc.Content.End -and -not ($text -replace '[\s\x07]', '')
        }
    }
    $tables = @()
    foreach ($table in $doc.Tables) {
        $rowWidths = @($table.Rows | ForEach-Object { ($_.Cells | Measure-Object -Property Width -Sum).Sum })
        $tables += [PSCustomObject]@{ rows=$table.Rows.Count; cells=$table.Range.Cells.Count; maxRowWidth=($rowWidths | Measure-Object -Maximum).Maximum; text=[string]$table.Range.Text }
    }
    $pictures = @($doc.InlineShapes | Where-Object { $_.Type -in @(3,4) } | ForEach-Object { [PSCustomObject]@{type=$_.Type; width=$_.Width; height=$_.Height} })
    # Object replacement characters differ between Word and WPS. Read native
    # ranges between inline objects instead of deleting real slash characters.
    $visibleText = [Text.StringBuilder]::new()
    $cursor = $doc.Content.Start
    foreach ($shape in @($doc.InlineShapes | Sort-Object { $_.Range.Start })) {
        if ($shape.Range.Start -gt $cursor) { [void]$visibleText.Append([string]$doc.Range($cursor, $shape.Range.Start).Text) }
        $cursor = $shape.Range.End
    }
    if ($cursor -lt $doc.Content.End) { [void]$visibleText.Append([string]$doc.Range($cursor, $doc.Content.End).Text) }
    $docPath = $base + '.docx'
    try { $doc.SaveAs2($docPath, 16) } catch { $doc.SaveAs([ref]$docPath, [ref]16) }
    $pdfPath = $base + '.pdf'
    $doc.ExportAsFixedFormat($pdfPath, 17)
    $result = [PSCustomObject]@{
        application=$Application; version=$version; case=$CaseName
        clipboardFormats=$formats; clipboardHtmlCharacters=$html.Length
        text=[string]$doc.Content.Text; paragraphs=$paragraphs; tables=$tables
        inlineShapes=$doc.InlineShapes.Count; floatingShapes=$doc.Shapes.Count
        pictures=$pictures; textSha256=(Get-TextHash ([string]$doc.Content.Text)); clipboardSha256=$clipboardHash
        visibleTextSha256=(Get-TextHash $visibleText.ToString())
        contentWidth=($doc.PageSetup.PageWidth - $doc.PageSetup.LeftMargin - $doc.PageSetup.RightMargin)
        emptyBodyParagraphCandidates=@($paragraphs | Where-Object { -not $_.inTable -and -not $_.finalTerminator -and $_.inlineObjects -eq 0 -and -not ($_.text -replace '[\s\x07\u200b-\u200d\ufeff]','') }).Count
        pages=$doc.ComputeStatistics(2); docx=$docPath; pdf=$pdfPath
    }
    $result | ConvertTo-Json -Depth 8 | Set-Content -LiteralPath ($base + '-inspection.json') -Encoding UTF8
    [PSCustomObject]@{
        application=$Application; version=$version; case=$CaseName
        paragraphs=$paragraphs.Count; listParagraphs=@($paragraphs | Where-Object {$_.listType -gt 0}).Count
        emptyParagraphs=@($paragraphs | Where-Object {-not ($_.text -replace '[\s\x07\u200b-\u200d\ufeff]','')}).Count
        tables=$tables.Count; inlineShapes=$result.inlineShapes; pages=$result.pages
        pictures=$pictures.Count; emptyBodyParagraphCandidates=$result.emptyBodyParagraphCandidates
        clipboardSha256=$clipboardHash; textSha256=$result.textSha256; contentWidth=$result.contentWidth
        tableWidths=@($tables | ForEach-Object {$_.maxRowWidth}); pictureWidths=@($pictures | ForEach-Object {$_.width})
        docx=$docPath; pdf=$pdfPath
    } | ConvertTo-Json -Compress
} finally {
    if ($doc) { $doc.Close(0); [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($doc) }
    if ($app) {
        if ($initialDocuments -eq 0 -and $app.Documents.Count -eq 0) { $app.Quit() }
        [void][Runtime.InteropServices.Marshal]::FinalReleaseComObject($app)
    }
}
