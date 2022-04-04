export const DBError = (err, req, resp) => {
  console.log(`[DB] error executing: ${req.url}`);
  console.log(`[DB] ${err}`);
  resp.status(503).send();
  return;
};
