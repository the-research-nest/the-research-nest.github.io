export const colors = {
  ink: "#1c1510",
  body: "#3a3028",
  muted: "#7a6a58",
  dim: "#b0a090",
  rule: "#ddd0bc",
  warm: "#f8f4ee",
  paper: "#fffcf8",
  bg: "#f4f0e8",
  rust: "#b83a12",
  teal: "#1a5e5e",
  gold: "#8a6000",
  sage: "#3d6644",
  slate: "#2e4060",
  plum: "#62305a"
} as const;

export const chapters = [
  "The Big Idea",
  "What Research Says",
  "The Experiment Plan",
  "The 10K Micro-Lab",
  "What to Feed It",
  "How We Know It Worked",
  "The Proof Path"
];

export const mastheadPills = [
  { label: "10K Parameters", color: colors.teal },
  { label: "Scaling Laws", color: colors.slate },
  { label: "Grokking", color: colors.rust },
  { label: "12 Primary Sources", color: colors.gold }
];

export const bigIdeaQuestions = [
  {
    label: "Question A - Forward",
    color: colors.teal,
    question: '"I have this much data. How small can my AI be?"',
    description:
      "You want an AI that knows everything about tax law. How many parameters does it actually need to genuinely understand that domain?"
  },
  {
    label: "Question B - Inverse",
    color: colors.rust,
    question: '"My AI has only 10K params. How much can it learn?"',
    description:
      "You're building an AI for a tiny edge device. What's the maximum knowledge you can squeeze in, and how should you write that knowledge?"
  }
];

export const understandingTests = [
  {
    title: "It answers questions it has never seen",
    description:
      "Not regurgitating memorised answers - genuinely applying what it learned to new combinations and situations.",
    color: colors.teal
  },
  {
    title: "It reasons across multiple steps",
    description:
      "Chaining facts together: 'A is bigger than B, B is bigger than C, therefore A is bigger than C.'",
    color: colors.sage
  },
  {
    title: "It knows what it doesn't know",
    description:
      "Confident on things it learned, appropriately uncertain on things outside its training. This is called calibration.",
    color: colors.gold
  },
  {
    title: "Its knowledge transfers to adjacent tasks",
    description:
      "Its internal representations are good enough that a tiny 500-parameter add-on can learn a related task very fast.",
    color: colors.rust
  }
];

export const ratioCards = [
  { model: "Chinchilla-70B", ratio: "20:1", note: "The original rule", color: colors.teal },
  {
    model: "Llama-3-8B",
    ratio: "1,875:1",
    note: "15T tokens / 8B params",
    color: colors.sage
  },
  {
    model: "Qwen3-0.6B",
    ratio: "60,000:1",
    note: "36T tokens / 0.6B params",
    color: colors.gold
  }
];

export const grokkingPhases = [
  {
    title: "Phase 1 - Memorisation",
    description:
      "The model brute-force memorises all training examples. Performance on the training set hits 100%, but the test set stays near zero. Like a student who highlighted every sentence without understanding any of it.",
    color: colors.rust
  },
  {
    title: "Phase 2 - Circuit Formation",
    description:
      "Quietly in the background, the model builds the actual generalising solution - a compact algorithmic circuit. For modular arithmetic, Nanda showed this is literally a Fourier transform circuit. This phase is invisible in the loss numbers.",
    color: colors.gold
  },
  {
    title: "Phase 3 - Cleanup",
    description:
      "Weight decay gradually prunes away the memorisation solution. The efficient generalising circuit takes over. Test accuracy suddenly shoots to near-perfect. This is the grokking event.",
    color: colors.teal
  }
];

export const researchGaps = [
  {
    question: "Gap 1: No one has measured P*(T) below 1M parameters",
    answer:
      "Every scaling law paper starts at 10M+ parameters. We go to 10K - 1,000x smaller than any published characterisation. The territory is genuinely blank.",
    color: colors.rust
  },
  {
    question: "Gap 2: No one has asked the inverse question",
    answer:
      "All papers vary the model size and fix the data. We also fix the model and vary the data. 'Given P=10K, what is T_max?' is entirely unaddressed in the literature.",
    color: colors.teal
  },
  {
    question: "Gap 3: No one connects grokking to scaling law exponents",
    answer:
      "The grokking research community and the scaling law community are completely separate. We use the grokking phase transition as the operational definition of P*(T) - unifying the two.",
    color: colors.gold
  },
  {
    question: "Gap 4: Quality multipliers at sub-1M scale are unknown",
    answer:
      "Does chain-of-thought formatting help a 10K-parameter model the way it helps a 1B model? The Phi results are at billion-parameter scale. Nobody has measured this at tiny scale.",
    color: colors.sage
  }
];

