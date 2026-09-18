# Menu

Restaurant QR-menu service built with Express, EJS, MongoDB, and selectable image storage.

## Start with Docker

```bash
cp .env.example .env
docker compose up --build
```

Open `http://localhost:3000`. MongoDB indexes and the Superadmin account are initialized automatically from `SUPERADMIN_EMAIL` and `SUPERADMIN_PASSWORD`.

Set `PUBLIC_BASE_URL` to your deployed HTTPS domain before printing QR cards, for example `https://menu.yourdomain.com`. This is the base address encoded in every restaurant QR code.

The database is stored in the `mongo_data` Docker volume. Stop services with `docker compose down`.

## Image storage

- `STORAGE_DRIVER=local` saves product images in the `local_uploads` Docker volume.
- `STORAGE_DRIVER=cloudinary` uploads new product images to Cloudinary; configure the `CLOUDINARY_*` values in `.env`.

For local development, set `MONGODB_URI` to your MongoDB server and run `npm install` followed by `npm start`.
# Menu
# Menu
