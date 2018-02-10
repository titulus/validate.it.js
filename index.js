export default function validate(string) {
  const report = Object.create( validate.prototype );

  return Object.assign(report, {
      ok: true,
      string: string,
      checks: [],
      errors: [],
  });
};