export const phaseCards = [
  {
    phase: "Phase 0",
    subheading: "Micro-Lab",
    description: "10K params. Tiny synthetic dataset. Runs on a laptop in hours.",
    color: colors.teal
  },
  {
    phase: "Phase 1",
    subheading: "Frontier Sweep",
    description: "10K -> 10M params. Map the full P*(T) curve.",
    color: colors.sage
  },
  {
    phase: "Phase 2",
    subheading: "Data Quality",
    description: "Fix model size. Vary data quality. Measure the multiplier.",
    color: colors.gold
  },
  {
    phase: "Phase 3",
    subheading: "Architecture",
    description: "Does model family change the efficiency ceiling?",
    color: colors.rust
  }
];

export const scaleCards = [
  {
    label: "GPT-4 (est.)",
    params: "~1.8 trillion",
    note: "Current frontier model",
    color: colors.rust
  },
  {
    label: "GPT-2 Small",
    params: "124 million",
    note: "Common baseline",
    color: colors.gold
  },
  {
    label: "Our Model",
    params: "10,000",
    note: "<- this experiment",
    color: colors.teal
  }
];

export const architectureOptions = [
  {
    name: "Tiny MLP",
    params: "~13K",
    shape: "Input 64 -> Hidden 100 -> Output 64",
    pro: "Simple, fast, interpretable.",
    con: "No sequence memory - treats every token independently.",
    verdict: "Good for pure pattern-matching. Limited for relational reasoning chains.",
    color: colors.gold
  },
  {
    name: "minGRU / micro-LSTM",
    params: "~8K",
    shape: "Hidden size ~50, 1-layer recurrent",
    pro: "Sequence memory. Can track relationships across context.",
    con: "Very narrow hidden state - limited capacity.",
    verdict:
      "Top candidate for Phase 0. BabyLM 2025 confirms recurrent models win at tiny scale.",
    color: colors.teal
  },
  {
    name: "Mini Transformer",
    params: "~40K",
    shape: "d=32, 1-head, 1-layer, ctx=64",
    pro: "State-of-the-art architectural principle.",
    con: "Even the minimal version is 4x over our 10K budget.",
    verdict: "Over budget. Would need d=8 to fit - too narrow to be meaningful.",
    color: colors.muted
  }
];

export const worldLayers = [
  {
    layer: "Layer 1",
    name: "The Facts",
    tokens: "~500 tokens",
    description:
      "50 atomic facts about the world - 'Zorblax is in the Gren region' - each expressed in three different phrasings to prevent surface-pattern matching.",
    color: colors.teal
  },
  {
    layer: "Layer 2",
    name: "The Rules",
    tokens: "~500 tokens",
    description:
      "20 logical rules that compose the facts. 'If X is in Y and Y is in Z, then X is in Z.' These are what we actually want the model to internalise.",
    color: colors.sage
  },
  {
    layer: "Layer 3",
    name: "Worked Examples",
    tokens: "~1,000 tokens",
    description:
      "50 question-and-answer pairs showing the rules in action, with full chain-of-thought reasoning written out step by step.",
    color: colors.gold
  },
  {
    layer: "Layer 4",
    name: "Tricky Near-Misses",
    tokens: "~500 tokens",
    description:
      "25 near-miss examples - wrong applications of the rules, with corrections. Forces the model to learn rule boundaries, not just rule patterns.",
    color: colors.rust
  }
];

export const formatOptions = [
  {
    code: "F1",
    name: "Plain Facts",
    example: '"Zorblax is in the Gren region."',
    note: "Bare minimum. No scaffolding. The baseline condition.",
    color: colors.muted
  },
  {
    code: "F2",
    name: "Question & Answer",
    example: '"Where is Zorblax? - Zorblax is in the Gren region."',
    note: "Explicit supervision signal. The answer is directly paired with the question.",
    color: colors.gold
  },
  {
    code: "F3",
    name: "Chain of Thought",
    example:
      '"To find where Zorblax is: first consult the location table... therefore Zorblax is in Gren."',
    note: "The reasoning is written out step by step. Our top prediction for highest T*(P).",
    color: colors.teal
  },
  {
    code: "F4",
    name: "Contrastive",
    example: '"Zorblax is in Gren, NOT Plorbis. This distinction matters because..."',
    note: "Teaches what's wrong alongside what's right. Sharpens rule boundaries.",
    color: colors.sage
  },
  {
    code: "F5",
    name: "Optimal Mix",
    example: "A carefully proportioned mixture of the above formats.",
    note:
      "Based on 2025 research showing mixtures outperform pure formats. Our actual top candidate.",
    color: colors.rust
  }
];

