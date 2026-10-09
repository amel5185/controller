# Remote Flashlight Controller — website/API starter

## Vercel Environment Variables
Set these in Project Settings → Environment Variables:
- `SUPABASE_URL` — Supabase project URL
- `SUPABASE_SECRET_KEY` — Supabase secret key (legacy `SUPABASE_SERVICE_ROLE_KEY` also supported)

Redeploy after setting variables. Never put the secret key in HTML or APK.

## Database
The table `public.flashlight_commands` must contain `device_id` (text, unique), `command` (text, ON/OFF), `device_token_hash` (text), `control_token_hash` (text), `pairing_code_hash` (text), `last_seen_at` (timestamptz), `created_at` and `updated_at`. Run `supabase-migration.sql` if needed. Keep RLS enabled and do not add public write policies.

## API routes
- `POST /api/devices` creates a device and pairing code
- `POST /api/pair` exchanges a one-use pairing code for a device token
- `GET /api/devices?deviceId=...` reads status (requires `x-control-token`)
- `POST /api/command` sends ON/OFF (requires `x-control-token`)
- `GET /api/device?deviceId=...` polls the command (requires `x-device-token`)

## Important
This ZIP contains the web dashboard and Vercel API starter. It does **not** contain the AIDE Android APK project. The APK still needs to call `/api/pair`, securely save the returned device token, poll `/api/device`, and use Android CameraManager torch APIs with camera permission. Test with a spare device first. The website stores its control token in that browser's localStorage; clearing browser data loses that browser's saved controls.
