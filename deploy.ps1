$ErrorActionPreference = 'Stop'

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$envFile = Join-Path $scriptDir 'deploy.cloudflare.env'

function Import-EnvFile {
  param([string]$Path)

  if (!(Test-Path -LiteralPath $Path)) {
    throw "Missing file: $Path"
  }

  Get-Content -LiteralPath $Path | ForEach-Object {
    $line = $_.Trim()
    if (!$line -or $line.StartsWith('#')) {
      return
    }

    $parts = $line -split '=', 2
    if ($parts.Count -ne 2) {
      return
    }

    $key = $parts[0].Trim()
    $value = $parts[1].Trim()
    if ($value.StartsWith('"') -and $value.EndsWith('"') -and $value.Length -ge 2) {
      $value = $value.Substring(1, $value.Length - 2)
    }

    Set-Item -Path ("Env:{0}" -f $key) -Value $value
  }
}

function Test-RequiredEnv {
  param([string[]]$Names)

  foreach ($name in $Names) {
    $item = Get-Item -Path ("Env:{0}" -f $name) -ErrorAction SilentlyContinue
    if ($null -eq $item -or [string]::IsNullOrWhiteSpace($item.Value) -or $item.Value -match 'PASTE_.*_HERE') {
      throw "Required variable is missing or placeholder: $name"
    }
  }
}

Push-Location $scriptDir
try {
  Import-EnvFile -Path $envFile
  Test-RequiredEnv -Names @('CLOUDFLARE_API_TOKEN', 'CLOUDFLARE_ACCOUNT_ID', 'CF_PAGES_PROJECT')

  if ([string]::IsNullOrWhiteSpace($env:CF_PAGES_BRANCH)) {
    $env:CF_PAGES_BRANCH = 'production'
  }

  Write-Host 'Installing dependencies...'
  npm ci --no-audit --no-fund
  if ($LASTEXITCODE -ne 0) {
    throw "npm ci failed with exit code $LASTEXITCODE"
  }

  Write-Host 'Building static site...'
  npm run build
  if ($LASTEXITCODE -ne 0) {
    throw "npm run build failed with exit code $LASTEXITCODE"
  }

  if ($env:CF_CREATE_PROJECT -eq '1') {
    Write-Host "Attempting project create: '$($env:CF_PAGES_PROJECT)'..."
    $createCmd = "npx --yes wrangler@4 pages project create {0} --production-branch={1}" -f $env:CF_PAGES_PROJECT, $env:CF_PAGES_BRANCH
    cmd /c $createCmd | Out-Host
  }
  else {
    Write-Host "Skipping project create. Using existing project '$($env:CF_PAGES_PROJECT)'."
  }

  Write-Host "Deploying dist to Cloudflare Pages (branch: $($env:CF_PAGES_BRANCH))..."
  & npx --yes wrangler@4 pages deploy dist --project-name $env:CF_PAGES_PROJECT --branch $env:CF_PAGES_BRANCH
  if ($LASTEXITCODE -ne 0) {
    throw "Cloudflare deploy failed with exit code $LASTEXITCODE"
  }

  Write-Host "Done. Primary URL: https://$($env:CF_PAGES_PROJECT).pages.dev"
}
finally {
  Pop-Location
}
