const request = require("supertest");
const app = require("../src/app");

describe("TaskFlow API", () => {
  let token;

  // ✅ Health check
  it("GET /health should return OK", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("OK");
  });

  // ✅ Register user
  it("POST /api/auth/register should register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
  });

  // ✅ Login user
  it("POST /api/auth/login should login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();

    token = res.body.token;
  });

  // ✅ Create task
  it("POST /api/tasks should create task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Learn CI/CD",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Learn CI/CD");
  });
});
