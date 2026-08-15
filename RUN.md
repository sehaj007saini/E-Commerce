# How to Run This Project

## Backend — IntelliJ IDEA

1. Open **`F:\SummerProject\SpringEcom`** in IntelliJ.
2. Create the database once (if not already done):
   ```sql
   CREATE DATABASE telusko2;
   ```
3. Copy `application-local.properties.example` → `application-local.properties` and set your PostgreSQL password.
4. Select run configuration **`SpringEcom`** and click **Run** ▶.

The API starts at **http://localhost:8080**. Verify: http://localhost:8080/api/products

---

## Frontend — VS Code

1. Open **`F:\SummerProject\ecom-frontend-5-main\ecom-frontend-5-main`** in VS Code.
2. In the terminal:
   ```bash
   npm install
   npm run dev
   ```
3. Open the URL shown (usually **http://localhost:5173**).

The frontend talks to the backend at `http://localhost:8080/api` by default.

---

## Run order

1. Start **backend** first (IntelliJ).
2. Then start **frontend** (VS Code).
3. Use the site in the browser.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Backend won't start — PostgreSQL password error | Set password in `application-local.properties` or `DB_PASSWORD` env var in Run Configurations |
| Port 8080 in use | Stop other apps on 8080, or add `server.port=8081` to `application.properties` |
| Frontend can't reach API | Ensure backend is running; check http://localhost:8080/api/products |
| IntelliJ can't find module | File → Project Structure → ensure JDK 21+ is selected |
| Maven not installed | Use `.\mvnw.cmd spring-boot:run` from the `SpringEcom` folder |