export const assimilationTests = [
  {
    label: "Test 1",
    name: "Did It Grokk?",
    weight: "Primary indicator",
    description:
      "The binary test: did the model cross the phase transition? We present novel queries that require all learned rules, applied to fact combinations never seen in training. Must hit 95%+ accuracy.",
    color: colors.teal
  },
  {
    label: "Test 2",
    name: "Multi-Step Reasoning",
    weight: "High weight",
    description:
      "1-hop, 2-hop, 3-hop, and 4-hop questions - each requiring multiple rule applications chained together. A model that only memorised surface patterns will fail on 3+ hops even if it passes 1-hop.",
    color: colors.sage
  },
  {
    label: "Test 3",
    name: "Calibration",
    weight: "Medium weight",
    description:
      "We ask about things outside the training data. A well-calibrated model says 'I'm not sure' rather than confidently confabulating. Expected calibration error (ECE) is the metric.",
    color: colors.gold
  },
  {
    label: "Test 4",
    name: "LoRA Transfer Probe",
    weight: "Medium weight",
    description:
      "We freeze the model and attach a 500-parameter LoRA add-on. We train that add-on on an adjacent task in the same world. If the frozen model learned rich representations, the add-on learns fast.",
    color: colors.rust
  },
  {
    label: "Test 5",
    name: "Consistency Under Rephrasing",
    weight: "Lower weight",
    description:
      "The same question asked five different ways. Does the model give the same answer each time? Inconsistency signals surface-pattern matching rather than a stable internal representation.",
    color: colors.slate
  }
];

export const criticalControls = [
  {
    title: "Weight decay is not optional",
    description:
      "Grokking does not fire without weight decay in the optimiser (Nanda et al. 2023). We sweep four values: {0.001, 0.01, 0.1, 1.0}. The minimum weight decay that triggers grokking is itself a finding.",
    color: colors.rust
  },
  {
    title: "Grokking onset time is noisy",
    description:
      "Zunkovic & Ilievski (2024) showed grokking onset follows a fat-tailed distribution - high variance even at identical settings. We run 3 random seeds per cell and report median and interquartile range.",
    color: colors.gold
  },
  {
    title: "Unique tokens vs. total tokens",
    description:
      "Training for 100 epochs on 2,500 tokens means 250,000 total tokens but only 2,500 unique ones. We track and report both. They have different implications for the P*(T) fit.",
    color: colors.teal
  },
  {
    title: "Embedding parameters are special",
    description:
      "Kaplan et al. (2020) originally excluded embeddings from parameter counts, which skewed their exponents. We follow Besiroglu et al.'s (2024) corrected methodology and report total and non-embedding parameters separately.",
    color: colors.sage
  },
  {
    title: "Test set independence guaranteed",
    description:
      "WorldKB test queries are generated by a separate rule-application algorithm. They are novel fact combinations that cannot appear in training. Zero contamination by construction.",
    color: colors.slate
  }
];

export const openQuestions = [
  {
    question: "Is there a hard floor - data a 10K model can never learn regardless of format?",
    answer:
      "We believe yes - the information-theoretic floor is real. The experiment will test whether we can actually reach it in practice, or whether training dynamics always prevent us from hitting the theoretical bound.",
    color: colors.rust
  },
  {
    question: "Does the scaling exponent delta differ between factual recall and relational reasoning?",
    answer:
      "Factual recall might need fewer parameters per token than logical inference chains. If delta differs by capability type, 'minimum model size' becomes task-dependent - a more nuanced and practically useful result.",
    color: colors.teal
  },
  {
    question: "What is the smallest complete 'cognitive atom' - the minimal viable mind for a domain?",
    answer:
      "Is there a (P, T, Q) triple so small it represents the absolute minimum for understanding a tiny world? Finding it would be both philosophically interesting and practically useful for embedded AI design.",
    color: colors.gold
  },
  {
    question: "Does the quality multiplier exist at 10K parameters at all?",
    answer:
      "Phi-1 measured quality multipliers at 1B+ parameters. Does the same phenomenon appear at 10K? It might not exist at all - or it might be even stronger at tiny scale. Nobody has measured this.",
    color: colors.sage
  },
  {
    question: "Does repetition substitute for unique tokens at tiny scale?",
    answer:
      "For large models, diminishing returns appear after ~4 epochs of repeated data. For a 10K model on a 2,500-token world, repetition may matter more - analogous to spaced repetition in human memory. This is entirely unmeasured territory.",
    color: colors.plum
  }
];

export const whyItMatters = [
  {
    title: "Tiny embedded AI",
    body:
      "Hearing aids, insulin pumps, smart sensors. These devices have kilobytes of storage. P*(T) tells you exactly what knowledge you can embed in a device with those constraints.",
    color: colors.teal
  },
  {
    title: "Smaller domain-specific models",
    body:
      "A legal AI doesn't need to know recipes. P*(T) tells you the minimum size for a law-only model - making it faster, cheaper, and safer to deploy.",
    color: colors.sage
  },
  {
    title: "Data efficiency",
    body:
      "If a 20x quality multiplier holds at small scale, you need 20x less data to train the same model - making AI research dramatically more accessible.",
    color: colors.gold
  },
  {
    title: "AI safety",
    body:
      "Understanding exactly when new capabilities emerge as model size increases helps predict safety-critical thresholds. That requires a quantitative P*(T) theory.",
    color: colors.rust
  }
];
