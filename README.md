# Website Deploy Notes

Production for `commutelive.com` is served by Docker Compose from `/opt/Server`, not PM2.

## Update the website on the server

1. SSH into the server.
2. Pull the latest website code:

```bash
cd /opt/Website
git pull
```

3. If `git pull` is blocked by a generated Next file:

```bash
git restore next-env.d.ts
git pull
```

4. If you changed environment variables such as `SITE_PASSWORD`, update:

```bash
/opt/Website/.env
```

5. Recreate the live web containers:

```bash
cd /opt/Server
sudo docker compose up -d --force-recreate web nginx
```

6. Watch the rebuild/start logs:

```bash
sudo docker compose logs -f web nginx
```

Wait until the `web` container finishes `pnpm install`, `pnpm build`, and `pnpm start`.

## Verify the site

Check the password gate:

```bash
curl -I http://commutelive.com/
```

Expected:

```text
HTTP/1.1 401 Unauthorized
```

Check the password works:

```bash
curl -u test:YOUR_PASSWORD -i http://commutelive.com/
```

Expected:

```text
HTTP/1.1 200 OK
```

## Current password gate behavior

- Username can be anything.
- Password comes from `SITE_PASSWORD` in `/opt/Website/.env`.
- The browser popup text is controlled by `proxy.ts`.

## Important notes

- Do not use PM2 for the website deploy path unless the production stack is changed.
- The live web containers are defined in:

```bash
/opt/Server/docker-compose.yml
```

- The public site is fronted by Docker Nginx on port `80`.
- If Cloudflare is used for HTTPS, keep the DNS record proxied unless origin HTTPS is configured separately.
