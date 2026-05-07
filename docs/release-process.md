# Release Process

DotMatch releases should be specific, reproducible, and evidence-bounded.

## Pre-Tag Checks

Run these locally or confirm the same checks are green in CI:

```bash
make test
make cli-test
make python-test
make python-package-test
make repository-ready
make coverage
make public-crispr-evidence-gate
make crispr-comparison-gate
npm run lint
npm audit --audit-level=moderate
npm run build
NEXT_OUTPUT=export NEXT_PUBLIC_BASE_PATH=/dotmatch NEXT_PUBLIC_SITE_URL=https://dnncha.github.io/dotmatch npm run build
```

`make barcode-comparison-gate` and `make bcl-comparison-gate` require real-data and comparator evidence. Keep release notes within the evidence that is checked into the repository.

## Tagging

Use annotated tags:

```bash
git tag -a v0.1.0 -m "DotMatch v0.1.0"
git push origin v0.1.0
```

Pushing `v*` tags runs `.github/workflows/release.yml`. The workflow builds:

- Linux wheel;
- macOS wheel;
- source distribution;
- `SHA256SUMS.txt`;
- a draft GitHub release with generated notes.

Keep the GitHub release as a draft until the release notes, artifacts, checksums, `CITATION.cff`, and `codemeta.json` have been checked.

## Release Notes

Lead with:

- exact known-target short-DNA assignment;
- deterministic `unique`, `ambiguous`, `none`, and `invalid` semantics;
- CRISPR guide-counting evidence only where gates pass;
- package/install improvements;
- clear scope boundaries.

Avoid:

- genome-aligner language;
- universal guide-counter replacement language;
- barcode or BCL comparative wording without matching evidence.

## Distribution Follow-Up

- Create a Zenodo archive and add the DOI to `CITATION.cff` when available.
- Upload the sdist to PyPI first. Upload Linux binary wheels only after manylinux/musllinux wheel repair is in place; do not upload raw `linux_x86_64` wheels.
- Open a Bioconda recipe once the CLI package smoke test is stable.
- Upload Docker images after the source tag is immutable.
- Update `docs/scientific-claims.md` only when new evidence is committed and a corresponding gate passes.
