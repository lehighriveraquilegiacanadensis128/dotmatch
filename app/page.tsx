const useCases = [
  {
    title: "CRISPR guide counting",
    body: "Turn FASTQ/FASTQ.gz reads into MAGeCK-compatible count matrices, with QC summaries beside the counts."
  },
  {
    title: "Inline barcode demultiplexing",
    body: "Split fixed-position single-end reads by barcode. Ambiguous and unmatched reads can be written out for inspection."
  },
  {
    title: "Classic BCL demultiplexing",
    body: "Read classic per-cycle Illumina BCL folders and write sample FASTQ.gz files plus demux stats. CBCL is not supported yet."
  },
  {
    title: "Audit, validation, and diagnosis",
    body: "Check whether a library is safe to rescue at one edit, then validate indexed assignments against an exhaustive scan."
  }
];

const repoUrl = "https://github.com/dnncha/dotmatch";
const citationUrl = `${repoUrl}/blob/main/CITATION.cff`;
const methodsUrl = `${repoUrl}/blob/main/docs/methods-and-citation.md`;
const publicCrisprUrl = `${repoUrl}/blob/main/docs/benchmarks/public_crispr/README.md`;

const proof = [
  ["Best fit", "known target lists", "Guides, barcodes, primers, adapters, panels, and other short sequences where the candidate list is already fixed."],
  ["Correctness rule", "index matches scan", "The fast path is tested against the native exhaustive scan for the same targets, k, and ambiguity policy."],
  ["Public CRISPR data", "5 repeated rows", "The checked-in Yusa/MAGeCK rows cover 10k and 100k reads per sample, with Edlib validation and count-agreement gates."],
  ["Repository contents", "C, CLI, Python", "Core code, bindings, tests, scripts, reports, schemas, and raw benchmark tables live in the repo."]
];

const commands = [
  "dotmatch crispr-count --library guides.csv --samples samples.tsv --guide-start 23 --guide-length 19 --k 1 --metric levenshtein --indel-window 1 --out counts.mageck.tsv --summary qc.json",
  "dotmatch count --targets guides.csv --reads sample.fastq.gz --target-start 23 --target-length 19 --k 1 --metric levenshtein --indel-window 1 --report report.html --sample-qc sample_qc.tsv",
  "dotmatch demux --barcodes barcodes.tsv --reads pooled.fastq.gz --barcode-start 0 --barcode-length 8 --k 1 --metric hamming --out-dir demuxed --summary demux.qc.json",
  "dotmatch bcl-demux --run-folder 240101_RUN --sample-sheet SampleSheet.csv --out-dir bcl_demuxed --barcode-mismatches 1 --summary bcl.summary.json",
  "dotmatch audit --targets guides.tsv --k 1 --out-dir audit",
  "dotmatch inspect-unmatched --targets guides.tsv --reads sample.fastq.gz --target-start 23 --target-length 19 --k 1 --offset-window 2 --top 100 --out top_unmatched.tsv",
  "dotmatch validate --targets guides.tsv --reads sample.fastq.gz --target-start 23 --target-length 19 --k 1 --indel-window 1 --oracle edlib --sample 100000"
];

const throughputRows = [
  { label: "DotMatch exact k=0", value: 1143740, tone: "green" },
  { label: "DotMatch Hamming k=1", value: 331494, tone: "green" },
  { label: "guide-counter one mismatch", value: 194968, tone: "blue" },
  { label: "MAGeCK exact count", value: 92761, tone: "gray" },
  { label: "DotMatch Levenshtein k=1", value: 8836, tone: "green" }
] as const;

const memoryRows = [
  { label: "guide-counter one mismatch", value: 528.7, tone: "blue" },
  { label: "MAGeCK exact count", value: 158.9, tone: "gray" },
  { label: "DotMatch exact k=0", value: 28.7, tone: "green" },
  { label: "DotMatch Hamming k=1", value: 28.7, tone: "green" },
  { label: "DotMatch Levenshtein k=1", value: 27.5, tone: "green" }
] as const;

