// Mock data for the prototype. Every person, project and paper is fictional.

export const people = [
  { id: "maya", name: "Dr. Maya Okafor", role: "Materials scientist", org: "Lagos Institute of Technology", fit: 92, color: "#8b5cf6", tags: ["Circular economy", "Bioplastics"], bio: "Turns agricultural waste into biodegradable packaging. Looking for an ML partner to optimise polymer blends." },
  { id: "arjun", name: "Arjun Mehta", role: "ML engineer", org: "Bengaluru AI Lab", fit: 87, color: "#ec4899", tags: ["Computer vision", "Edge AI"], bio: "Builds low-cost vision models for recycling plants. Interested in field deployments." },
  { id: "lena", name: "Prof. Lena Fischer", role: "Climate economist", org: "TU Munich", fit: 81, color: "#06b6d4", tags: ["Policy", "Carbon markets"], bio: "Models how incentives change waste behaviour in cities." },
  { id: "sofia", name: "Sofia Ramos", role: "Product designer", org: "Studio Norte", fit: 76, color: "#f59e0b", tags: ["UX research", "Civic tech"], bio: "Designs tools that help citizens report and sort waste." },
  { id: "kenji", name: "Kenji Watanabe", role: "Robotics researcher", org: "Kyoto University", fit: 71, color: "#10b981", tags: ["Robotics", "Sorting"], bio: "Works on robotic arms that sort mixed recyclables." },
];

export const stories = [
  { id: "ai", label: "AI Daily", color: "#8b5cf6" },
  { id: "labs", label: "Labs", color: "#ec4899" },
  { id: "climate", label: "Climate", color: "#10b981" },
  { id: "grants", label: "Grants", color: "#f59e0b" },
  { id: "events", label: "Events", color: "#06b6d4" },
];

export const featured = {
  title: "Waste2Worth",
  tagline: "Turning municipal waste data into recycling decisions",
  progress: 64,
  team: ["maya", "arjun", "sofia"],
  milestones: [
    { label: "Collect 6 months of city bin-sensor data", done: true },
    { label: "Train contamination-detection model", done: true },
    { label: "Pilot in 3 neighbourhoods", done: false },
    { label: "Publish open dataset and paper", done: false },
  ],
  outcomes: ["18% less contamination in pilot bins", "Open dataset of 40k labelled images (planned)"],
};

export const posts = [
  { id: 1, author: "arjun", time: "2h", title: "AI for Sustainable Waste Systems", body: "We cut false positives in our recycling-stream classifier by 31% with a tiny edge model. Write-up and code are linked in the thread.", likes: 28, comments: [
    { author: "maya", text: "Would love to try this on our bioplastic samples!" },
    { author: "kenji", text: "What latency did you get on the Jetson?" },
  ], citations: 3 },
  { id: 2, author: "lena", time: "5h", title: "Do deposit schemes change behaviour?", body: "New working paper: a 10-cent deposit raised bottle returns by 22 percentage points across 14 cities.", likes: 41, comments: [
    { author: "sofia", text: "The UX of return machines matters too. Happy to share our field notes." },
  ], citations: 7 },
];

export const papers = [
  { id: "p1", title: "Self-supervised Sorting of Mixed Recyclables", authors: "K. Watanabe, A. Mehta", venue: "ICRA 2026", abstract: "We train a sorting policy from unlabelled conveyor-belt video and reach 94% purity on a five-material stream, while needing ten times fewer labels than supervised baselines." },
  { id: "p2", title: "Mycelium Composites as Packaging Foam", authors: "M. Okafor et al.", venue: "Nature Sustainability", abstract: "Mycelium grown on cassava peel produces foam with protective performance comparable to EPS. It composts in 45 days." },
  { id: "p3", title: "Nudges and Norms in Urban Recycling", authors: "L. Fischer", venue: "J. Environ. Econ.", abstract: "A field experiment with 9,000 households shows that social-norm feedback outperforms financial incentives over twelve months." },
];

export const grants = [
  { id: "g1", name: "Circular Futures Fund", amount: "€250k", deadline: "12 Dec", match: "High", detail: "For interdisciplinary teams piloting circular-economy technology in cities. Requires an industry partner." },
  { id: "g2", name: "Open Climate Data Grant", amount: "$80k", deadline: "30 Jan", match: "Medium", detail: "Funds the release of open datasets with documentation and benchmarks." },
];

export const initialTasks = {
  todo: [
    { id: "t1", title: "Label 2k new bin images", owner: "arjun" },
    { id: "t2", title: "Draft ethics section", owner: "lena" },
  ],
  doing: [
    { id: "t3", title: "Pilot neighbourhood survey", owner: "sofia" },
  ],
  done: [
    { id: "t4", title: "Sensor data pipeline", owner: "maya" },
  ],
};

export const threads = [
  { id: "maya", last: "Can we sync on the polymer data tomorrow?", unread: 2, messages: [
    { from: "maya", text: "Hi! Loved your post on edge models." },
    { from: "me", text: "Thanks! Happy to help with the blend optimisation." },
    { from: "maya", text: "Can we sync on the polymer data tomorrow?" },
  ] },
  { id: "kenji", last: "Sending the robot arm specs now", unread: 0, messages: [
    { from: "kenji", text: "Sending the robot arm specs now" },
  ] },
];

export const rooms = [
  { id: "r1", name: "Waste2Worth Lab Room", members: 6, docs: ["Pilot plan v3", "Model card", "Survey results"] },
];

export const copilotTips = [
  { icon: "🤝", text: "Dr. Maya Okafor is a 92% fit for your Waste2Worth pilot: her bioplastics data complements your vision model." },
  { icon: "💶", text: "Circular Futures Fund closes on 12 Dec and matches your project. Start a draft in Studio?" },
  { icon: "📄", text: "Two new papers cite your work this week." },
];

export const personById = (id) => people.find((p) => p.id === id);
