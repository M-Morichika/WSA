import { cases } from './data/cases/index.js?v=20260627-phaseb-coalition';
import { validateCaseRegistry, validateCaseReferences, lintCaseMethodology } from './data/auditSchema.js?v=20260627-phaseb-coalition';

console.log("=== Running Validations ===");
console.log("1. validateCaseRegistry:");
const registryErrors = validateCaseRegistry(cases);
console.log(`Errors: ${registryErrors.length}`);
registryErrors.forEach(err => console.error("  ", err));

console.log("\n2. validateCaseReferences:");
let allRefErrors = 0;
cases.forEach(c => {
  const errs = validateCaseReferences(c);
  allRefErrors += errs.length;
  console.log(`- ${c.warCase.id}: ${errs.length} errors`);
  errs.forEach(err => console.error("  ", err));
});

console.log("\n3. lintCaseMethodology:");
let allLintErrors = 0;
cases.forEach(c => {
  const errs = lintCaseMethodology(c);
  allLintErrors += errs.length;
  console.log(`- ${c.warCase.id}: ${errs.length} errors`);
  errs.forEach(err => console.error("  ", err));
});

if (registryErrors.length === 0 && allRefErrors === 0 && allLintErrors === 0) {
  console.log("\nALL CHECKS PASSED!");
  process.exit(0);
} else {
  console.error("\nSOME CHECKS FAILED!");
  process.exit(1);
}