const candidateRows = [
  { label: "DotMatch Levenshtein verified/read", value: 2.822, tone: "green" },
  { label: "Exhaustive scan targets/read", value: 87437, tone: "blue" }
] as const;

const agreementRows = [
  { label: "DotMatch exact vs MAGeCK exact", value: 1.0, tone: "green" },
  { label: "DotMatch Hamming vs guide-counter", value: 0.942, tone: "blue" }
] as const;

const scalingRows = [
  { label: "guide-counter, 8 samples", value: 34800, tone: "blue" },
  { label: "guide-counter, 4 samples", value: 17400, tone: "blue" },
  { label: "guide-counter, 2 samples", value: 8700, tone: "blue" },
  { label: "DotMatch, 8 samples", value: 0, tone: "green" }
] as const;

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="DotMatch home">
          <span className="brand-mark" />
          DotMatch
        </a>
        <nav aria-label="Primary navigation">
          <a href="#benchmarks">Benchmarks</a>
          <a href="#install">Install</a>
          <a href="#use-cases">Use cases</a>
          <a href="#cite">Cite</a>
          <a href={repoUrl}>GitHub</a>
        </nav>
        <a className="header-cta" href={repoUrl}>Source</a>
      </header>

      <section id="top" className="hero">
        <div className="hero-copy">
          <h1>DotMatch</h1>
          <p className="hero-lede">
            Short-read assignment for target lists you already know.
          </p>
          <p className="hero-text">
            DotMatch is a small C/Python tool for assays where a read should
            land on one guide, barcode, primer, adapter, or panel target. It
            checks exact, Hamming, and k=1 Levenshtein matches, and it leaves
            ties visible.
          </p>
          <div className="hero-actions">
            <a href="#benchmarks" className="button primary">
              Explore results
            </a>
            <a href="#install" className="button secondary">
              Install
            </a>
            <a href={repoUrl} className="button secondary">
              GitHub
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="DotMatch benchmark summary">
          <div className="panel-topline">
            <span>v0.1.0</span>
            <span>known targets only</span>
          </div>
          <div className="metric-grid">
            <div>
              <strong>87,437</strong>
              <span>public MAGeCK/Yusa guides in the current benchmark fixture</span>
            </div>
            <div>
              <strong>0</strong>
              <span>Edlib validation mismatches across sampled public CRISPR reads</span>
            </div>
            <div>
              <strong>331k</strong>
              <span>reads/s DotMatch Hamming k=1 mean on repeated 100k-record/sample rows</span>
            </div>
            <div>
              <strong>28.7 MB</strong>
              <span>peak RSS for DotMatch Hamming k=1 repeated public CRISPR rows</span>
            </div>
          </div>
          <div className="sequence-rail" aria-hidden="true">
            {Array.from({ length: 64 }).map((_, i) => (
              <span key={i} className={i % 7 === 0 ? "hot" : i % 5 === 0 ? "cool" : ""} />
            ))}
          </div>
        </div>
      </section>

      <section id="install" className="section launch-section">
        <div className="section-heading">
          <h2>Start from the repo. Cite the exact release.</h2>
          <p>
            DotMatch is not on every package channel yet, so the honest first
            install is from source. The repo includes the tests, benchmark
            scripts, raw CSVs, and citation file we use ourselves.
          </p>
        </div>
        <div className="launch-grid">
          <article className="launch-card">
            <span className="card-label">Build it locally</span>
            <h3>Clone the repo and run the release check.</h3>
            <pre><code>{`git clone https://github.com/dnncha/dotmatch.git
cd dotmatch
make
python3 -m pip install .
make repository-ready`}</code></pre>
            <a href={repoUrl}>Open GitHub</a>
          </article>

          <article id="cite" className="launch-card">
            <span className="card-label">Cite it</span>
            <h3>Use the release citation and a matching methods sentence.</h3>
            <p>
              If DotMatch helps an analysis, cite the software release. The
              methods note has short wording for CRISPR guide counting,
              one-edit Levenshtein rescue, and Hamming-only comparisons.
            </p>
            <div className="link-stack">
              <a href={citationUrl}>CITATION.cff</a>
              <a href={methodsUrl}>Methods and citation notes</a>
            </div>
          </article>

          <article className="launch-card">
            <span className="card-label">Check the data</span>
            <h3>The main public comparison is deliberately narrow.</h3>
            <p>
              The public CRISPR benchmark is the best-supported comparison
              today: Yusa-style guide counting, checked-in rows, and validation
              against the assignment oracle.
            </p>
            <div className="link-stack">
              <a href={publicCrisprUrl}>Public CRISPR benchmark report</a>
              <a href="#benchmarks">Review benchmark summary</a>
            </div>
          </article>
        </div>
      </section>

      <section id="benchmarks" className="section proof-section">
        <div className="section-heading">
          <h2>What we can defend today.</h2>
          <p>
            We are keeping the claims narrow for v0.1.0. DotMatch is for
            known-target FASTQ assignment; it is not a genome aligner or a
            replacement for every demultiplexing stack.
          </p>
        </div>
        <div className="proof-grid">
          {proof.map(([label, value, detail]) => (
            <article className="proof-card" key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <div className="benchmark-grid">
          <article className="benchmark-card">
            <div className="chart-copy">
              <span className="card-label">Public CRISPR benchmark</span>
              <h3>The Yusa rows are in the repo.</h3>
              <p>
                These rows are not a leaderboard. They are the first public case
                we can rerun and inspect: five 100k-record/sample repeats for
                DotMatch, MAGeCK, and guide-counter, with exact, Hamming, and
                Levenshtein kept separate.
              </p>
            </div>
            <HorizontalBarChart
              rows={throughputRows}
              unit="reads/s"
              axisLabel="Mean throughput, 100k records/sample, log scale"
              scale="log"
            />
          </article>

          <article className="benchmark-card">
            <div className="chart-copy">
              <span className="card-label">Candidate verification</span>
              <h3>k=1 Levenshtein usually checks only a few candidates.</h3>
              <p>
                On the public Yusa rows, the index sends about 2.822 candidate
                targets per read to exact verification, out of an 87,437-guide
                library.
              </p>
            </div>
            <HorizontalBarChart
              rows={candidateRows}
              unit="checks/read"
              axisLabel="Work per read, log scale"
              scale="log"
            />
          </article>

          <article className="benchmark-card">
            <div className="chart-copy">
              <span className="card-label">Memory profile</span>
              <h3>The CRISPR counter stays small.</h3>
              <p>
                The repeated Yusa runs put DotMatch Hamming and exact lanes
                around 28.7 MB peak RSS. guide-counter is around 528.7 MB on the
                same fixture.
              </p>
            </div>
            <HorizontalBarChart
              rows={memoryRows}
              unit="MB"
              axisLabel="Max peak RSS, lower is better"
              scale="linear"
            />
          </article>

          <article className="benchmark-card">
            <div className="chart-copy">
              <span className="card-label">Count agreement</span>
              <h3>Comparator counts are useful, but not oracles.</h3>
              <p>
                MAGeCK and guide-counter help us compare familiar workflows.
                Correctness is checked against exhaustive assignment, not
                whichever external tool happens to agree.
              </p>
            </div>
            <AgreementChart rows={agreementRows} />
          </article>

          <article className="benchmark-card">
            <div className="chart-copy">
              <span className="card-label">Multi-sample CRISPR</span>
              <h3>One read, one counted assignment.</h3>
              <p>
                In the 2/4/8-sample scaling run, DotMatch records zero
                overcount reads. The guide-counter multi-offset lane can count
                more assignments than reads.
              </p>
            </div>
            <HorizontalBarChart
              rows={scalingRows}
              unit="reads"
              axisLabel="Overcount reads, lower is better"
              scale="linear"
            />
          </article>
        </div>
      </section>

      <section id="use-cases" className="section use-cases">
        <div className="section-heading">
          <h2>Where it fits.</h2>
          <p>
            We wrote DotMatch for assays that already have a small target list.
            If you need genome mapping, SAM/BAM, CIGAR, wildcard N matching,
            CBCL/NovaSeq BCL input, or package-channel installs, those are still
            future work.
          </p>
        </div>
        <div className="usecase-grid">
          {useCases.map((item) => (
            <article key={item.title} className="usecase">
              <span className="usecase-dot" />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="comparison" className="section comparison">
        <div className="section-heading">
          <h2>Built around the awkward cases.</h2>
          <p>
            The important cases are not just matches. DotMatch keeps ambiguous,
            unsafe, and unmatched reads available so a run can be audited later.
          </p>
        </div>
        <div className="comparison-layout">
          <div className="comparison-table" role="table" aria-label="DotMatch current CLI support">
            <div role="row" className="table-head">
              <span>Part</span>
              <span>Works now</span>
              <span>Still outside v0.1.0</span>
            </div>
            <Row
              a="Core assignment"
              b="Exact global edit distance, threshold queries, k=0/k=1 index, best or radius ambiguity policy"
              c="No semi-global/infix alignment, traceback, CIGAR, or wildcard N matching yet"
            />
            <Row
              a="CRISPR counting"
              b="FASTQ/FASTQ.gz count, crispr-count wrapper, MAGeCK matrix, QC JSON/TSV, HTML report"
              c="Evidence is for Yusa-style guide counting, not broad screen analysis"
            />
            <Row
              a="Inline demux"
              b="Fixed-position single-end FASTQ/FASTQ.gz barcode splitting with ambiguous and unmatched outputs"
              c="The built-in fixture is a smoke test; real public barcode rows still need more work"
            />
            <Row
              a="Classic BCL demux"
              b="RunInfo, SampleSheet v1/v2 data sections, classic per-cycle BCL(.gz), filter files, sample FASTQ.gz"
              c="CBCL/NovaSeq-style input remains a planned milestone"
            />
            <Row
              a="Checks and diagnostics"
              b="audit, validate, optional Edlib oracle, inspect-unmatched, public TSV/JSON schemas"
              c="Hosted workflow management is outside the current repository scope"
            />
          </div>
          <div className="evidence-notes">
            <article>
              <span>Synthetic inline demux</span>
              <strong>918k reads/s</strong>
              <p>
                This is a 20k-read smoke fixture with four barcodes and Hamming
                k=1. It matches Cutadapt assigned/unmatched totals. We do not
                present it as a broad barcode benchmark.
              </p>
            </article>
            <article>
              <span>Classic BCL demux</span>
              <strong>61k clusters/s</strong>
              <p>
                The public 10x tiny-BCL row has 2.14M clusters, 132 cycles, and
                one sample. The bcl2fastq comparator row is 20.8k clusters/s
                with zero validation mismatches.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="workflow" className="section workflow">
        <div className="workflow-copy">
          <h2>Command-line first.</h2>
          <p>
            The core is C, with a CLI and Python ctypes bindings. Runs can write
            count matrices, FASTQ splits, QC tables, assignment diagnostics,
            audit files, validation summaries, and self-contained HTML reports.
          </p>
        </div>
        <div className="terminal" aria-label="DotMatch commands">
          <div className="terminal-bar">
            <span />
            <span />
            <span />
          </div>
          {commands.map((command) => (
            <code key={command}>
              <span>$</span> {command}
            </code>
          ))}
        </div>
      </section>

      <section className="section final-cta">
        <h2>For short reads with known targets.</h2>
        <p>
          Use DotMatch when exact one-edit assignment matters, and when the
          ambiguous or unmatched reads are as important as the counts.
        </p>
        <a className="button primary" href="#benchmarks">
          Review the evidence
        </a>
      </section>
    </main>
  );
}

function Row({ a, b, c }: { a: string; b: string; c: string }) {
  return (
    <div role="row">
      <span data-label="Surface">{a}</span>
      <span data-label="Works now">{b}</span>
      <span data-label="Not yet">{c}</span>
    </div>
  );
}

function HorizontalBarChart({
  rows,
  unit,
  axisLabel,
  scale
}: {
  rows: readonly { label: string; value: number; tone: string }[];
  unit: string;
  axisLabel: string;
  scale: "linear" | "log";
}) {
  const max = Math.max(...rows.map((row) => row.value));
  const logFloor = 1;
  const ticks = scale === "log" ? logTicks(max) : [0, max * 0.25, max * 0.5, max * 0.75, max];
  const ariaSummary = rows
    .map((row) => `${row.label}: ${formatNumber(row.value)} ${unit}`)
    .join("; ");

  function width(value: number) {
    if (scale === "log") {
      const min = Math.log10(logFloor);
      const range = Math.log10(max) - min || 1;
      return ((Math.log10(Math.max(value, logFloor)) - min) / range) * 100;
    }

    return (value / max) * 100;
  }

  return (
    <div className="native-chart" role="img" aria-label={`${axisLabel}. ${ariaSummary}.`}>
      <div className="chart-axis-label">{axisLabel}</div>
      <div className="chart-plot">
        <div className="chart-gridlines" aria-hidden="true">
          {ticks.map((tick) => {
            const left = scale === "log" ? width(tick) : (tick / max) * 100;
            return <span key={tick} style={{ left: `${Math.min(left, 100)}%` }} />;
          })}
        </div>
        <div className="bar-list">
          {rows.map((row) => (
            <div className="bar-row" key={row.label}>
              <div className="bar-meta">
                <span>{row.label}</span>
                <strong>
                  {formatNumber(row.value)}
                  <em>{unit}</em>
                </strong>
              </div>
              <div className="bar-track">
                <span
                  className={`tone-${row.tone}`}
                  style={{ width: `${Math.max(width(row.value), 1.5)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="chart-ticks" aria-hidden="true">
          {ticks.map((tick) => {
            const left = scale === "log" ? width(tick) : (tick / max) * 100;
            return (
              <span key={tick} style={{ left: `${Math.min(left, 100)}%` }}>
                {formatCompact(tick)}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function AgreementChart({
  rows
}: {
  rows: readonly { label: string; value: number; tone: string }[];
}) {
  const ticks = [0, 0.25, 0.5, 0.75, 1];
  const ariaSummary = rows
    .map((row) => `${row.label}: Pearson ${row.value.toFixed(3)}`)
    .join("; ");

  return (
    <div
      className="native-chart agreement-chart"
      role="img"
      aria-label={`Pearson agreement by workflow. ${ariaSummary}.`}
    >
      <div className="chart-axis-label">Pearson correlation by guide count table</div>
      <div className="chart-plot">
        <div className="chart-gridlines" aria-hidden="true">
          {ticks.map((tick) => (
            <span key={tick} style={{ left: `${tick * 100}%` }} />
          ))}
        </div>
        <div className="agreement-list">
          {rows.map((row) => (
            <div className="agreement-row" key={row.label}>
              <div className="agreement-meta">
                <span>{row.label}</span>
                <strong>{row.value.toFixed(3)}</strong>
              </div>
              <div className="bar-track">
                <span className={`tone-${row.tone}`} style={{ width: `${row.value * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="chart-ticks" aria-hidden="true">
          {ticks.map((tick) => (
            <span key={tick} style={{ left: `${tick * 100}%` }}>
              {tick.toFixed(tick === 0 || tick === 1 ? 0 : 2)}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function formatNumber(value: number) {
  return value.toLocaleString(undefined, {
    maximumFractionDigits: value < 100 ? 1 : 0
  });
}

function formatCompact(value: number) {
  if (value >= 1000000) {
    const scaled = value / 1000000;
    return `${scaled >= 10 ? Math.round(scaled) : Number(scaled.toFixed(1))}M`;
  }

  if (value >= 1000) {
    const scaled = value / 1000;
    return `${scaled >= 10 ? Math.round(scaled) : Number(scaled.toFixed(1))}k`;
  }

  return value.toLocaleString(undefined, {
    maximumFractionDigits: value < 10 ? 1 : 0
  });
}

function logTicks(max: number) {
  const ticks = [];
  const topPower = Math.ceil(Math.log10(Math.max(max, 1)));

  for (let power = 0; power <= topPower; power += 1) {
    ticks.push(10 ** power);
  }

  return ticks;
}
