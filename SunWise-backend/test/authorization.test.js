import test from "node:test";
import assert from "node:assert/strict";
import { authorize } from "../src/middlewares/auth.js";
import { validateBody } from "../src/middlewares/validate.js";

test("autoriza únicamente roles declarados", () => {
  let allowed = false;
  authorize("admin")({ auth: { role: "admin" } }, {}, (error) => { assert.equal(error, undefined); allowed = true; });
  assert.equal(allowed, true);
  authorize("admin")({ auth: { role: "user" } }, {}, (error) => assert.equal(error.status, 403));
});

test("valida correo, teléfono y números no negativos", () => {
  const middleware = validateBody({ email: { required: true, email: true }, phone: { required: true, phone: true }, stock: { required: true, number: true, min: 0 } });
  middleware({ body: { email: "no-es-correo", phone: "abc", stock: -1 } }, {}, (error) => {
    assert.equal(error.status, 422);
    assert.equal(error.details.length, 3);
  });
});
