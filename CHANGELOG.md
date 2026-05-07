# Changelog

All notable user-facing changes are tracked here. Public statements in release notes must stay aligned with `docs/scientific-claims.md`.

## 0.1.0 - Initial Release

### Added

- Native C short-DNA edit-distance and threshold assignment core.
- `dotmatch` CLI for pairwise distance, FASTQ assignment, demultiplexing, BCL milestone demultiplexing, count tables, CRISPR counting, audit, unmatched-read inspection, and validation.
- Python `dotmatch` package with ctypes bindings and local/GitHub wheel builds that bundle the native core.
- Deterministic assignment statuses: `unique`, `ambiguous`, `none`, and `invalid`.
- MAGeCK-compatible CRISPR count output, QC summaries, self-contained HTML reports, and audit artifacts.
- Reproducible benchmark reports, raw CSV evidence, and strict CRISPR validation gates.
- GitHub Actions CI, release artifact workflow, repository-readiness checker, contribution guide, security policy, support policy, and citation metadata.

### Verified Evidence

- Known-target short-DNA assignment and CRISPR guide-counting statements are supported only where `make public-crispr-evidence-gate` and `make crispr-comparison-gate` pass on committed evidence.
- General alignment, barcode comparative, and raw BCL/CBCL comparative wording should stay within the evidence boundaries documented in `docs/scientific-claims.md`.

### Packaging Status

- Source builds, local Python package builds, and GitHub release wheel/sdist artifacts are supported by repository checks.
- PyPI manylinux/musllinux Linux wheels, Bioconda packaging, Docker image distribution, and Zenodo DOI registration are separate distribution tasks.
