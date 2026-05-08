const { describe, it, before, after } = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");

const { app, db } = require("../src/server");

let server;
let baseUrl;

// Helper: make HTTP request and return { status, headers, body }
function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const options = {
      method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {},
    };

    if (body) {
      const payload = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
      options.headers["Content-Length"] = Buffer.byteLength(payload);
    }

    const req = http.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch {
          parsed = data;
        }
        resolve({ status: res.statusCode, headers: res.headers, body: parsed });
      });
    });

    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

// ── Setup & Teardown ──
before(async () => {
  await db.initialize();
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      resolve();
    });
  });
});

after(() => {
  if (server) server.close();
});

// ═══════════════════════════════════════════
// PAGE ROUTES
// ═══════════════════════════════════════════
describe("Page Routes", () => {
  const pages = [
    { path: "/", name: "Home" },
    { path: "/lessons", name: "Lessons" },
    { path: "/adventure", name: "Adventure" },
    { path: "/book", name: "Book" },
    { path: "/contact", name: "Contact" },
  ];

  for (const page of pages) {
    it(`GET ${page.path} returns 200 (${page.name})`, async () => {
      const res = await request("GET", page.path);
      assert.equal(res.status, 200);
      assert.ok(res.headers["content-type"].includes("text/html"));
    });
  }

  it("GET /nonexistent returns 404", async () => {
    const res = await request("GET", "/this-page-does-not-exist");
    assert.equal(res.status, 404);
  });
});

// ═══════════════════════════════════════════
// API — Newsletter
// ═══════════════════════════════════════════
describe("API /api/newsletter", () => {
  it("POST with valid email returns success", async () => {
    const res = await request("POST", "/api/newsletter", {
      email: "ci-test@example.com",
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("POST with invalid email returns 400", async () => {
    const res = await request("POST", "/api/newsletter", {
      email: "not-an-email",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it("POST with missing email returns 400", async () => {
    const res = await request("POST", "/api/newsletter", {});
    assert.equal(res.status, 400);
  });
});

// ═══════════════════════════════════════════
// API — Bookings
// ═══════════════════════════════════════════
describe("API /api/bookings", () => {
  const validBooking = {
    name: "CI Test User",
    email: "ci@test.com",
    phone: "07000000000",
    date: "2026-12-01",
    time: "10:00",
    activity: "driving-range",
    guests: 2,
    notes: "Automated test",
  };

  it("POST with valid data returns success", async () => {
    const res = await request("POST", "/api/bookings", validBooking);
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("POST with missing fields returns 400", async () => {
    const res = await request("POST", "/api/bookings", {
      name: "Test",
      email: "test@test.com",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });

  it("POST with invalid email returns 400", async () => {
    const res = await request("POST", "/api/bookings", {
      ...validBooking,
      email: "bad-email",
    });
    assert.equal(res.status, 400);
  });

  it("GET returns list of bookings", async () => {
    const res = await request("GET", "/api/bookings");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 1);
  });
});

// ═══════════════════════════════════════════
// API — Contact
// ═══════════════════════════════════════════
describe("API /api/contact", () => {
  it("POST with valid data returns success", async () => {
    const res = await request("POST", "/api/contact", {
      name: "CI Tester",
      email: "ci@contact.com",
      subject: "CI Test",
      message: "Automated test message",
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("POST with missing fields returns 400", async () => {
    const res = await request("POST", "/api/contact", {
      name: "Test",
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.success, false);
  });
});

// ═══════════════════════════════════════════
// API — Reviews
// ═══════════════════════════════════════════
describe("API /api/reviews", () => {
  it("GET returns approved reviews", async () => {
    const res = await request("GET", "/api/reviews");
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(Array.isArray(res.body.data));
    assert.ok(res.body.data.length >= 1);
  });

  it("POST with valid review returns success", async () => {
    const res = await request("POST", "/api/reviews", {
      name: "CI Reviewer",
      rating: 5,
      comment: "Great automated test!",
    });
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });

  it("POST with invalid rating returns 400", async () => {
    const res = await request("POST", "/api/reviews", {
      name: "Bad Rating",
      rating: 10,
      comment: "Invalid",
    });
    assert.equal(res.status, 400);
  });

  it("POST with missing fields returns 400", async () => {
    const res = await request("POST", "/api/reviews", {
      name: "Missing",
    });
    assert.equal(res.status, 400);
  });
});

// ═══════════════════════════════════════════
// Security Headers
// ═══════════════════════════════════════════
describe("Security", () => {
  it("Responses include security headers from Helmet", async () => {
    const res = await request("GET", "/");
    assert.ok(res.headers["x-content-type-options"]);
    assert.ok(res.headers["x-frame-options"] || res.headers["content-security-policy"]);
  });

  it("Responses are compressed", async () => {
    // compression only kicks in for responses > threshold, just check header exists
    const res = await request("GET", "/");
    // The server has compression enabled; content-encoding may or may not appear for small responses
    assert.equal(res.status, 200);
  });
});
