# DotMatch Evidence Notes

This page maps user-facing statements to the evidence currently checked into the repository. Keep wording specific unless a raw artifact, validation command, and generated report support broader wording.

## Current Defensible Statements

| Statement | Status | Evidence | Boundary |
| --- | --- | --- | --- |
| DotMatch provides exact short-DNA global edit distance and threshold matching for known targets. | Supported | `make test`, `make cli-test`, native C tests, Python tests, `docs/benchmarks/native/README.md` | Not a genome aligner; no CIGAR/SAM/BAM support. |
| Indexed assignment preserves native exhaustive-scan semantics for `unique`, `ambiguous`, `none`, and `invalid` outcomes in the supported `k<=1` lanes. | Supported | `dotmatch validate`, native assignment tests, Edlib validation artifacts under `benchmarks/raw/` | Current wildcard `N` behavior is literal-byte matching, not IUPAC wildcard semantics. |
| Public CRISPR guide-counting rows are validated. | Supported | `make public-crispr-evidence-gate` passes; report at `docs/benchmarks/public_crispr/README.md` | Supports the documented MAGeCK/Yusa public-data workflow, not universal CRISPR superiority. |
| Extended CRISPR comparison rows are validated. | Supported | `make crispr-comparison-gate` passes; report at `docs/benchmarks/crispr_comparison/README.md` | Applies to the recorded CRISPR guide-counting lanes and their documented comparator semantics. |
| DotMatch has a native fixed-position inline barcode demultiplexing command with fixed-length and auto-length barcode sheet modes. | Supported | `make cli-test`, `make bench-barcode-demux`, report at `docs/benchmarks/barcode_demux/README.md` | Barcode comparison wording is blocked until real barcode sheet and comparator requirements pass. |
| DotMatch has a first classic per-cycle BCL demultiplexing milestone. | Supported | `make cli-test`, `make bench-bcl-small`, report at `docs/benchmarks/bcl_demux/README.md` | CBCL/NovaSeq-style and production Illumina replacement wording is blocked. |

## Evidence Boundaries

| Area | Check | Boundary |
| --- | --- | --- |
| Barcode demultiplexing comparisons. | `make barcode-comparison-gate` requires real-data rows, assigned reads, Cutadapt rows, and at least one additional relevant comparator before broader wording is used. | The built-in fixture is a workflow smoke test. |
| Raw BCL demultiplexing comparisons. | `make bcl-comparison-gate` requires real run folders, CBCL evidence where relevant, and production comparator validation before broader wording is used. | The built-in BCL rows are milestone and smoke-test rows. |
| General aligner replacement. | No repository check promotes this. | DotMatch does not currently expose reference-index mapping, traceback/CIGAR, SAM/BAM, paired-end mapping, or genome-scale alignment semantics. |
| Package-channel availability. | `make python-package-test` verifies local Linux/macOS wheel and sdist installability. | PyPI, Bioconda, Docker registry, and Zenodo release artifacts are separate distribution channels. |

## Rules For New Public Statements

New README, website, or release-note statements should include:

- exact command lines;
- raw CSV artifacts under `benchmarks/raw/`;
- a generated report under `docs/benchmarks/`;
- correctness validation against the relevant oracle;
- comparator versions and semantics;
- a gate script when the statement is important enough to appear in the README.
