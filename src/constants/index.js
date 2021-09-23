export const TRACK_LABELS = {
  COPILOT: "COPILOT",
  DATA_SCIENCE: "DATA SCIENTIST",
  DESIGN: "DESIGNER",
  DEVELOP: "DEVELOPER",
};

export const TRACK_NAMES = {
  COPILOT: "COPILOT",
  DATA_SCIENCE: "DATA SCIENCE",
  DEVELOP: "DEVELOPMENT",
  DESIGN: "DESIGN",
};

// Display mapping for External Accounts
export const dataMap = [
  { provider: "dribbble", displayName: "Dribbble" },
  { provider: "linkedin", displayName: "LinkedIn" },
  { provider: "stackoverflow", displayName: "Stack Overflow" },
  { provider: "behance", displayName: "Behance" },
  { provider: "github", displayName: "Github" },
  { provider: "bitbucket", displayName: "Bitbucket" },
  { provider: "twitter", displayName: "Twitter" },
  { provider: "weblink", displayName: "Web Links" },
];

export const RATING_COLORS = [
  {
    color: "#555555" /* Grey */,
    limit: 900,
  },
  {
    color: "#2D7E2D" /* Green */,
    limit: 1200,
  },
  {
    color: "#616BD5" /* Blue */,
    limit: 1500,
  },
  {
    color: "#F2C900" /* Yellow */,
    limit: 2200,
  },
  {
    color: "#EF3A3A" /* Red */,
    limit: Infinity,
  },
];

// Number of skills to show before a 'VIEW MORE' button is created
export const MAX_SKILLS = 10;

// Threshold width pixel for mobile device
export const MOBILE_MAX_WIDTH = 768;

// Sticky element threshold for profile header component
export const STICKY_TOP_OFFSET = 10;
